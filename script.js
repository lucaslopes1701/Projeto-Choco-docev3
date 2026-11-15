document.addEventListener('DOMContentLoaded', () => {
    // 1. Pesquisa Real-time (Filtrar Tabelas e Colunas)
    const searchInput = document.getElementById('search-input');
    const sections = document.querySelectorAll('.table-section');
    const navLinks = document.querySelectorAll('#table-list li');

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();

        sections.forEach((section, index) => {
            const tableName = section.querySelector('h2').innerText.toLowerCase();
            let matchFound = tableName.includes(term);

            const rows = section.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const rowText = row.innerText.toLowerCase();
                if (rowText.includes(term)) {
                    matchFound = true;
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });

            // Oculta a section inteira se não houver match na tabela nem nas colunas
            section.style.display = matchFound ? '' : 'none';
            // Oculta o link na sidebar correspondente
            if(navLinks[index]) navLinks[index].style.display = matchFound ? '' : 'none';
        });
    });

    // 2. Light / Dark Mode Toggle (com persistência em localStorage)
    const themeBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('choco-doce-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    themeBtn.addEventListener('click', () => {
        const html = document.documentElement;
        const nextTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', nextTheme);
        localStorage.setItem('choco-doce-theme', nextTheme);
    });

    // 3. Modal DER e Panzoom.js
    const modal = document.getElementById('der-modal');
    const openModalBtn = document.getElementById('open-modal-btn');
    const closeBtn = document.querySelector('.close-btn');
    const panzoomElement = document.getElementById('panzoom-element').querySelector('img');

    // Inicializa Panzoom
    const panzoom = Panzoom(panzoomElement, {
        maxScale: 5,
        minScale: 0.5,
        contain: 'outside'
    });

    // Habilita Zoom no wheel do mouse
    panzoomElement.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);

    // Controles de Botões
    document.getElementById('zoom-in').addEventListener('click', panzoom.zoomIn);
    document.getElementById('zoom-out').addEventListener('click', panzoom.zoomOut);
    document.getElementById('zoom-reset').addEventListener('click', panzoom.reset);

    // Abrir e Fechar Modal
    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        setTimeout(() => panzoom.reset(), 100); // Reseta a posição ao abrir
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
