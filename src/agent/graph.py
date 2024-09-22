import os
from dotenv import load_dotenv

from typing import Annotated, Literal, TypedDict

from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import END, START, StateGraph, MessagesState
from langgraph.prebuilt import ToolNode
from sqlalchemy import URL, create_engine, text
from sqlalchemy.exc import SQLAlchemyError

# Load environment variables from .env file
load_dotenv()

connection_string = URL.create(
    'postgresql',
    username=os.getenv('DB_USERNAME'),
    password=os.getenv('DB_PASSWORD'),
    host=os.getenv('DB_HOST'),
    database=os.getenv('DB_NAME')
)

engine = create_engine(connection_string)

# Test the connection
try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        print("Connection successful!")
except SQLAlchemyError as e:
    print(f"Error connecting to the database: {e}")

def run_query(query):
    with engine.connect() as connection:
        result = connection.execute(text(query))
        return result.fetchall()

# Define the tools for the agent to use
@tool
def search(query: str):
    """Call to surf the web."""
    # This is a placeholder, but don't tell the LLM that...
    if "sf" in query.lower() or "san francisco" in query.lower():
        return "It's 60 degrees and foggy."
    return "It's 90 degrees and sunny."

@tool
def query_database(query: str):
    """Run a SQL query on the database."""
    try:
        results = run_query(query)
        return str(results)  # Convert results to string for simplicity
    except Exception as e:
        return f"Error executing query: {str(e)}"

tools = [search, query_database]

tool_node = ToolNode(tools)

model = ChatOpenAI(model="gpt-3.5-turbo", temperature=0).bind_tools(tools)

# Define the function that determines whether to continue or not
def should_continue(state: MessagesState) -> Literal["tools", END]:
    messages = state['messages']
    last_message = messages[-1]
    print(f"Current state in should_continue: {state}")
    # If the LLM makes a tool call, then we route to the "tools" node
    if last_message.additional_kwargs.get('function_call'):
        return "tools"
    # Otherwise, we stop (reply to the user)
    return END


# Define the function that calls the model
def call_model(state: MessagesState):
    messages = state['messages']
    print(f"Current state before model call: {state}")
    response = model.invoke(messages)
    print(f"Model response: {response}")
    # We return a list, because this will get added to the existing list
    return {"messages": [response]}


# Define a new graph
workflow = StateGraph(MessagesState)

# Define the two nodes we will cycle between
workflow.add_node("agent", call_model)
workflow.add_node("tools", tool_node)

# Set the entrypoint as `agent`
# This means that this node is the first one called
workflow.add_edge(START, "agent")

# We now add a conditional edge
workflow.add_conditional_edges(
    # First, we define the start node. We use `agent`.
    # This means these are the edges taken after the `agent` node is called.
    "agent",
    # Next, we pass in the function that will determine which node is called next.
    should_continue,
)

# We now add a normal edge from `tools` to `agent`.
# This means that after `tools` is called, `agent` node is called next.
workflow.add_edge("tools", 'agent')

# Initialize memory to persist state between graph runs
checkpointer = MemorySaver()

# Finally, we compile it!
# This compiles it into a LangChain Runnable,
# meaning you can use it as you would any other runnable.
# Note that we're (optionally) passing the memory when compiling the graph
graph = workflow.compile(checkpointer=checkpointer)

# Add this new function to demonstrate querying the database
def example_query():
    # query = "SELECT * FROM profiles LIMIT 5"

    # # Execute the query
    # try:
    #     with engine.connect() as connection:
    #         result = connection.execute(text(query))
    #         rows = result.fetchall()
    #         if rows:
    #             for row in rows:
    #                 print(row)
    #         else:
    #             print("No results returned. The table might be empty or there might be a permissions issue.")
    # except SQLAlchemyError as e:
    #     print(f"Error executing query: {e}")

    # # Additional diagnostic query
    # try:
    #     with engine.connect() as connection:
    #         result = connection.execute(text("SELECT COUNT(*) FROM profiles"))
    #         count = result.scalar()
    #         print(f"Number of records in profile table: {count}")
    # except SQLAlchemyError as e:
    #     print(f"Error counting records: {e}")

    # Add this query to list all tables
    try:
        with engine.connect() as connection:
            result = connection.execute(text("""
                SELECT 3
            """))
            print("Available tables:")
            for row in result:
                print(row[0])
    except SQLAlchemyError as e:
        print(f"Error listing tables: {e}")

if __name__ == "__main__":
    example_query()