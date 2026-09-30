import requests
from bs4 import BeautifulSoup


def fetch_bis_page(url: str) -> str:
    response = requests.get(
        url,
        timeout=30,
        headers={
            "User-Agent": "PraMaan-AI/0.1"
        },
    )

    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")

    for element in soup(["script", "style", "noscript"]):
        element.decompose()

    return soup.get_text(
        separator="\n",
        strip=True,
    )