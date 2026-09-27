import re


def clean_text(text: str) -> str:
    lines = []

    for line in text.splitlines():
        line = line.strip()

        if not line:
            continue

        # Remove duplicate whitespace
        line = re.sub(r"\s+", " ", line)

        lines.append(line)

    # Remove consecutive duplicate lines
    cleaned = []
    previous = None

    for line in lines:
        if line != previous:
            cleaned.append(line)
        previous = line

    return "\n".join(cleaned)