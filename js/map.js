// Map initialization script for IBS-CRFS
document.addEventListener('DOMContentLoaded', function() {
    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        console.error('Leaflet library not loaded. Map functionality will not be available.');
        const mapElement = document.getElementById('map');
        if (mapElement) {
            mapElement.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background-color: #f5f5f5; padding: 2rem; text-align: center;"><p style="color: #666;">Map is loading. If the map does not appear, please check your internet connection or try refreshing the page.</p></div>';
        }
        return;
    }

    // Initialize the map centered on Brazil
    const map = L.map('map').setView([-7.1195, -34.8450], 6);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    // Load GeoJSON data
    fetch('data/sampling-points.geojson')
        .then(response => response.json())
        .then(data => {
            // Add GeoJSON layer to map
            L.geoJSON(data, {
                onEachFeature: function(feature, layer) {
                    // Create popup content
                    let popupContent = `<div class="popup-content">`;
                    popupContent += `<h3>${feature.properties.site_name}</h3>`;
                    popupContent += `<p><strong>Location:</strong> ${feature.properties.location}</p>`;
                    popupContent += `<p><strong>Ecosystem:</strong> ${feature.properties.ecosystem}</p>`;
                    popupContent += `<p><strong>Sampling Date:</strong> ${feature.properties.date}</p>`;
                    if (feature.properties.species) {
                        popupContent += `<p><strong>Species Collected:</strong> ${feature.properties.species}</p>`;
                    }
                    popupContent += `</div>`;
                    
                    layer.bindPopup(popupContent);
                },
                pointToLayer: function(feature, latlng) {
                    // Custom marker styling based on ecosystem type
                    const ecosystemColors = {
                        'Atlantic Forest': '#2c5f2d',
                        'Caatinga': '#8B4513',
                        'Cerrado': '#DAA520',
                        'Agricultural': '#CD853F',
                        'Urban': '#696969'
                    };
                    
                    const color = ecosystemColors[feature.properties.ecosystem] || '#4a7c59';
                    
                    return L.circleMarker(latlng, {
                        radius: 8,
                        fillColor: color,
                        color: '#fff',
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.8
                    });
                }
            }).addTo(map);
        })
        .catch(error => {
            console.error('Error loading GeoJSON data:', error);
        });

    // Add scale control
    L.control.scale().addTo(map);
});
