# Random Learning WebDev

> A gamified, retro pixel-art learning hub — interactive exercises, live previews, and code challenges. Learn web development by doing.

![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000?logo=vercel)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite)

**Live site:** [random-learning-webdev-site.vercel.app](https://random-learning-webdev-site.vercel.app)

---

## Features

### Interactive Exercise Catalog
26 mini-projects spanning **UI Components**, **Visual Effects**, and **Logic & Data**, plus one featured full build. Each exercise includes:
- **Live Demo** — see it running right in the browser
- **View Source** — study the code on GitHub
- **Tag Filtering** — filter by technology or category

### Code Challenges
5 built-in coding challenges with an interactive playground:
- **Live Editor** — edit code and see results instantly
- **Show Solution** — toggle solution view
- **Reset** — start fresh anytime
- **Random from Library** — pull a random exercise to practice

### Live Demo Modal
Click "Live Demo" on any exercise to open a full preview modal with the working component embedded directly in the page.

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **Vite 6** | Build tool & dev server |
| **CSS** | Styling with custom properties |
| **Canvas API** | Animated pixel backgrounds |
| **IntersectionObserver** | Scroll-reveal animations |

## Design

The site features a retro pixel-art theme with:
- Animated starfield background with twinkling stars
- Colorful pixel-rain particles
- Parallax mountain layers
- CRT scanline overlay
- Glow and hover effects throughout

## Getting Started

```bash
# Clone the repo
git clone https://github.com/houtaroudes/Random-Learning-WebDev.git
cd Random-Learning-WebDev

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
Random-Learning-WebDev/
├── public/
│   └── demos/          # Standalone HTML exercise files (live demos)
├── src/
│   ├── App.jsx          # Main React component
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── vercel.json           # Vercel deployment config
```

The root directory also holds the original standalone exercise files (`.html`, `.css`, `.js`) for individual study, including the `houtarou_pos.html` featured project.

## Stats

- **Exercises:** 26 (9 UI · 13 Visual · 3 Logic · 1 Featured)
- **Code Challenges:** 5
- **Technologies:** HTML5, CSS3, JavaScript, React, TypeScript, GSAP, PHP
- **Highlights:** Dark mode, QR code generator, password generator, OTP input UI, and a full café POS system prototype

## Author

**HoutarouDes** — learning web development one exercise at a time.

---

<p align="center">
  <sub>Built with React, Vite, and a lot of curiosity</sub>
</p>
