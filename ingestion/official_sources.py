from ingestion.loaders.bis_web import fetch_bis_page
from ingestion.processing.cleaner import clean_text
from ingestion.processing.chunker import chunk_text

from sqlalchemy import text
from backend.app.db.session import engine


BIS_SOURCES = [
    {
        "title": "BIS Product Certification Process",
        "url": "https://www.bis.gov.in/product-certification/product-certification-process/?lang=en",
        "document_type": "BIS Product Certification",
    },
    {
        "title": "BIS Product Certification FAQ",
        "url": "https://www.bis.gov.in/product-certification/product-certification-faq/?lang=en",
        "document_type": "BIS Product Certification FAQ",
    },
    {
        "title": "BIS Laboratory Services Overview",
        "url": "https://www.bis.gov.in/laboratorys/laboratory-services-overview/?lang=en",
        "document_type": "BIS Laboratory Services",
    },
    {
        "title": "BIS Laboratory Services FAQ",
        "url": "https://www.bis.gov.in/laboratorys/laboratory-services-overview/laboratory-faq/?lang=en",
        "document_type": "BIS Laboratory FAQ",
    },
    {
        "title": "BIS Hallmarking FAQ",
        "url": "https://www.bis.gov.in/hallmarking-overview/hallmarking-faqs/hallmarking-faq/?lang=en",
        "document_type": "BIS Hallmarking",
    },
    {
        "title": "BIS Testing Facilities and Testing Charges",
        "url": "https://www.bis.gov.in/laboratorys/testing-facility-and-testing-charges/?lang=en",
        "document_type": "BIS Testing Facilities",
    },
]


def ingest_source(source):
    print(f"\nFetching: {source['title']}")

    raw_text = fetch_bis_page(source["url"])

    cleaned = clean_text(raw_text)

    chunks = chunk_text(
        cleaned,
        chunk_size=1200,
        overlap=200,
    )

    print(f"Created {len(chunks)} chunks")

    with engine.begin() as connection:

        result = connection.execute(
            text("""
                INSERT INTO documents
                (title, document_type, source_name, source_url)
                VALUES
                (:title, :document_type, :source_name, :source_url)
                RETURNING id
            """),
            {
                "title": source["title"],
                "document_type": source["document_type"],
                "source_name": "BIS",
                "source_url": source["url"],
            },
        )

        document_id = result.scalar_one()

        for index, chunk in enumerate(chunks):

            connection.execute(
                text("""
                    INSERT INTO chunks
                    (
                        document_id,
                        content,
                        chunk_index,
                        token_count,
                        metadata
                    )
                    VALUES
                    (
                        :document_id,
                        :content,
                        :chunk_index,
                        :token_count,
                        :metadata
                    )
                """),
                {
                    "document_id": document_id,
                    "content": chunk,
                    "chunk_index": index,
                    "token_count": len(chunk.split()),
                    "metadata": "{}",
                },
            )

    print(f"✅ Inserted {len(chunks)} chunks")


def main():

    print("===================================")
    print("PraMaan AI - BIS Source Ingestion")
    print("===================================")

    for source in BIS_SOURCES:
        try:
            ingest_source(source)
        except Exception as e:
            print(f"❌ Failed: {source['title']}")
            print(e)

    print("\n🎉 Official BIS source ingestion complete!")


if __name__ == "__main__":
    main()