from ingestion.retrieval import search_chunks
from backend.app.ai.generation.generator import generate_answer


question = "What products require compulsory BIS certification?"

results = search_chunks(question, limit=5)

answer = generate_answer(question, results)


print("\n==============================")
print("PRAMAAN AI")
print("==============================\n")

print(answer)

print("\n==============================")
print("SOURCES USED")
print("==============================\n")

for i, result in enumerate(results, start=1):
    print(f"[{i}] Similarity: {result.similarity:.4f}")
    print(f"    Title: {result.title}")
    print(f"    Source: {result.source_name}")
    print(f"    URL: {result.source_url}")
    print(f"    Page: {result.page_number or 'N/A'}")
    print()