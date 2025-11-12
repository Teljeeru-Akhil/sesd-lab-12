# 📰 Breaking News Website

A simple and responsive **Breaking News Aggregator** built using **HTML, Tailwind CSS, and JavaScript**.  
It fetches the latest headlines from [NewsAPI.org](https://newsapi.org) and allows users to filter news by **country** and **category**, with **auto-refresh** and **pagination** support.

---

## 🌟 Features

- Fetches **real-time headlines** from [NewsAPI](https://newsapi.org)
- Filter by:
  - 🏳️ **Country** (e.g., India, US, UK)
  - 📰 **Category** (Sports, Tech, Politics, etc.)
- **Auto-refresh** toggle with customizable interval
- **Pagination** (Next/Previous page buttons)
- Built with **Tailwind CSS** for modern responsive design
- Hosted easily via **GitHub Pages** or any static web host

---

## 🧩 Tech Stack

- **Frontend:** HTML5, Tailwind CSS, JavaScript (ES6)
- **API:** [NewsAPI.org](https://newsapi.org)
- **Optional Backend (for security):** Node.js or Flask proxy (to hide API key)

---

## 🗂️ Project Structure

news-website/
│
├── index.html # Main webpage
├── styles.css # Custom styling
├── app.js # JavaScript logic
└── README.md # Project documentation

yaml
Copy code

---

## ⚙️ Setup & Usage

### 1. Get a NewsAPI Key
- Go to [https://newsapi.org](https://newsapi.org)
- Sign up for a free account
- Copy your API key (e.g., `4c5455d1d7564883abd02efd9323b682`)

### 2. Configure the API Key
In your `app.js`, replace:
```js
const NEWSAPI_KEY = 'REPLACE_WITH_YOUR_KEY';
with your actual key:

js
Copy code
const NEWSAPI_KEY = '4c5455d1d7564883abd02efd9323b682';
3. Run Locally
Simply open index.html in your web browser.

Select country and category filters.

Click Refresh to view the latest news.

4. Optional: Auto Refresh
Toggle Auto: On to enable live updates.

You can adjust the refresh interval (in seconds).

🚀 Deployment
You can host this static website easily using GitHub Pages:

Push your project to a GitHub repository.

Go to Settings → Pages.

Under Source, select the main branch and / (root).

Click Save — your live link will appear in a few seconds.

🔒 Security Note
Since the NewsAPI key is public in client-side JavaScript, others can see it in your browser’s network requests.
To protect it, you can use a small Node.js or Flask backend proxy to make API requests securely.

If you want, I can provide a ready-to-use server.js proxy file.

📸 Preview

🧠 Learning Focus
API Authentication

Dynamic DOM Updates

Pagination Handling

Tailwind Layout Design

API Data Rendering

Auto-refresh with setInterval

🧑‍💻 Author
Akhil Teljeeru
📧 [Contact or GitHub profile link here]
🚀 Built as part of a web development learning project.

