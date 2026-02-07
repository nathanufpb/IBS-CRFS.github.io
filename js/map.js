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

    const statusEl = document.getElementById('map-status');

    // Initialize the map centered on Brazil
    const map = L.map('map').setView([-14.235, -51.9253], 4.5);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    const addMarkersFromCSV = async () => {
        try {
            if (statusEl) statusEl.textContent = 'Carregando pontos da coleção...';

            const resp = await fetch('data/colecao.csv', { cache: 'no-cache' });
            if (!resp.ok) throw new Error(`Erro ao carregar colecao.csv: ${resp.status}`);
            const csvText = await resp.text();
            if (!window.Papa) throw new Error('Parser CSV não carregado.');

            const parsed = window.Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true
            });

            if (parsed.errors && parsed.errors.length) {
                console.warn('Erros de parsing CSV', parsed.errors.slice(0, 3));
            }

            const rows = (parsed.data || []).filter(r => typeof r === 'object');
            const markers = [];
            const bounds = L.latLngBounds();

            rows.forEach(row => {
                const lat = Number(row.decimalLatitude);
                const lon = Number(row.decimalLongitude);
                if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;

                const sci = row.scientificName || row.specificEpithet || '';
                const localityParts = [row.stateProvince, row.municipality, row.locality].filter(Boolean).join(' - ');
                const popupContent = `
                    <div class="popup-content">
                        <h3>${row.catalogNumber || 'Sem código'}</h3>
                        <p><strong>Scientific Name:</strong> ${sci || '-'}</p>
                        <p><strong>Order / Family:</strong> ${row.order || '-'} / ${row.family || '-'}</p>
                        <p><strong>Locality:</strong> ${localityParts || '-'}</p>
                        <p><strong>Date:</strong> ${row.eventDate || '-'}</p>
                        <p><strong>Preservação:</strong> ${row.preparations || '-'}</p>
                    </div>
                `;

                const marker = L.circleMarker([lat, lon], {
                    radius: 6,
                    fillColor: '#2c5f2d',
                    color: '#fff',
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                }).bindPopup(popupContent);

                markers.push(marker);
                bounds.extend([lat, lon]);
            });

            if (!markers.length) throw new Error('Nenhum ponto válido com coordenadas no CSV.');

            const layer = L.layerGroup(markers).addTo(map);
            map.fitBounds(bounds.pad(0.1));

            if (statusEl) statusEl.textContent = `Exibindo ${markers.length} pontos com coordenadas válidas.`;
        } catch (err) {
            console.error(err);
            if (statusEl) statusEl.textContent = err.message || 'Erro ao carregar pontos do CSV.';
        }
    };

    addMarkersFromCSV();

    // Add scale control
    L.control.scale().addTo(map);
});
