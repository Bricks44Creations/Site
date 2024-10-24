function sortPortfolio(criteria) {
    console.log("Tri par :", criteria); // Débogage
    const portfolio = document.getElementById("portfolio");
    const items = Array.from(portfolio.getElementsByClassName("portfolio_children"));

    console.log("Éléments avant le tri :", items); // Débogage

    let sortedItems;

    switch (criteria) {
        case 'name-asc':
            sortedItems = items.sort((a, b) => {
                const nameA = a.dataset.name || ""; // Assure que nameA n'est pas undefined
                const nameB = b.dataset.name || ""; // Assure que nameB n'est pas undefined
                return nameA.localeCompare(nameB);
            });
            break;
        case 'name-desc':
            sortedItems = items.sort((a, b) => {
                const nameA = a.dataset.name || ""; // Assure que nameA n'est pas undefined
                const nameB = b.dataset.name || ""; // Assure que nameB n'est pas undefined
                return nameB.localeCompare(nameA);
            });
            break;
        case 'date-asc':
            sortedItems = items.sort((a, b) => new Date(a.dataset.date) - new Date(b.dataset.date));
            break;
        case 'date-desc':
            sortedItems = items.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
            break;
        case 'relevance':
            sortedItems = items.sort((a, b) => b.dataset.relevance - a.dataset.relevance);
            break;
    }

    console.log("Éléments triés :", sortedItems); // Débogage

    // Remplace le contenu de portfolio avec les éléments triés
    portfolio.innerHTML = '';
    sortedItems.forEach(item => portfolio.appendChild(item));
}
