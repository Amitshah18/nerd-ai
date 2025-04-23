from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import signup
# Import the routes
from app.routes import auto_jira, boilerplate, code_review, docs, pr_summary, refactor_advice, testcases

# Initialize FastAPI app
app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust as per your frontend setup
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include each router with their respective prefixes
app.include_router(auto_jira.router, prefix="/api/auto_jira", tags=["Auto JIRA"])
app.include_router(boilerplate.router, prefix="/api/boilerplate", tags=["Boilerplate"])
app.include_router(code_review.router, prefix="/api/code_review", tags=["Code Review"])
app.include_router(docs.router, prefix="/api/docs", tags=["Docs"])
app.include_router(pr_summary.router, prefix="/api/pr_summary", tags=["PR Summary"])
app.include_router(refactor_advice.router, prefix="/api/refactor_advice", tags=["Refactor Advice"])
app.include_router(testcases.router, prefix="/api/testcases", tags=["Testcases"])
app.include_router(testcases.router, prefix="/api/test_case_generator", tags=["Test Case Generator"])
app.include_router(signup.router, prefix="/api")
# Example health check route
@app.get("/")
async def read_root():
    return {"message": "Welcome to the FastAPI project!"}
