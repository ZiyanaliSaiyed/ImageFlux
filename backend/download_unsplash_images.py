import os
import requests
import random
import time

# === CONFIGURATION ===
ACCESS_KEY = 'b-xVPrLxqcBh8F_pI3LS8rcSpatxTya81rVJQQJXqZA'
SEARCH_QUERIES = ['nature', 'technology', 'architecture', 'space', 'abstract']
TOTAL_IMAGES = 500
SAVE_DIR = 'website/gallery_images/archive/'
DISPLAY_DIR = 'website/gallery_images/display/'
IMAGES_PER_QUERY = 100  # Adjust based on TOTAL_IMAGES / len(SEARCH_QUERIES)

# === FUNCTIONS ===
def download_image(url, filename):
    if os.path.exists(filename):
        print(f"File {filename} already exists. Skipping...")
        return
    response = requests.get(url)
    if response.status_code == 200:
        with open(filename, 'wb') as f:
            f.write(response.content)
    else:
        print(f"Failed to download {url}: {response.status_code}")

def fetch_images(query, per_page):
    url = f'https://api.unsplash.com/search/photos?query={query}&per_page={per_page}&client_id={ACCESS_KEY}'
    while True:
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()['results']
        elif response.status_code == 429:  # Rate limit exceeded
            print("Rate limit exceeded. Waiting for 1 hour...")
            time.sleep(3600)  # Wait for 1 hour
        else:
            print(f"Error: {response.status_code} - {response.text}")
            return []

# === MAIN DOWNLOAD ===
if not os.path.exists(SAVE_DIR):
    os.makedirs(SAVE_DIR)

# Count already downloaded images
counter = len(os.listdir(SAVE_DIR))
print(f"Resuming from {counter} downloaded images.")

while counter < TOTAL_IMAGES:
    for query in SEARCH_QUERIES:
        print(f"Fetching for query: {query}")
        images = fetch_images(query, IMAGES_PER_QUERY)
        for img in images:
            if counter >= TOTAL_IMAGES:
                break
            img_url = img['urls']['regular']
            filename = os.path.join(SAVE_DIR, f"img_{counter:03d}.jpg")
            download_image(img_url, filename)
            counter += 1
        if counter >= TOTAL_IMAGES:
            break
    print(f"Downloaded {counter} images so far. Waiting for next batch if needed...")
    time.sleep(1)  # Respect API rate limits

print(f"Downloaded {counter} images.")

# === OPTIONAL: Randomly copy 300 to display/ ===
if not os.path.exists(DISPLAY_DIR):
    os.makedirs(DISPLAY_DIR)

all_archived = os.listdir(SAVE_DIR)
selected = random.sample(all_archived, 300)

for i, filename in enumerate(selected):
    src_path = os.path.join(SAVE_DIR, filename)
    dst_path = os.path.join(DISPLAY_DIR, f"display_{i:03d}.jpg")
    with open(src_path, 'rb') as src, open(dst_path, 'wb') as dst:
        dst.write(src.read())

print(f"Copied 300 images to display folder.")