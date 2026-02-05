import requests
import json

# Test the related articles endpoint with a sample summary
test_summary = """
This research paper presents a novel machine learning approach for sentiment analysis in social media data. 
The study employs deep learning techniques, specifically transformer-based models, to analyze Twitter data 
and predict sentiment with high accuracy. The methodology involves data preprocessing, feature extraction, 
and model training using a large dataset of labeled tweets. Results show significant improvement over 
traditional sentiment analysis methods.
"""

def test_related_articles():
    url = "http://127.0.0.1:5000/api/find-related-articles"
    data = {"summary": test_summary}
    
    try:
        response = requests.post(url, json=data)
        if response.status_code == 200:
            result = response.json()
            if result.get('success'):
                articles = result.get('articles', [])
                print(f"Found {len(articles)} related articles:")
                print("=" * 50)
                
                for i, article in enumerate(articles, 1):
                    print(f"\n{i}. {article.get('title', 'N/A')}")
                    print(f"   Authors: {', '.join(article.get('authors', []))}")
                    print(f"   Journal: {article.get('journal', 'N/A')}")
                    print(f"   Date: {article.get('date', 'N/A')}")
                    print(f"   Citations: {article.get('citations', 'N/A')}")
                    print(f"   URL: {article.get('url', 'N/A')}")
                    print(f"   Description: {article.get('description', 'N/A')[:150]}...")
                    
                    # Check if URL is valid
                    url_val = article.get('url', '')
                    if url_val and url_val != '#' and url_val.startswith('http'):
                        print(f"   ✅ URL looks valid")
                    else:
                        print(f"   ❌ URL is missing or invalid")
                
                print("\n" + "=" * 50)
                print("Test completed successfully!")
            else:
                print(f"API returned error: {result}")
        else:
            print(f"HTTP Error: {response.status_code}")
            print(f"Response: {response.text}")
            
    except Exception as e:
        print(f"Error testing related articles: {str(e)}")

if __name__ == "__main__":
    test_related_articles()
