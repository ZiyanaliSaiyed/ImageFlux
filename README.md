🖼️ Daily Art Gallery
A beautiful automated static website that refreshes its visuals every day with new curated art images, powered by Python scripting and GitHub Actions. Ideal for art lovers, portfolio demonstrators, or anyone interested in combining web design with automation.

🌟 Features
Automated daily image updates via Python + BeautifulSoup.

Responsive HTML/CSS front-end with lazy loading.

Free hosting on GitHub Pages with CI/CD using GitHub Actions.

Lightweight, fast-loading image gallery.

SEO and accessibility optimized.

⚙️ Tech Stack
Python (requests, BeautifulSoup, Pillow)

HTML, CSS, JavaScript

GitHub Actions for scheduled updates

GitHub Pages for hosting

📁Project Structure

daily-art-gallery/
├── .github/workflows/update.yml  ← automation script (CI/CD)
├── images/                       ← updated image gallery
├── scripts/fetch_images.py      ← Python image scraper
├── website/                     ← HTML, CSS, JS for the front-end
├── .gitignore
├── requirements.txt
└── README.md

📌 How It Works
Python script fetches a new image from the web every day.

GitHub Actions runs the script and commits changes to the repo.

GitHub Pages serves the updated static site instantly.

📅 Roadmap
 Initial project setup

 Fetch and store daily images

 Display images in grid with lazy loading

 Schedule updates via GitHub Actions

 Add SEO tags and social previews

📄 License
MIT License