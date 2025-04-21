# app/routes/docs.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.utils.openai_helper import get_groq_response

router = APIRouter()

# Request model for generating API documentation
class DocsRequest(BaseModel):
    project_description: str
    target_audience: str
    api_endpoints: list  # List of endpoints that need to be documented
    project_name: str = "Unnamed Project"  # Optional: Default name

# API Documentation Endpoint
@router.post("/")
async def generate_docs(data: DocsRequest):
    try:
        if not data.project_description.strip() or not data.api_endpoints:
            raise HTTPException(status_code=400, detail="Project description and API endpoints are required.")

        # Generate the documentation prompt
        prompt = f"""
You are a professional API documentation specialist and technical writer. Your job is to generate **comprehensive, well-structured, and easy-to-follow API documentation** for the following project.

### Instructions:
- Include a project overview with clear objectives and use cases.
- Provide a detailed explanation of each **API endpoint**, including:
  - HTTP method (GET, POST, etc.)
  - Request and response format (including headers, body, and status codes)
  - Sample API request and response examples
  - Detailed descriptions for each parameter, with type and validation rules
  - Authentication requirements (if any)
  - Usage tips and best practices for developers using this API
- Maintain consistent formatting with **Markdown** and **clear headings** for easy readability.
- Use **diagrams or flowcharts** (if applicable) to explain complex API workflows.

---

### Project Overview:
# 📌 Project Name: {data.project_name}
# 📝 Project Description: {data.project_description}

---

### Target Audience:
{data.target_audience}

---

### API Endpoints Documentation:

"""
        # Loop through the API endpoints and generate documentation for each
        for endpoint in data.api_endpoints:
            prompt += f"""
## Endpoint: {endpoint['endpoint']}
### Method: {endpoint['method']}
- **Description**: {endpoint.get('description', 'No description provided')}
- **Request Example**:
```json
{endpoint.get('request_example', '{}')}
"""

        # Call the Groq API to generate the documentation
        result = get_groq_response(prompt)
        return {"api_documentation": result}

    except Exception as e:
        # Handling errors in API call
        raise HTTPException(status_code=500, detail=f"Error in generating documentation: {str(e)}")
