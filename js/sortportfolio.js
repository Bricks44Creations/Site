let currentSort = 'Relevance'; // Valeur par défaut pour le tri

// Fonction pour trier le portfolio en fonction du critère sélectionné
function sortPortfolio(criteria) {
    console.log("Tri par :", criteria); // Affiche le critère de tri sélectionné pour le débogage
    
    // Récupère l'élément contenant le portfolio
    const portfolio = document.getElementById("portfolio");
    // Récupère tous les éléments enfants du portfolio et les convertit en tableau
    const items = Array.from(portfolio.getElementsByClassName("portfolio_children"));

    console.log("Éléments avant le tri :", items); // Affiche les éléments avant le tri pour le débogage

    let sortedItems; // Variable pour stocker les éléments triés

    // Tri des éléments en fonction du critère
    switch (criteria) {
        case 'name-asc': // Tri par nom croissant
            sortedItems = items.sort((a, b) => {
                const nameA = a.dataset.name || ""; // Assure que nameA n'est pas undefined
                const nameB = b.dataset.name || ""; // Assure que nameB n'est pas undefined
                return nameA.localeCompare(nameB); // Compare les noms
            });
            currentSort = 'Name A-Z'; // Met à jour le critère actuel
            break;

        case 'name-desc': // Tri par nom décroissant
            sortedItems = items.sort((a, b) => {
                const nameA = a.dataset.name || ""; // Assure que nameA n'est pas undefined
                const nameB = b.dataset.name || ""; // Assure que nameB n'est pas undefined
                return nameB.localeCompare(nameA); // Compare les noms
            });
            currentSort = 'Name Z-A'; // Met à jour le critère actuel
            break;

        case 'date-asc': // Tri par date croissante
            sortedItems = items.sort((a, b) => new Date(a.dataset.date) - new Date(b.dataset.date));
            currentSort = 'Date (oldest to newest)'; // Met à jour le critère actuel
            break;

        case 'date-desc': // Tri par date décroissante
            sortedItems = items.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
            currentSort = 'Date (newest to oldest)'; // Met à jour le critère actuel
            break;

        case 'relevance': // Tri par pertinence
            sortedItems = items.sort((a, b) => b.dataset.relevance - a.dataset.relevance);
            currentSort = 'Relevance'; // Met à jour le critère actuel
            break;

        default: // Si le critère n'est pas reconnu
            sortedItems = items; // Ne pas trier, garder l'ordre actuel
    }

    console.log("Éléments triés :", sortedItems); // Affiche les éléments triés pour le débogage

    // Remplace le contenu du portfolio avec les éléments triés
    portfolio.innerHTML = ''; // Vide le contenu actuel
    sortedItems.forEach(item => portfolio.appendChild(item)); // Ajoute chaque élément trié

    // Met à jour le texte du bouton de tri pour indiquer le critère actuel
    document.querySelector('.dropbtn-tri').textContent = `Sort by: ${currentSort}`;
}
