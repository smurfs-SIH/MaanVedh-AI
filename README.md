<div align="center">

# MaanVedh AI

**AI-powered Intelligent Assistant for Indian Standards & BIS Services**

*An evidence-grounded conversational assistant that connects Indian Standards, BIS certification, testing and hallmarking information through one interface.*

---

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Key Features](#key-features)
- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Data Sources & Responsible Use](#data-sources--responsible-use)
- [Challenges & Our Approach](#challenges--our-approach)
- [Roadmap](#roadmap)
- [Prototype Scope & Limitations](#prototype-scope--limitations)
- [Team](#team)
- [References](#references)
- [License](#license)

---

## Overview

Finding the right Indian Standard, understanding what certification a product needs, or checking hallmarking rules usually means searching across several BIS resources. **MaanVedh AI** replaces that with a single conversational interface: describe a product or ask a question in plain language, and the assistant retrieves relevant BIS information, ranks it, and answers **with source / clause citations** wherever available.

> **Not just a chatbot** — MaanVedh AI is an evidence-grounded BIS intelligence assistant. Answers are generated from retrieved BIS material and validated against that evidence before they are shown.

This repository contains the **demo prototype** built for **Smart India Hackathon 2026**. It is a working proof of concept, not a finished product.

## Problem Statement

|---|---|
| **Hackathon** | Smart India Hackathon 2026 |
| **Problem Statement ID** | 26107 |
| **Title** | AI-powered Intelligent Assistant for Indian Standards and BIS Services for Industries and Consumers |
| **Theme** | Smart Automation |
| **Category** | Software |
| **Team** | The Smurfs (Team ID: 142156) |

## Key Features

### Core prototype (MVP)

- **Natural-language BIS help** — plain-language answers instead of searching multiple resources.
- **Standard recommendation** — suggests relevant Indian Standards from a product description or use case.
- **Certification guidance** — information on certification schemes, testing laboratories and hallmarking.
- **Evidence-grounded answers** — responses are based on retrieved BIS data, with source / clause references wherever available.
- **Hybrid retrieval** — vector search plus keyword search, followed by reranking, to handle both conceptual and exact-match queries (such as specific IS numbers).
- **Evidence validation** — generated answers are checked against the retrieved evidence to reduce hallucination.

### Proposed future extensions

- Multilingual interaction for wider accessibility
- Photo-based certification verification
- WhatsApp and voice access
- Complaint support
- Compliance badge, roadmap wizard, mock audit and renewal watchdog for MSMEs / startups

## How It Works

MaanVedh AI follows a five-step pipeline: **Retrieve → Rank → Generate → Validate → Cite.**

```mermaid
flowchart LR
    U[User asks in natural language] --> FE[Next.js chat interface]
    FE --> API[FastAPI backend<br/>orchestration]
    API --> QU[Query understanding<br/>intent and keywords]
    QU --> HR

    subgraph HR[Hybrid retrieval]
        VS[Vector search]
        KS[Keyword search]
    end

    HR --> DB[(Relevant BIS data<br/>PostgreSQL + pgvector)]
    DB --> RR[Reranking]
    RR --> LLM[Gemini LLM]
    LLM --> EV[Evidence validation]
    EV --> ANS[Answer + citations]
```

1. **Retrieve** — the query is analysed for intent and keywords, then run through vector and keyword search over the BIS knowledge base.
2. **Rank** — retrieved passages are reranked so the most relevant evidence goes forward.
3. **Generate** — Gemini produces an answer grounded in the top-ranked evidence (RAG).
4. **Validate** — the answer is checked against the retrieved evidence.
5. **Cite** — the final response is returned with source / clause citations.

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js, TypeScript, Tailwind CSS |
| **Backend** | Python, FastAPI |
| **AI & Retrieval** | Gemini API, RAG, hybrid search (vector + keyword), reranking, evidence validation |
| **Data** | PostgreSQL, pgvector |
| **Deployment** | Docker |

## Repository Structure

```text
MaanVedh-AI/
├── backend/             # FastAPI service: query understanding, retrieval, generation, validation
├── frontend/            # Next.js web chat interface
├── ingestion/           # Scripts for ingesting and chunking BIS knowledge sources
├── database/            # Database schema and related files
├── evaluation/          # Evaluation material for answer quality
├── docs/                # Additional documentation
├── scripts/             # Helper scripts
├── docker-compose.yml   # PostgreSQL + pgvector service
├── pramaan_database.sql # Database SQL file
├── .env.example         # Environment variable template
├── LICENSE
└── README.md
```

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose
- [Python](https://www.python.org/downloads/) 3.10+
- [Node.js](https://nodejs.org/) 18+ and npm
- A [Gemini API key](https://aistudio.google.com/app/apikey)

### 1. Clone the repository

```bash
git clone https://github.com/smurfs-SIH/MaanVedh-AI.git
cd MaanVedh-AI
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and set your values. At minimum you will need:

```env
# Gemini
GEMINI_API_KEY=your_gemini_api_key_here

# PostgreSQL (matches docker-compose.yml)
DATABASE_URL=postgresql://pramaan:pramaan_dev@localhost:5432/pramaan
```

<!-- TODO: align variable names above with what the backend actually reads, and add any others (model name, CORS origin, frontend API URL). -->

> ⚠️ Never commit your real `.env` file or API keys. The credentials in `docker-compose.yml` are for local development only.

### 3. Start the database

```bash
docker compose up -d postgres
```

This starts PostgreSQL 16 with the `pgvector` extension on port `5432`.

To start from the provided SQL file:

```bash
docker exec -i pramaan-postgres psql -U pramaan -d pramaan < pramaan_database.sql
```

### 4. Ingest the knowledge base

Populate the database with BIS knowledge sources using the scripts in [`ingestion/`](./ingestion).

```bash
# Example — adjust to the actual ingestion entry point
python -m ingestion.run
```

<!-- TODO: replace the command above with the real ingestion command(s). -->

### 5. Run the backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

<!-- TODO: confirm the module path (app.main:app) and the requirements file location. -->

The API will be available at `http://localhost:8000`. If you are using FastAPI's default docs, the interactive documentation is at `http://localhost:8000/docs`.

### 6. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Usage

Ask MaanVedh AI in natural language. Example queries:

- *"Which Indian Standard applies to a stainless steel water bottle?"*
- *"What certification do I need to manufacture electric kettles in India?"*
- *"How does BIS hallmarking work for gold jewellery?"*
- *"Which labs can test this product under BIS?"*

Each answer includes the supporting source or clause reference wherever one is available in the knowledge base.

## Data Sources & Responsible Use

MaanVedh AI is designed to work from **official / primary BIS sources**, including:

- [Bureau of Indian Standards — official website](https://www.bis.gov.in)
- [About BIS](https://www.bis.gov.in/the-bureau/about-bis)
- [BIS Product Certification](https://www.bis.gov.in/product-certification/product-certification-overview)
- [BIS Laboratory Services](https://www.bis.gov.in/laboratorys/laboratory-services-overview)
- [BIS Hallmarking FAQs](https://www.bis.gov.in/hallmarking-overview/hallmarking-faqs/hallmarking-faq)
- [BIS CARE app](https://www.services.bis.gov.in/php/BIS_2.0/BISBlog/bis-care-app/)
- [BIS Citizen's Charter](https://www.services.bis.gov.in/tmp/charter.pdf)

**Please note:**

- This is an independent hackathon prototype. It is **not an official BIS product** and is not endorsed by BIS.
- Indian Standards are published and copyrighted by BIS. The knowledge base should only contain material that is publicly available or **used with authorization**; this repository does not grant any right to redistribute Indian Standards text.
- Answers are for **informational purposes**. For compliance, certification or legal decisions, always verify against the official BIS website and the current published standard.
- Standards and schemes change over time. Knowledge sources are meant to be versioned, so check that the information is current.

## Challenges & Our Approach

| Challenge | Strategy |
|---|---|
| Large volume of BIS information | Structured ingestion and chunking |
| AI hallucination | Evidence-grounded RAG with validation |
| Exact information retrieval (e.g. IS numbers) | Hybrid vector + keyword search with reranking |
| Changing standards and data | Versioned knowledge sources |
| Complex technical queries | Query understanding and reranking |

**Viability:** start focused with a limited BIS knowledge base, then scale through modular, authorized BIS data integrations.

## Roadmap

- [x] Standards Q&A with source citations
- [x] Standard recommendation from a product description
- [x] Certification, testing and hallmarking guidance
- [x] RAG with hybrid retrieval, reranking and evidence validation
- [ ] Multilingual interaction
- [ ] Photo-based certification verification
- [ ] WhatsApp and voice interface
- [ ] Complaint support
- [ ] MSME tools: compliance badge, roadmap wizard, mock audit, renewal watchdog
- [ ] Integration of additional authorized BIS data sources

<!-- TODO: tick or untick the boxes above so they match what the prototype actually does. -->

## Prototype Scope & Limitations

- This is a **prototype built around a focused BIS knowledge base**. It does not cover every Indian Standard or BIS service.
- Items listed under [Roadmap](#roadmap) as unchecked are proposed, not implemented.
- Like any LLM-based system, it can still make mistakes. Evidence validation and citations reduce this risk but do not remove it, so check the cited source.
- `docker-compose.yml` currently provides the database service only; the backend and frontend are run locally as described above.


## References

- Lewis et al., **Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks**, NeurIPS 2020 — [arXiv:2005.11401](https://arxiv.org/abs/2005.11401)
- Nogueira & Cho, **Passage Re-ranking with BERT**, 2019 — [arXiv:1901.04085](https://arxiv.org/abs/1901.04085)
- Gao et al., **Enabling Large Language Models to Generate Text with Citations**, EMNLP 2023 — [arXiv:2305.14627](https://arxiv.org/abs/2305.14627)

## License

This project is licensed under the terms of the [LICENSE](./LICENSE) file in this repository.


*Making Indian Standards and BIS services easier to discover, understand and use.*

</div>
