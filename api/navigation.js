function setupNavigation() {
    const suggestionCards = document.querySelectorAll('.suggestion-card');
    suggestionCards.forEach(card => {
        card.addEventListener('click', () => {
            const link = card.getAttribute('onclick').match(/'([^']+)'/)[1];
            const basePath = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '/');
            window.location.href = basePath + link;
        });
    });
}
