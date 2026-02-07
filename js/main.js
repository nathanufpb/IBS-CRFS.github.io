// Main JavaScript file for IBS-CRFS website
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active class to current page navigation link
    const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentLocation) {
            link.classList.add('active');
        }
    });

    // Dynamic collection table: loads data/colecao.csv and enables client-side filter
    const searchInput = document.getElementById('collection-search');
    const table = document.getElementById('collection-table');
    const statusEl = document.getElementById('collection-status');
    const metaEl = document.getElementById('collection-meta');
    const MAX_ROWS = 500;

    if (searchInput && table && statusEl && metaEl) {
        const tbody = table.querySelector('tbody');
        let records = [];
        const loadCSV = async () => {
            try {
                statusEl.textContent = 'Carregando registros da coleção...';
                const resp = await fetch('data/colecao.csv', { cache: 'no-cache' });
                if (!resp.ok) throw new Error(`Erro ao carregar CSV: ${resp.status}`);
                const text = await resp.text();

                const parseWithPapa = (csvText) => {
                    return window.Papa.parse(csvText, {
                        header: true,
                        skipEmptyLines: true,
                        dynamicTyping: false
                    });
                };

                let parsed;
                if (window.Papa) {
                    parsed = parseWithPapa(text);
                    if (parsed.errors && parsed.errors.length) {
                        console.warn('Erros de parsing PapaParse', parsed.errors.slice(0, 3));
                    }
                    if (!parsed.data || !parsed.data.length) throw new Error('CSV sem linhas de dados.');
                } else {
                    throw new Error('Parser PapaParse não carregado.');
                }

                const needed = ['catalogNumber','order','family','genus','specificEpithet','scientificName','stateProvince','municipality','locality','eventDate','preparations'];
                const missing = needed.filter(n => !(n in parsed.data[0]));
                if (missing.length) throw new Error(`Colunas ausentes no CSV: ${missing.join(', ')}`);

                records = parsed.data.map(row => ({
                    catalogNumber: row.catalogNumber || '',
                    order: row.order || '',
                    family: row.family || '',
                    genus: row.genus || '',
                    scientificName: row.scientificName || row.specificEpithet || '',
                    stateProvince: row.stateProvince || '',
                    municipality: row.municipality || '',
                    locality: row.locality || '',
                    eventDate: row.eventDate || '',
                    preparations: row.preparations || ''
                }));

                statusEl.textContent = '';
                render();
            } catch (err) {
                console.error(err);
                statusEl.textContent = err.message || 'Não foi possível carregar a tabela da coleção.';
                metaEl.textContent = '';
            }
        };

        const render = (term = '') => {
            const needle = term.trim().toLowerCase();
            const filtered = needle
                ? records.filter(r => `${r.catalogNumber} ${r.order} ${r.family} ${r.genus} ${r.scientificName} ${r.stateProvince} ${r.municipality} ${r.locality} ${r.eventDate} ${r.preparations}`.toLowerCase().includes(needle))
                : records;
            const slice = filtered.slice(0, MAX_ROWS);
            metaEl.textContent = `Mostrando ${slice.length} de ${filtered.length} registros (limite ${MAX_ROWS}). Total carregado: ${records.length}.`;
            tbody.innerHTML = slice.map(r => `
                <tr>
                    <td>${r.catalogNumber || '-'}</td>
                    <td>${r.order || '-'}</td>
                    <td>${r.family || '-'}</td>
                    <td>${r.genus || '-'}</td>
                    <td>${r.scientificName || '-'}</td>
                    <td>${r.stateProvince || '-'}</td>
                    <td>${r.municipality || '-'}</td>
                    <td>${r.locality || '-'}</td>
                    <td>${r.eventDate || '-'}</td>
                    <td>${r.preparations || '-'}</td>
                </tr>
            `).join('');
        };

        searchInput.addEventListener('input', () => render(searchInput.value));
        loadCSV();
    }

    // Mobile menu toggle (if needed in future)
    // This is a placeholder for potential mobile menu functionality
    console.log('IBS-CRFS website loaded successfully');
});
