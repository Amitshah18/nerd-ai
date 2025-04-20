from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.utils.openai_helper import get_groq_response, build_boilerplate_prompt

router = APIRouter()

# Define a Pydantic model for request validation
class BoilerplateRequest(BaseModel):
    project_description: str# Adding tech_stack to match with the prompt function

# Function to handle boilerplate code generation
@router.post("/")
async def generate_boilerplate(data: BoilerplateRequest):
    project_description = data.project_description.strip()

    # Validate if the project description is not empty
    if not project_description:
        raise HTTPException(status_code=400, detail="Project description is required")

    try:
        # Build the detailed prompt for generating boilerplate code
        prompt = build_boilerplate_prompt(description=project_description)

        # Call OpenAI model to generate the boilerplate code based on the prompt
        response = get_groq_response(prompt)

        # If the response is empty or None, raise an exception
        if not response:
            raise HTTPException(status_code=400, detail="No boilerplate code generated. Please try again.")

        # Return the generated boilerplate code under 'result' key
        return {"result": response}

    except Exception as e:
        # Print error details for debugging purposes
        print(f"Error in generating boilerplate: {str(e)}")

        # Raise an internal server error if something goes wrong
        raise HTTPException(status_code=500, detail="Internal Server Error")
