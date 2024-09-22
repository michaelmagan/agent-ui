"""Demo"""

import sys
from pathlib import Path

# Add the project root and the src directory to sys.path
project_root = Path(__file__).resolve().parents[2]
sys.path.extend([str(project_root), str(project_root / 'src')])

from src.agent.graph import graph

from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
import uvicorn
from copilotkit.integrations.fastapi import add_fastapi_endpoint
from copilotkit import CopilotKitSDK, LangGraphAgent

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/test")
async def test():
    return {"message": "Test endpoint is working"}

sdk = CopilotKitSDK(
    agents=[
        LangGraphAgent(
            name="cofinder_agent",
            description="Cofinder agent.",
            agent=graph,
        )
    ],
)

add_fastapi_endpoint(app, sdk, "/copilotkit")

def main():
    """Run the uvicorn server."""
    print("Michael - Starting the uvicorn server...")
    uvicorn.run("src.agent.demo:app", host="127.0.0.1", port=8000, reload=True)

if __name__ == "__main__":
    main()