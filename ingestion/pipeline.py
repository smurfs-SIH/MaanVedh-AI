from ingestion.loaders.bis_web import fetch_bis_page
from ingestion.processing.cleaner import clean_text
from ingestion.processing.chunker import chunk_text

from sqlalchemy import text

from backend.app.db.session import engine


BIS_URL = "https://www.bis.gov.in/product-certification/products-under-compulsory-certification/?lang=en"


def ingest_bis_page(url: str):
    print("Fetching BIS page...")

    raw_text = fetch_bis_page(url)

    print("Cleaning text...")

    cleaned_text = clean_text(raw_text)

    print("Creating chunks...")

    chunks = chunk_text(cleaned_text)

    print(f"Created {len(chunks)} chunks")

    with engine.begin() as connection:

        # Insert document
        result = connection.execute(
            text("""
                INSERT INTO documents
                (title, document_type, source_name, source_url)
                VALUES
                (:title, :document_type, :source_name, :source_url)
                RETURNING id
            """),
            {
                "title": "Products under Compulsory Certification",
                "document_type": "BIS Web Page",
                "source_name": "BIS",
                "source_url": url,
            },
        )

        document_id = result.scalar_one()

        # Insert chunks
        for index, chunk in enumerate(chunks):

            connection.execute(
                text("""
                    INSERT INTO chunks
                    (document_id, content, chunk_index, token_count, metadata)
                    VALUES
                    (:document_id, :content, :chunk_index, :token_count, :metadata)
                """),
                {
                    "document_id": document_id,
                    "content": chunk,
                    "chunk_index": index,
                    "token_count": len(chunk.split()),
                    "metadata": "{}",
                },
            )

    print("✅ BIS document inserted successfully!")
    print(f"Document ID: {document_id}")
    print(f"Chunks inserted: {len(chunks)}")


if __name__ == "__main__":
    ingest_bis_page(BIS_URL)