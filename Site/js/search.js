function searchPages() {
    var input, filter, sidebar, links, a, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    sidebar = document.getElementById("sidebar");
    links = sidebar.getElementsByTagName("a");
    
    // Parcourir tous les liens de la barre latérale
    for (i = 0; i < links.length; i++) {
        a = links[i];
        txtValue = a.textContent || a.innerText;
        // Si le texte du lien correspond à la recherche
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            // Rediriger vers la page correspondante
            window.location.href = a.href;
            return; // Sortir de la fonction après la redirection
        }
    }
}

// Fonction pour rechercher et valider avec la touche Entrée
function searchOnEnter(event) {
    if (event.keyCode === 13) {
        searchPages();
    }
}

// Ajoutez cet écouteur d'événement à votre champ de recherche
document.getElementById("searchInput").addEventListener("keydown", searchOnEnter);
