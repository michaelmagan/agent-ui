"""
This is the main entry point for the AI.
It defines the workflow graph and the entry point for the agent.
"""
# pylint: disable=line-too-long, unused-import
import json
import sys
from pathlib import Path

from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver

# from ai_researcher.state import AgentState
# from ai_researcher.steps import steps_node
# from ai_researcher.search import search_node
# from ai_researcher.summarize import summarize_node
# from ai_researcher.extract import extract_node

# Add the project root and the src directory to sys.path
project_root = Path(__file__).resolve().parents[2]
sys.path.extend([str(project_root), str(project_root / 'src')])

from agent.state import AgentState
from agent.search import search_node

def route(state):
    """Route to research nodes."""
    if not state.get("steps", None):
        return END

    current_step = next((step for step in state["steps"] if step["status"] == "pending"), None)

    if not current_step:
        return "summarize_node"

    if current_step["type"] == "search":
        return "search_node"

    raise ValueError(f"Unknown step type: {current_step['type']}")

# Define a new graph
workflow = StateGraph(AgentState)
# workflow.add_node("steps_node", steps_node)
workflow.add_node("search_node", search_node)
# workflow.add_node("summarize_node", summarize_node)
# workflow.add_node("extract_node", extract_node)
# Chatbot
workflow.set_entry_point("search_node")

# workflow.add_conditional_edges(
#     "steps_node", 
#     route,
#     ["summarize_node", "search_node", END]
# )

# workflow.add_edge("search_node", "extract_node")

# workflow.add_conditional_edges(
#     "extract_node",
#     route,
#     ["summarize_node", "search_node"]
# )

# workflow.add_edge("summarize_node", END)

memory = MemorySaver()
graph = workflow.compile(checkpointer=memory)