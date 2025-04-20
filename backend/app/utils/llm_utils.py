import openai
import os
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

def call_openai(prompt: str) -> str:
    try:
        # Make the API call to OpenAI
        response = openai.Completion.create(
            model="gpt-3.5-turbo",  # Ensure you're using a valid model
            prompt=prompt,
            max_tokens=1000,
            temperature=0.7,
        )

        # Log the entire response object for debugging
        print(f"OpenAI Response: {response}")

        return response.choices[0].text.strip()

    except openai.error.OpenAIError as e:
        # Log OpenAI errors specifically
        print(f"OpenAI error: {str(e)}")
        raise Exception(f"Error in OpenAI API call: {str(e)}")

    except Exception as e:
        # Log other errors
        print(f"Error: {str(e)}")
        raise Exception("Error processing the request")
