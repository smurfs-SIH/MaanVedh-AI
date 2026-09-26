from fastapi import FastAPI

app = FastAPI(
    title="PraMaan AI API",
    description="AI-powered Indian Standards & BIS Assistant",
    version="0.1.0",
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