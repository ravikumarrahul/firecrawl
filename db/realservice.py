def fetch_firecrawl_data():
    # Mock data for testing
    mock_pages = {
        "data": [{
            "pages": [
                {
                    "title": "Getting Started with FireCrawl",
                    "summary": "Learn how to integrate and use FireCrawl in your applications. This comprehensive guide covers installation, basic usage, and best practices.",
                    "link": "https://firecrawl.dev/docs/getting-started"
                },
                {
                    "title": "API Documentation",
                    "summary": "Complete API reference with examples, parameters, and response formats. Everything you need to know about FireCrawl's API endpoints.",
                    "link": "https://firecrawl.dev/docs/api"
                },
                {
                    "title": "Pricing Plans",
                    "summary": "Explore our flexible pricing options designed to suit projects of any scale, from individual developers to enterprise solutions.",
                    "link": "https://firecrawl.dev/pricing"
                },
                {
                    "title": "Use Cases",
                    "summary": "Discover how different companies are using FireCrawl to power their web scraping and data extraction needs.",
                    "link": "https://firecrawl.dev/use-cases"
                },
                {
                    "title": "Blog",
                    "summary": "Latest updates, tutorials, and insights about web scraping, data extraction, and FireCrawl features.",
                    "link": "https://firecrawl.dev/blog"
                }
            ]
        }]
    }
    return mock_pages["data"]