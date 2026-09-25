PraMaan AI
AI-powered Intelligent Assistant for
Indian Standards & BIS Services

SIH 2026
Problem Statement: 26107

┌──────────────────────────────┐
│       SYSTEM ARCHITECTURE    │
└──────────────────────────────┘
                         USER
                           │
                           ▼
                    ┌─────────────┐
                    │  NEXT.JS UI │
                    └──────┬──────┘
                           ▼
                    ┌─────────────┐
                    │   FASTAPI   │
                    └──────┬──────┘
                           ▼
                 ┌───────────────────┐
                 │ AI ORCHESTRATOR   │
                 │ Intent + Entities │
                 │ + Router          │
                 └─────────┬─────────┘
                           ▼
                 ┌───────────────────┐
                 │ HYBRID RETRIEVAL  │◄────────────────┐
                 │ Vector + BM25     │                 │
                 │ + Metadata        │                 │
                 └─────────┬─────────┘                 │
                           ▼                           │
                    ┌────────────┐                     │
                    │ RERANKER   │                     │
                    └─────┬──────┘                     │
                          ▼                            │
                   ┌─────────────┐                     │
                   │ GROUNDED LLM│                     │
                   │Context+Reason│                    │
                   └──────┬──────┘                     │
                          ▼                            │
                ┌────────────────────┐                 │
                │ EVIDENCE CHECK     │                 │
                └─────────┬──────────┘                 │
                          ▼                            │
                ┌────────────────────┐                 │
                │ CITATION ENGINE    │                 │
                │ Doc / Clause / Page│                 │
                └─────────┬──────────┘                 │
                          ▼                            │
                     ┌──────────┐                      │
                     │ RESPONSE │                      │
                     └──────────┘                      │
                                                       │
                                                       │
        ┌──────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│     BIS KNOWLEDGE PIPELINE  │
│                             │
│ Authorized BIS Sources      │
│          ↓                  │
│ PDF / HTML / Data           │
│          ↓                  │
│ OCR + Document Processing   │
│          ↓                  │
│ Metadata Extraction         │
│          ↓                  │
│ Clause-aware Chunking       │
│          ↓                  │
│ Embeddings                  │
│          ↓                  │
│ PostgreSQL + pgvector       │
└─────────────────────────────┘

Tech Stack
• Next.js
• FastAPI
• PostgreSQL + pgvector
• RAG
• LLM
• Hybrid Retrieval
• Reranking
• Evidence & Citation Engine