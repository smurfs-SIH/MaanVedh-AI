from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.chat import ChatRequest, ChatResponse, chat


app = FastAPI(
    title="PraMaan AI API",
    description="AI-powered Indian Standards & BIS Assistant",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "name": "PraMaan AI",
        "status": "running",
        "version": "0.1.0",
    }


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/api/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):
    return chat(request)