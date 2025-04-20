import openai 
from dotenv import load_dotenv 
import os

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

def call_openai(prompt: str, model: str = "gpt-3.5-turbo") -> str:
    response = openai.ChatCompletion.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.5
    )
    return response.choices[0].message.content.strip()
