# IBS-CRFS Website

Instituto de Biologia de Solos – Coleção de Referência da Fauna de Solos

## Overview

This is the official institutional website for IBS-CRFS, a comprehensive reference collection of soil fauna. The website provides information about our collection, research projects, team, and publications.

## Website Structure

- **Home** (`index.html`) - Main landing page with mission and highlights
- **About** (`about.html`) - Information about IBS-CRFS history and mission
- **Collection** (`collection.html`) - Details about our soil fauna collection
- **Interactive Map** (`map.html`) - Leaflet-based map showing sampling locations
- **Projects** (`projects.html`) - Current and completed research projects
- **Publications** (`publications.html`) - Scientific publications from our research
- **Team** (`team.html`) - Our researchers and staff
- **Contact** (`contact.html`) - Contact information and inquiry form

## Features

- ✅ Fully static HTML, CSS, and JavaScript
- ✅ GitHub Pages compatible
- ✅ Responsive design (mobile-friendly)
- ✅ Interactive map with OpenStreetMap and Leaflet
- ✅ GeoJSON data for sampling locations
- ✅ Academic design with professional styling
- ✅ Relative links for easy deployment

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- [Leaflet.js](https://leafletjs.com/) v1.9.4 (via CDN)
- [OpenStreetMap](https://www.openstreetmap.org/) tiles
- GeoJSON for geographic data

## Local Development

To run the website locally:

1. Clone this repository
2. Start a local web server in the project directory:
   ```bash
   python3 -m http.server 8000
   ```
3. Open your browser and navigate to `http://localhost:8000`

## Deployment

This website is designed for GitHub Pages. To deploy:

1. Push changes to the main branch
2. Enable GitHub Pages in repository settings
3. Select the main branch as the source
4. The website will be available at `https://username.github.io/repository-name/`

## File Structure

```
.
├── index.html              # Home page
├── about.html              # About page
├── collection.html         # Collection page
├── map.html               # Interactive map page
├── projects.html          # Projects page
├── publications.html      # Publications page
├── team.html              # Team page
├── contact.html           # Contact page
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   ├── main.js            # Main JavaScript
│   ├── map.js             # Map initialization
│   └── contact.js         # Contact form handling
└── data/
    └── sampling-points.geojson  # Sampling locations data

```

## Customization

### Colors
The color scheme is defined in CSS custom properties in `css/style.css`:
- Primary color: `#2c5f2d` (dark green)
- Secondary color: `#4a7c59` (medium green)
- Accent color: `#7fa650` (light green)

### Content
Update the HTML files directly to modify content. All files use semantic HTML5 markup.

### Map Data
Edit `data/sampling-points.geojson` to update sampling locations. Follow GeoJSON format specifications.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Internet Explorer 11+ (with some CSS limitations)

## License

© 2024 IBS-CRFS - Instituto de Biologia de Solos. All rights reserved.

## Contact

For questions or collaboration opportunities, please use the contact form on the website or email us at contact@ibs-crfs.org