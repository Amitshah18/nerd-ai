# app/routes/code_review.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.utils.openai_helper import get_groq_response

router = APIRouter()

# Request model for code review
class ReviewRequest(BaseModel):
    code: str  # The code to be reviewed
    language: str = "Python"  # Optional field for the programming language (default is Python)

# Code Review Endpoint
@router.post("/")
async def review_code(data: ReviewRequest):
    if not data.code.strip():
        raise HTTPException(status_code=400, detail="Code snippet is required.")

    try:
        # Enhanced system-level prompt for code review
        prompt = f"""
You are a world-class senior software engineer and code reviewer. Your task is to provide a **detailed, structured, and production-grade review** of the following {data.language} code.

### Instructions:
- Focus on improving **readability**, **performance**, **security**, and **best practices**.
- Ensure the code follows **industry standards** for the given language.
- Provide clear **recommendations for improvements**.
- Highlight **potential issues** such as **bugs**, **security vulnerabilities**, and **performance bottlenecks**.
- Suggest **refactorings** and **optimizations**.
- Provide **explanations** for all your suggestions and how they can improve the code.

---

### Review Structure:

#### 1. **Overall Code Review Summary**:
   - Brief evaluation of the code quality.
   - Identification of key areas for improvement (e.g., design, readability, performance).

#### 2. **Detailed Review by Section**:
   - Code snippet breakdown, one section at a time.
   - Detailed comments on:
     - **Code structure**: Is it modular, readable, and scalable?
     - **Naming conventions**: Are variables, functions, and classes well-named?
     - **Logic**: Does the code have any logical flaws or anti-patterns?
     - **Performance**: Are there any performance issues or opportunities for optimization?
     - **Security**: Are there any security vulnerabilities, such as SQL injection, XSS, etc.?
     - **Edge Cases**: Are edge cases handled properly?
   
#### 3. **Actionable Recommendations**:
   - Concrete suggestions to fix the issues identified.
   - Suggested improvements for performance, scalability, security, and maintainability.
   - Example code snippets for how to improve the problematic sections.

#### 4. **Bonus**:
   - Provide any **best practices** or **tips** that could help the developer write better code in the future.
   - Suggest tools or **libraries** that can enhance the current implementation.
   - Mention any potential **refactoring opportunities** for the future.

---

### Example Output Format:

1. **Overall Summary**:
   - The code appears well-structured but could benefit from more modularity. There are some places where performance can be improved, and a few edge cases are not covered.

2. **Detailed Section Breakdown**:

   - **Line 1-10: Import Statements**
     - *Comment*: Imports are clear, but there’s a redundant import of `math` that isn’t used.
     - *Recommendation*: Remove unused imports to keep the code clean.
     - *Example*: `import math` can be removed.

   - **Line 20-50: Function Definition**
     - *Comment*: The function `process_data()` is doing too many things. It could be broken into smaller functions.
     - *Recommendation*: Break this function into smaller, more manageable pieces, each doing one thing.
     - *Example*: Create a `validate_input()` function and a `transform_data()` function.

   - **Line 60-100: Database Interaction**
     - *Comment*: The database query is prone to SQL injection due to user input not being sanitized.
     - *Recommendation*: Use parameterized queries to prevent SQL injection.
     - *Example*: Use `cursor.execute("SELECT * FROM users WHERE username = ?", (username,))` instead of direct string concatenation.

   - **Line 110-130: Error Handling**
     - *Comment*: The try-except block catches all exceptions, which is generally bad practice.
     - *Recommendation*: Catch specific exceptions to avoid masking errors.
     - *Example*: `except ValueError as e:` instead of `except Exception as e:`.

3. **Actionable Recommendations**:
   - Refactor the function `process_data()` into smaller functions to improve readability and maintainability.
   - Replace the direct string concatenation in SQL queries with parameterized queries to prevent SQL injection.
   - Implement proper error handling by catching specific exceptions rather than all exceptions.
   - Use Python’s built-in `logging` module instead of `print()` for logging errors.

4. **Best Practices and Tips**:
   - Always sanitize user input when interacting with a database.
   - Keep functions small and focused on a single responsibility (SRP principle).
   - Use meaningful variable names to make the code self-documenting.
   - Regularly run linters and formatters (e.g., `black`, `pylint`) to maintain code quality.

---

### End of Review
"""

        # Call the Groq API with the prompt
        result = get_groq_response(prompt)
        return {"code_review": result}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))  # Handle exceptions
