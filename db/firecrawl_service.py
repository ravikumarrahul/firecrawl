from firecrawl import FirecrawlApp
from pydantic import BaseModel
import logging

class LinkData(BaseModel):
    title: str
    summary: str
    link: str

def fetch_firecrawl_data():
    # Initialize Firecrawl
    app = FirecrawlApp(api_key="fc-55e044c08ee34cc39b4ee2ad213b7a54")

    # Extract data
    data = app.extract(
        urls=['https://www.firecrawl.dev/*'],
        params={
            'prompt': 'Extract the title, summary, and link for each page.',
            'schema': LinkData.model_json_schema(),
        }
    )
    # Convert to list if it's not already
    results = data['data']
    if not isinstance(results, list):
        results = [results]
    return results