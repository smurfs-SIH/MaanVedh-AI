import os

from dotenv import load_dotenv
from google import genai
from google.genai import types

from sqlalchemy import text

from backend.app.db.session import engine


load_dotenv("backend/.env")

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise RuntimeError("GEMINI_API_KEY not found")

client = genai.Client(api_key=API_KEY)


def generate_query_embedding(question: str):
    result = client.models.embed_content(
        model="gemini-embedding-001",
        contents=question,
        config=types.EmbedContentConfig(
            task_type="RETRIEVAL_QUERY",
            output_dimensionality=768,
        ),
    )

    return result.embeddings[0].values


def search_chunks(question: str, limit: int = 5):

    embedding = generate_query_embedding(question)

    vector = "[" + ",".join(map(str, embedding)) + "]"

    with engine.connect() as connection:

        results = connection.execute(
            text("""
                SELECT
                    chunks.id,
                    chunks.content,
                    chunks.page_number,
                    documents.title,
                    documents.source_name,
                    documents.source_url,
                    1 - (
                        chunks.embedding <=> CAST(:embedding AS vector)
                    ) AS similarity
                FROM chunks
                JOIN documents
                    ON chunks.document_id = documents.id
                WHERE chunks.embedding IS NOT NULL
                ORDER BY chunks.embedding <=> CAST(:embedding AS vector)
                LIMIT :limit
            """),
            {
                "embedding": vector,
                "limit": limit,
            },
        ).fetchall()

    return results

if __name__ == "__main__":

    question = "What products require compulsory BIS certification?"

    results = search_chunks(question)

    print("\nSEARCH RESULTS\n")

    for i, result in enumerate(results, start=1):

        print(f"--- RESULT {i} ---")
        print(f"Similarity: {result.similarity:.4f}")
        print(result.content[:500])
        print()