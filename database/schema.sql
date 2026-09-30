-- ============================================
-- PraMaan AI - Database Schema
-- ============================================

CREATE EXTENSION IF NOT EXISTS vector;

-- ============================================
-- DOCUMENTS
-- BIS source documents
-- ============================================

CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    title TEXT NOT NULL,
    document_type VARCHAR(50),
    source_name VARCHAR(100) DEFAULT 'BIS',
    source_url TEXT,

    language VARCHAR(20) DEFAULT 'English',

    publication_date DATE,
    effective_date DATE,

    status VARCHAR(30) DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
-- STANDARDS
-- Indian Standards
-- ============================================

CREATE TABLE standards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    document_id UUID REFERENCES documents(id) ON DELETE SET NULL,

    standard_number VARCHAR(100) NOT NULL,
    title TEXT NOT NULL,

    scope TEXT,

    category VARCHAR(100),
    industry VARCHAR(100),

    edition VARCHAR(50),
    status VARCHAR(30) DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_standards_number
ON standards(standard_number);

CREATE INDEX idx_standards_title
ON standards USING GIN(to_tsvector('english', title));


-- ============================================
-- CLAUSES
-- Individual clauses/sections of standards
-- ============================================

CREATE TABLE clauses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    standard_id UUID NOT NULL
        REFERENCES standards(id)
        ON DELETE CASCADE,

    parent_clause_id UUID
        REFERENCES clauses(id)
        ON DELETE CASCADE,

    clause_number VARCHAR(50),
    title TEXT,

    content TEXT NOT NULL,

    page_start INTEGER,
    page_end INTEGER,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_clauses_standard
ON clauses(standard_id);


-- ============================================
-- CHUNKS
-- RAG knowledge units
-- ============================================

CREATE TABLE chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    document_id UUID
        REFERENCES documents(id)
        ON DELETE CASCADE,

    standard_id UUID
        REFERENCES standards(id)
        ON DELETE CASCADE,

    clause_id UUID
        REFERENCES clauses(id)
        ON DELETE SET NULL,

    content TEXT NOT NULL,

    chunk_index INTEGER,

    page_number INTEGER,

    token_count INTEGER,

    metadata JSONB DEFAULT '{}'::jsonb,

    -- Gemini embedding dimension
    embedding VECTOR(768),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_chunks_standard
ON chunks(standard_id);

CREATE INDEX idx_chunks_clause
ON chunks(clause_id);


-- ============================================
-- VECTOR SEARCH INDEX
-- ============================================

CREATE INDEX idx_chunks_embedding
ON chunks
USING hnsw (embedding vector_cosine_ops);


-- ============================================
-- CERTIFICATION SCHEMES
-- ============================================

CREATE TABLE certification_schemes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(255) NOT NULL,

    description TEXT,

    applicable_products TEXT,

    requirements TEXT,

    process TEXT,

    source_url TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
-- LABORATORIES
-- ============================================

CREATE TABLE laboratories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(255) NOT NULL,

    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),

    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),

    website TEXT,

    capabilities TEXT,

    source_url TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_laboratories_city
ON laboratories(city);

CREATE INDEX idx_laboratories_state
ON laboratories(state);


-- ============================================
-- USER QUERIES
-- ============================================

CREATE TABLE queries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    session_id UUID,

    question TEXT NOT NULL,

    language VARCHAR(20) DEFAULT 'English',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
-- AI RESPONSES
-- ============================================

CREATE TABLE responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    query_id UUID
        REFERENCES queries(id)
        ON DELETE CASCADE,

    answer TEXT NOT NULL,

    model_name VARCHAR(100),

    confidence FLOAT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
-- RESPONSE SOURCES
-- Links AI answers to evidence
-- ============================================

CREATE TABLE response_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    response_id UUID
        REFERENCES responses(id)
        ON DELETE CASCADE,

    chunk_id UUID
        REFERENCES chunks(id)
        ON DELETE SET NULL,

    relevance_score FLOAT,

    citation_text TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
-- BASIC RELATIONSHIPS
-- ============================================

CREATE TABLE standard_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    source_standard_id UUID
        REFERENCES standards(id)
        ON DELETE CASCADE,

    target_standard_id UUID
        REFERENCES standards(id)
        ON DELETE CASCADE,

    relationship_type VARCHAR(50),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_standard_relationship_source
ON standard_relationships(source_standard_id);

CREATE INDEX idx_standard_relationship_target
ON standard_relationships(target_standard_id);