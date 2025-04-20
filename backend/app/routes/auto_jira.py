from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.utils.openai_helper import get_groq_response

router = APIRouter()

class SimpleJiraRequest(BaseModel):
    prompt: str  # Just the single user text prompt

@router.post("/")
async def generate_jira_from_simple_input(data: SimpleJiraRequest):
    try:
        # Temporarily return a hardcoded response for testing
        return {
            "jira_plan": """
            ### Project Name: DevSync AI
            - **Team Size:** 3
            - **Sprint Duration:** 2 weeks
            - **Feature Description:** GenAI assistant for developers.
            ---
            ## JIRA Roadmap:
            - **EPIC:** Build GenAI assistant
                - **TASK:** Setup project structure
                    - **SUBTASK:** Create FastAPI backend
                    - **SUBTASK:** Develop frontend UI
                    - **Priority:** High
                    - **Story Points:** 8
                    - **Acceptance Criteria:** API should be functional and frontend UI ready.
                    - **Estimated Completion Time:** 1 week
            """
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))