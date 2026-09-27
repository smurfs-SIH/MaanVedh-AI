import os
import time

from dotenv import load_dotenv
from google import genai
from google.genai import types
from google.genai import errors


load_dotenv("backend/.env")

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise RuntimeError("GEMINI_API_KEY not found")

client = genai.Client(api_key=API_KEY)


SYSTEM_PROMPT = """
You are PraMaan AI, an AI assistant for Indian Standards and BIS services.

Answer the user's question using ONLY the provided BIS evidence.

Rules:
1. Do not invent BIS standards, clauses, certification requirements, or facts.
2. If the evidence does not contain enough information, clearly say:
   "I couldn't verify this from the available BIS sources."
3. Distinguish between:
   - an Indian Standard existing
   - BIS certification being applicable
   - compulsory certification under a government Quality Control Order (QCO)
4. Keep answers clear and practical.
5. Mention the relevant source information when available.
6. Do not claim that a product requires mandatory certification unless the evidence supports it.
"""


def generate_answer(question: str, retrieved_chunks):

    evidence = "\n\n".join(
        [
            f"""
[SOURCE {i}]
Title: {chunk.title}
Source: {chunk.source_name}
URL: {chunk.source_url}
Page: {chunk.page_number or "N/A"}

Content:
{chunk.content}
"""
            for i, chunk in enumerate(retrieved_chunks, start=1)
        ]
    )

    prompt = f"""
{SYSTEM_PROMPT}

BIS EVIDENCE:
{evidence}

USER QUESTION:
{question}

Provide a concise, evidence-grounded answer.

When making factual claims, cite the relevant source as [Source N].
Do not create citations that are not present in the evidence.
"""

    # Retry temporary Gemini 503 errors
    for attempt in range(3):
        try:
            response = client.models.generate_content(
                model="gemini-3.8-flash",
                contents=prompt,
                config=types.GenerateContentConfig(
                    thinking_config=types.ThinkingConfig(
                        thinking_level="low"
                    ),
                ),
            )

            return response.text

        except errors.ServerError as e:

            if attempt == 2:
                raise

            wait_time = 2 ** attempt

            print(
                f"Gemini temporarily unavailable (503). "
                f"Retrying in {wait_time} seconds..."
            )

            time.sleep(wait_time)

    raise RuntimeError("Gemini generation failed after retries.")