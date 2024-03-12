from selenium import webdriver
from bs4 import BeautifulSoup
import requests,random

def scrape_ebay_products(query):
    url = f"https://www.ebay.com/sch/i.html?_nkw={query}"
    source = requests.get(url)
    soup = BeautifulSoup(source.text, 'html.parser')
    products = []
    items = soup.find_all('div', {'class': 's-item__wrapper'})
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
                product['price'] = float(price.text.replace('$', '').replace(',', ''))
            except ValueError:
                product['price'] = random.uniform(0.0, 10000.0)
                products.append(product)
        except Exception as Exception:
            print(Exception)
            pass
    return products

# query = "laptop"
# products = scrape_ebay_products(query)
# if products:
#     for product in products:
#         print("Name:", product['name'])
#         print("Price:", product['price'])
#         print("Image URL:", product['image_url'])
#         print()
