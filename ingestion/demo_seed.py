"""
PraMaan AI - 30 minute SIH demo seed
Seeds a compact, verified BIS standards knowledge base and generates
Gemini embeddings for the new chunks.

Run from project root:
    python -m ingestion.demo_seed
"""

import os
from dotenv import load_dotenv
from sqlalchemy import text
from backend.app.db.session import engine
from google import genai
from google.genai import types

load_dotenv("backend/.env")

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("GEMINI_API_KEY not found in backend/.env")

client = genai.Client(api_key=API_KEY)

RECORDS = [
    {
        "number": "IS 14543:2024",
        "title": "Packaged Drinking Water (other than Packaged Natural Mineral Water) — Specification",
        "category": "Food and Water",
        "industry": "Packaged Drinking Water",
        "year": 2024,
        "source_url": "https://www.bis.gov.in/wp-content/uploads/2025/07/PM-14543-July-2025-Rev.pdf",
        "content": """IS 14543:2024 — Packaged Drinking Water (other than Packaged Natural Mineral Water) — Specification.
BIS's 2025 Product Manual states that this product manual is used as reference material for certification under Scheme-I and may be used by prospective applicants seeking BIS certification.
The BIS LIMS currently lists recognized/empanelled testing facilities for IS 14543:2024. Testing entries include packaged drinking water and show the standard number, product scope, testing facilities and charges.
For a product described as packaged drinking water other than packaged natural mineral water, IS 14543:2024 is the relevant standard identified by these BIS sources. Certification applicability and current compulsory requirements should be checked against the latest BIS/QCO information rather than inferred from the standard's existence alone."""
    },
    {
        "number": "IS 9873 (Part 1):2025",
        "title": "Safety of Toys Part 1: Safety Aspects Related to Mechanical and Physical Properties",
        "category": "Consumer Products",
        "industry": "Toys",
        "year": 2025,
        "source_url": "https://www.bis.gov.in/product-certification/products-under-compulsory-certification/scheme-1/?lang=en",
        "content": """IS 9873 (Part 1):2025 — Safety of Toys Part 1: Safety Aspects Related to Mechanical and Physical Properties.
BIS's current compulsory-certification Scheme-I page lists the Toys Quality Control Order and the IS 9873 family for non-electric toys. BIS LIMS also lists current laboratory facilities for IS 9873 Part 1:2025.
For toy-related questions, the IS 9873 family should be considered, with the applicable part depending on the safety requirement. Current QCO and transition information should be checked before making a compliance decision."""
    },
    {
        "number": "IS 9873 (Part 3):2020",
        "title": "Safety of Toys Part 3: Migration of Certain Elements",
        "category": "Consumer Products",
        "industry": "Toys",
        "year": 2020,
        "source_url": "https://standards.bis.gov.in/website/standard-details",
        "content": """IS 9873 (Part 3):2020 — Safety of Toys Part 3: Migration of Certain Elements.
The BIS Standards portal identifies IS 9873 (Part 3):2020 as the current revised standard and records a 2026 amendment. The BIS compulsory-certification Scheme-I page lists the IS 9873 family under the Toys Quality Control Order.
This part concerns migration of certain elements in toys. The exact test requirements should be taken from the current standard/product manual and applicable BIS/QCO documents."""
    },
    {
        "number": "IS 2925:1984",
        "title": "Specification for Industrial Safety Helmets (Second Revision)",
        "category": "Safety Equipment",
        "industry": "Industrial Safety",
        "year": 1984,
        "source_url": "https://www.bis.gov.in/product-certification/products-under-compulsory-certification/scheme-1/?lang=en",
        "content": """IS 2925:1984 — Specification for Industrial Safety Helmets (Second Revision).
BIS's current compulsory-certification Scheme-I page lists IS 2925:1984 under the Quality Control Order for helmets for police force, civil defence and personal protection. BIS LIMS lists testing facilities for IS 2925:1984, including construction, material, size and performance requirements such as shock absorption, penetration resistance, flammability resistance, electrical resistance, water absorption and heat resistance.
For a helmet query, distinguish industrial safety helmets covered by IS 2925 from other helmet categories and verify the applicable current QCO."""
    },
    {
        "number": "IS 1417:2016",
        "title": "Gold and Gold Alloys, Jewellery/Artefacts — Fineness and Marking — Specification",
        "category": "Hallmarking",
        "industry": "Gold Jewellery",
        "year": 2016,
        "source_url": "https://www.bis.gov.in/hallmarking-overview/hallmarking-faqs/hallmarking-faq/?lang=en",
        "content": """IS 1417:2016 — Gold and Gold Alloys, Jewellery/Artefacts — Fineness and Marking — Specification.
BIS's Hallmarking FAQ identifies IS 1417:2016 as an Indian Standard for gold and gold-alloy jewellery/artefacts. The FAQ states that the standard permits six caratage/fineness grades for gold jewellery/artefacts: 14K(585), 18K(750), 20K(833), 22K(916), 23K(958) and 24KS(995).
BIS also explains that jewellery submitted for hallmarking is tested at a BIS-recognized Assaying & Hallmarking centre."""
    },
    {
        "number": "IS 2112:2014",
        "title": "Silver and Silver Alloys, Jewellery/Artefacts — Fineness and Marking — Specification",
        "category": "Hallmarking",
        "industry": "Silver Jewellery",
        "year": 2014,
        "source_url": "https://www.bis.gov.in/hallmarking-overview/hallmarking-faqs/hallmarking-faq/?lang=en",
        "content": """IS 2112:2014 — Silver and Silver Alloys, Jewellery/Artefacts — Fineness and Marking — Specification.
BIS's Hallmarking FAQ identifies IS 2112:2014 as the Indian Standard for silver and silver-alloy jewellery/artefacts. It lists six permitted silver fineness grades: 800, 835, 900, 925, 970 and 990.
BIS's hallmarking information states that gold and silver are the precious metals currently brought under the hallmarking framework."""
    },
]


def embed(text_value: str):
    result = client.models.embed_content(
        model="gemini-embedding-001",
        contents=text_value,
        config=types.EmbedContentConfig(
            task_type="RETRIEVAL_DOCUMENT",
            output_dimensionality=768,
        ),
    )
    return result.embeddings[0].values


def main():
    inserted = 0
    skipped = 0

    with engine.begin() as connection:
        for record in RECORDS:
            existing = connection.execute(
                text("SELECT id FROM standards WHERE standard_number = :n LIMIT 1"),
                {"n": record["number"]},
            ).scalar_one_or_none()

            if existing:
                skipped += 1
                continue

            doc_id = connection.execute(
                text("""
                    INSERT INTO documents
                    (title, document_type, source_name, source_url)
                    VALUES (:title, 'Indian Standard', 'BIS', :url)
                    RETURNING id
                """),
                {"title": record["title"], "url": record["source_url"]},
            ).scalar_one()

            standard_id = connection.execute(
                text("""
                    INSERT INTO standards
                    (document_id, standard_number, title, category, industry, edition)
                    VALUES (:doc, :number, :title, :category, :industry, :edition)
                    RETURNING id
                """),
                {
                    "doc": doc_id,
                    "number": record["number"],
                    "title": record["title"],
                    "category": record["category"],
                    "industry": record["industry"],
                    "edition": str(record["year"]),
                },
            ).scalar_one()

            vector = embed(record["content"])
            vector_text = "[" + ",".join(map(str, vector)) + "]"

            connection.execute(
                text("""
                    INSERT INTO chunks
                    (document_id, standard_id, content, chunk_index, token_count, metadata, embedding)
                    VALUES
                    (:doc, :standard, :content, 0, :tokens, :metadata,
                     CAST(:embedding AS vector))
                """),
                {
                    "doc": doc_id,
                    "standard": standard_id,
                    "content": record["content"],
                    "tokens": len(record["content"].split()),
                    "metadata": "{}",
                    "embedding": vector_text,
                },
            )

            inserted += 1
            print(f"✅ {record['number']}")

    print()
    print(f"Inserted: {inserted}")
    print(f"Skipped (already present): {skipped}")
    print("🎉 Standards demo knowledge base ready!")


if __name__ == "__main__":
    main()
