from pydantic import BaseModel

from ingestion.retrieval import search_chunks
from backend.app.ai.generation.generator import generate_answer


class ChatRequest(BaseModel):
    question: str


class Source(BaseModel):
    title: str
    source_name: str
    source_url: str | None
    page_number: int | None
    similarity: float


class ChatResponse(BaseModel):
    answer: str
    sources: list[Source]


def chat(request: ChatRequest):

    results = search_chunks(
        request.question,
        limit=5,
    )

    answer = generate_answer(
        request.question,
        results,
    )

    sources = [
        Source(
            title=result.title,
            source_name=result.source_name,
            source_url=result.source_url,
            page_number=result.page_number,
            similarity=float(result.similarity),
        )
        for result in results
    ]

    return ChatResponse(
        answer=answer,
        sources=sources,
    )