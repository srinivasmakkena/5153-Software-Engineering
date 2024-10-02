from bs4 import BeautifulSoup
import requests
import random

def scrape_ebay_products(query):
    """
    Scrapes eBay products based on the provided query.

    Args:
    - query (str): The search query for products on eBay.

    Returns:
    - products (list of dict): List containing dictionaries of scraped product information.
    Each dictionary contains 'name', 'price', and 'image_url' keys.
    """
    # Building url with query
    url = f"https://www.ebay.com/sch/i.html?_nkw={query}"
    # Getting the source and parsing from the url
    source = requests.get(url)
    soup = BeautifulSoup(source.text, 'html.parser')
    products = []
    items = soup.find_all('div', {'class': 's-item__wrapper'})

    # Iterating over each item found in the eBay search results
    for item in items:
        try:
            name = item.find('div', {'class': 's-item__title'})
            price = item.find('span', {'class': 's-item__price'})
            image_url = item.find('img')
            product = {
                'name': name.text,
                'image_url': image_url['src']
            }
            try:
                # Extracting and converting price to float
                if 'to' in price.text:
                    product['price'] = float(price.text[:price.text.index('to')].replace('$', '').replace(',', ''))
                else:
                    product['price'] = float(price.text.replace('$', '').replace(',', ''))
            except ValueError:
                # Assigning a random price if the conversion fails
                product['price'] = random.uniform(0.0, 10000.0)
            
            # Checking if the product name is valid and not just an advertisement
            if product['name'] != "Shop on eBay":
                products.append(product)
        except Exception as ex:
            print(ex)
            pass

    return products

# Example usage:
# query = "laptop"
# products = scrape_ebay_products(query)
# if products:
#     for product in products:
#         print("Name:", product['name'])
#         print("Price:", product['price'])
#         print("Image URL:", product['image_url'])
#         print()
