    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.getElementById('neural-search');
        // Updated selector to match new classes
        const items = document.querySelectorAll('.sitemap-item-node, .sitemap-item-mini');
        const sections = document.querySelectorAll('.sitemap-section');
        const emptyState = document.getElementById('empty-state');
        const grid = document.getElementById('sitemap-grid');

        // Debounce function for performance
        function debounce(func, wait) {
            let timeout;
            return function(...args) {
                const context = this;
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(context, args), wait);
            };
        }

        const handleSearch = debounce((e) => {
            const query = e.target.value.toLowerCase().trim();
            const safeQuery = query.replace(/[^\w\s\u00C0-\u00FF!@#$%^&*()\-+={}\[\]|\\:;"'<>,.?\/]/g, '');
            
            let visibleCount = 0;

            items.forEach(item => {
                const tokens = item.getAttribute('data-tokens') || '';
                let title = '';
                let desc = '';

                if (item.classList.contains('sitemap-item-node')) {
                    title = item.querySelector('.font-semibold')?.textContent.toLowerCase() || '';
                    desc = item.querySelector('.text-xs')?.textContent.toLowerCase() || '';
                } else {
                    title = item.textContent.toLowerCase() || '';
                }
                
                // Logic: Find Match
                if (safeQuery === '' || tokens.includes(safeQuery) || title.includes(safeQuery) || desc.includes(safeQuery)) {
                    item.parentElement.classList.remove('hidden-item'); // Legacy check
                    item.style.display = ''; 
                    item.classList.remove('hidden'); 
                    visibleCount++;

                    // FORCE EXPAND ACCORDION IF SEARCHING
                    if (safeQuery !== '') {
                        const parentDetails = item.closest('details');
                        if (parentDetails) parentDetails.open = true;
                    }
                } else {
                    item.classList.add('hidden');
                }
            });

            // Hide/Show sections based on children
            sections.forEach(section => {
                // If section is a details element, check its children
                const visibleChildren = Array.from(section.querySelectorAll('.sitemap-item-node, .sitemap-item-mini')).filter(el => !el.classList.contains('hidden'));
                
                if (visibleChildren.length > 0) {
                    section.classList.remove('hidden');
                    section.style.display = '';
                } else {
                    section.classList.add('hidden');
                    section.style.display = 'none'; // Force hide empty sections
                }
            });

            // Handle empty state
            if (visibleCount === 0) {
                grid.classList.add('hidden');
                emptyState.classList.remove('hidden');
            } else {
                grid.classList.remove('hidden');
                emptyState.classList.add('hidden');
            }
        }, 150); // 150ms debounce

        searchInput.addEventListener('input', handleSearch);

        // Fast escape to clear
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
                searchInput.blur();
            }
        });

        if (typeof icons !== 'undefined') icons.createIcons();
    });
