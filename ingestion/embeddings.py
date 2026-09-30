import os

from dotenv import load_dotenv
from google import genai
from google.genai import types

from sqlalchemy import text

from backend.app.db.session import engine


load_dotenv("backend/.env")

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise RuntimeError("GEMINI_API_KEY not found in backend/.env")

client = genai.Client(api_key=API_KEY)


def generate_embedding(content: str):
    result = client.models.embed_content(
        model="gemini-embedding-001",
        contents=content,
        config=types.EmbedContentConfig(
            task_type="RETRIEVAL_DOCUMENT",
            output_dimensionality=768,
        ),
    )

    return result.embeddings[0].values


def embed_chunks():
    with engine.begin() as connection:

        rows = connection.execute(
            text("""
                SELECT id, content
                FROM chunks
                WHERE embedding IS NULL
                ORDER BY chunk_index
            """)
        ).fetchall()

        print(f"Chunks needing embeddings: {len(rows)}")

        for index, row in enumerate(rows, start=1):

            embedding = generate_embedding(row.content)

            connection.execute(
                text("""
                    UPDATE chunks
                    SET embedding = CAST(:embedding AS vector)
                    WHERE id = :id
                """),
                {
                    "id": row.id,
                    "embedding": "[" + ",".join(map(str, embedding)) + "]",
                },
            )

            print(f"Embedded {index}/{len(rows)}")


if __name__ == "__main__":
    embed_chunks()