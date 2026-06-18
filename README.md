# EBEECHARGE Website

An end-to-end, high-conversion EV charging ecosystem website built with HTML5, Vanilla CSS3, and JavaScript, compiled and served locally using Vite.

## Project Structure

```text
├── index.html                   # Homepage (Audience segmentation router)
├── rwa/
│   └── index.html               # Housing Society / RWA solution page
├── developers/
│   └── index.html               # Developer / Commercial Property solution page
├── products/
│   ├── smart-db/
│   │   └── index.html           # Smart DB product specification page
│   ├── movable-charger/
│   │   └── index.html           # Movable Charger product specification page
│   └── ebee-dashboard/
│       └── index.html           # EBEE Dashboard product specification page
├── about/
│   └── index.html               # Corporate About Us page
├── contact/
│   └── index.html               # General contact page
├── demo/
│   └── index.html               # Demo request landing page (Dynamic parameter pre-fills)
├── css/
│   └── style.css                # Master CSS Design System (Electric Indigo theme)
├── js/
│   ├── main.js                  # Scroll animations, header transformations, mobile navigation
│   ├── calculator.js            # Real-time ROI Calculator logic for Developer page
│   └── dashboard-mockup.js      # Interactive simulated dashboard (Overview, Live Sessions, Billing)
├── assets/
│   └── images/                  # High-quality generated product renders & hero images
├── package.json                 # Project configuration and script manager
└── vite.config.js               # Multi-page Rollup mapping config for Vite
```

## Features

- **Dynamic Audience Routing**: Identifies the visitor immediately on the homepage and maps them to RWA or Developer conversion funnels.
- **Premium Design System**: Implements HSL styled color variables (Electric Indigo primary theme, Soft Lavender accents, and Deep Navy dark nodes) avoiding typical green EV clichés.
- **Interactive Dashboard Mockups**: Simulates the EBEE control software. Visitors can toggle between Overview, Live Sessions, and Billing statements.
- **Dynamic ROI Calculator**: Allows developer prospects to adjust deployed chargers, session count, and tariff values to estimate monthly returns and return-on-investment timelines.
- **Zero-Warning Production Build**: Fully optimized and tree-shaken JS bundling using Vite for sub-second page loads.
- **Built-in SEO & Structured Data**: Complete Open Graph social headers, canonical links, and automated JSON-LD Organization & Product schemas.

## Running Locally

To run the local development server with Hot Module Replacement (HMR):

1. **Install Dependencies** (If you haven't already):
   ```bash
   npm install
   ```

2. **Run Dev Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

3. **Build Production Assets**:
   ```bash
   npm run build
   ```
   Compiles optimized HTML, CSS, and JS chunks into the `/dist` directory.
