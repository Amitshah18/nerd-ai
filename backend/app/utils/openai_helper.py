# app/utils/openai_helper.py

from dotenv import load_dotenv
load_dotenv()

import os
from groq import Groq

# Initialize Groq client with your API key
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Function to call Groq API and get response
def get_groq_response(prompt: str, model: str = "llama3-70b-8192"):
    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "system", "content": "You are a helpful assistant."},
                  {"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content


# NEW: Smart Prompt Generator for Boilerplate Code
def build_boilerplate_prompt(description: str, tech_stack: str = None, project_type: str = "web application", include_auth: bool = False, additional_notes: str = None):
    """
    This function generates a detailed prompt for creating a boilerplate project structure based on the provided description,
    technology stack, and project type.

    Parameters:
    - description (str): A detailed description of the project.
    - tech_stack (str, optional): A string specifying the tech stack to use (e.g., React, Node.js, etc.). Defaults to a common stack.
    - project_type (str, optional): The type of project (e.g., web application, API service). Defaults to "web application".
    - include_auth (bool, optional): Whether to include authentication in the boilerplate. Defaults to False.
    - additional_notes (str, optional): Any additional requirements or notes that should be included in the prompt.

    Returns:
    - str: The generated prompt for Groq to create a production-ready boilerplate.
    """

    default_stack = "React (frontend) + FastAPI (backend) + MongoDB (database)"
    used_stack = tech_stack if tech_stack else default_stack

    # Base prompt for boilerplate code generation
    prompt = (
        "You are an expert full-stack software engineer. Your task is to generate a production-ready "
        "boilerplate code structure based on the project description and requirements provided.\n\n"
        f"# Project Type:\n{project_type}\n\n"
        f"# Project Description:\n\"\"\"\n{description}\n\"\"\"\n\n"
        f"# Technology Stack to Use:\n{used_stack}\n\n"
        "# Instructions:\n"
        "- Generate a **modular, scalable** folder and file structure for the project.\n"
        "- Provide **minimum working code** in each file (e.g., `main.py`, `App.jsx`, `.env.example`, etc.).\n"
        "- Ensure best practices for each part of the stack, including **frontend, backend, database**, and **auth**.\n"
        "- Use **meaningful names** for files and folders, and ensure **reusability** and **clarity**.\n"
        "- For **backend**: include routing, models, DB config, and authentication if required.\n"
        "- For **frontend**: include routing, layout, pages, components, and API service integrations.\n"
        "- Add an **.env.example** file for managing environment variables securely.\n"
        "- If authentication is required, set up a basic auth system, such as **JWT authentication** or **OAuth2**.\n"
        "- Provide explanations for each part of the structure and code, so it's easy to understand and customize.\n"
        "- Follow **best practices** and provide **scalable solutions** for a production-ready application.\n"
        "- Respond in **Markdown format** with fenced code blocks for each file.\n\n"
    )

    # Add optional details based on provided parameters
    if include_auth:
        prompt += (
            "# Authentication Requirements:\n"
            "- Implement a **secure authentication system** (e.g., JWT tokens or OAuth2).\n"
            "- Ensure proper handling of **passwords**, **token expiration**, and **session management**.\n"
            "- Provide an example of **protected routes** requiring authentication.\n\n"
        )
    
    if additional_notes:
        prompt += f"# Additional Notes:\n{additional_notes}\n\n"

    prompt += "You MUST respond in the following format:\n"
    prompt += "```markdown\n"
    prompt += "project-root/\n"
    prompt += "├── file1\n"
    prompt += "├── folder1/\n"
    prompt += "│   └── file2\n"
    prompt += "...\n"
    prompt += "```\n"

    return prompt
