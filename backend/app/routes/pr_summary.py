# app/routes/pr_summary.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.utils.openai_helper import get_groq_response

router = APIRouter()

# Keep it simple: just one field
class PRSummaryRequest(BaseModel):
    prompt: str

@router.post("/")
async def generate_pr_summary(data: PRSummaryRequest):
    try:
        if not data.prompt.strip():
            raise HTTPException(status_code=400, detail="Prompt cannot be empty.")

        # Generate PR summary using Groq API
        result = get_groq_response(data.prompt)
        return {"pr_summary": result}

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error in generating PR summary: {str(e)}")
