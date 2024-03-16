from bs4 import BeautifulSoup
import requests,random

def scrape_ebay_products(query):
    url = f"https://www.ebay.com/sch/i.html?_nkw={query}"
    source = requests.get(url)
    soup = BeautifulSoup(source.text, 'html.parser')
    products = []
    items = soup.find_all('div', {'class': 's-item__wrapper'})
    print(len(items))
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
                if 'to' in price.text:
                    product['price'] = float(price.text[:price.text.index('to')].replace('$', '').replace(',', ''))
                else:
                    product['price'] = float(price.text.replace('$', '').replace(',', ''))
            except ValueError:
                product['price'] = random.uniform(0.0, 10000.0)
            if product['name'] != "Shop on eBay":
                products.append(product)
        except Exception as ex:
            print(ex)
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
