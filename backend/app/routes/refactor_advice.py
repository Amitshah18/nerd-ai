# app/routes/refactor_advice.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.utils.openai_helper import get_groq_response
from datetime import datetime

router = APIRouter()

# Request model for Refactor Advice generation
class RefactorAdviceRequest(BaseModel):
    code_snippet: str  # The code that needs refactoring
    file_name: str  # Name of the file to provide context
    language: str  # Language of the code (e.g., Python, JavaScript, Java)
    context: str = ""  # Optional: Explanation of the code's purpose or usage
    previous_issues: str = ""  # Optional: Known issues with the current code
    expected_behavior: str = ""  # Optional: The behavior the code should have
    performance_concerns: str = ""  # Optional: Any specific performance concerns
    code_quality_issues: str = ""  # Optional: Known code quality issues (e.g., readability, maintainability)

# Refactor Advice Endpoint
@router.post("/generate-refactor-advice/")
async def generate_refactor_advice(data: RefactorAdviceRequest):
    try:
        if not data.code_snippet.strip() or not data.language.strip():
            raise HTTPException(status_code=400, detail="Code snippet and language are required.")
        
        # Generate the refactor advice prompt
        prompt = f"""
You are an experienced software engineer and code reviewer. You will analyze the provided code and generate detailed, actionable refactoring advice. The advice should focus on improving code readability, maintainability, performance, and overall best practices.

### Context:
- **File Name**: {data.file_name}
- **Language**: {data.language}
- **Context**: {data.context if data.context else 'No additional context provided.'}
- **Previous Issues**: {data.previous_issues if data.previous_issues else 'No known issues.'}
- **Expected Behavior**: {data.expected_behavior if data.expected_behavior else 'No specific expected behavior provided.'}
- **Performance Concerns**: {data.performance_concerns if data.performance_concerns else 'No performance concerns.'}
- **Code Quality Issues**: {data.code_quality_issues if data.code_quality_issues else 'No known quality issues.'}

### Code to Refactor:
```{data.language}
{data.code_snippet}
"""
        return {"refactor_advice": result}

    except Exception as e:
        # Handling errors in API call
        raise HTTPException(status_code=500, detail=f"Error in generating refactor advice: {str(e)}")