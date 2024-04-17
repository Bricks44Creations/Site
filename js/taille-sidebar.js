window.addEventListener('load', function() {
    adjustSidebarHeight(); // Appel de la fonction au chargement de la page
});

window.addEventListener('resize', function() {
    adjustSidebarHeight(); // Appel de la fonction lors du redimensionnement de la fenêtre
});

function adjustSidebarHeight() {
    var sidebar = document.querySelector('.sidebar');
    var contentHeight = document.querySelector('.main-content').offsetHeight;
    var windowHeight = window.innerHeight;
    var safe = 100;

    // Si la hauteur du contenu est supérieure à la hauteur de la fenêtre, ajuster la hauteur de la sidebar
    if (contentHeight > windowHeight) {
        sidebar.style.height = contentHeight + safe + 'px';
    } else {
        sidebar.style.height = '100vh'; // Sinon, rétablir la hauteur minimale de 100vh
    }
}
