// Fonction pour récupérer toutes les images
const thumbnails = document.querySelectorAll(".thumbnail_2");
const totalImages = thumbnails.length; // Récupérer le nombre total d'images
let currentIndex = 0; // Index de l'image actuelle

// Fonction pour afficher l'image sélectionnée en grand à droite
function showImage(index, src) {
    const mainImage = document.getElementById("mainImage");
    mainImage.src = src;

    // Mettre à jour l'état actif pour les miniatures
    thumbnails.forEach(thumb => thumb.classList.remove("active"));
    document.querySelector(`img[src="${src}"]`).classList.add("active");

    // Mettre à jour le compteur d'images
    const imageCounter = document.getElementById("imageCounter");
    imageCounter.textContent = `${index + 1}/${totalImages}`;

    // Ajuster la hauteur du carrousel
    adjustCarouselHeight();

    // Mettre à jour l'index courant
    currentIndex = index;
}

// Fonction pour ajuster la hauteur du carrousel
function adjustCarouselHeight() {
    const mainImage = document.getElementById("mainImage");
    const carousel = document.querySelector(".carousel");

    // Mettre la hauteur du carrousel à la hauteur de l'image principale
    carousel.style.maxHeight = `${mainImage.clientHeight}px`;
}

// Appeler adjustCarouselHeight lorsque l'image principale est chargée
document.getElementById("mainImage").addEventListener("load", adjustCarouselHeight);

// Utiliser ResizeObserver pour ajuster la hauteur en temps réel
const mainImage = document.getElementById("mainImage");
const resizeObserver = new ResizeObserver(() => {
    adjustCarouselHeight();
});

resizeObserver.observe(mainImage);

// Optionnel : ajuster la hauteur lors du redimensionnement de la fenêtre
window.addEventListener('resize', adjustCarouselHeight);

// Appeler adjustCarouselHeight au chargement initial pour définir la hauteur
document.addEventListener("DOMContentLoaded", () => {
    adjustCarouselHeight();
    // Initialiser le compteur d'images
    const imageCounter = document.getElementById("imageCounter");
    imageCounter.textContent = `1/${totalImages}`;
});

// Fonction pour ouvrir la modale
function openModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "flex";
    
    // Mettre à jour l'image de la modale pour qu'elle corresponde à l'image principale
    const modalImage = document.querySelector(".modal-image");
    modalImage.src = document.getElementById("mainImage").src; // Utilise l'image principale

    // Mettre à jour l'index courant pour la modale
    const currentThumbnailIndex = Array.from(thumbnails).findIndex(thumb => thumb.src === modalImage.src);
    currentIndex = currentThumbnailIndex; // Met à jour l'index courant pour les flèches

    footer.classList.add('footer-inactive'); // Ajouter la classe pour rendre le footer transparent
}

// Fonction pour fermer la modale
function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    footer.classList.remove('footer-inactive'); // Retirer la classe pour revenir à l'opacité normale
}

// Fonction pour naviguer à l'image précédente
function prevImage() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages; // Boucle à la dernière image si on va avant la première
    showImage(currentIndex, thumbnails[currentIndex].src); // Met à jour l'image principale

    // Met à jour l'image de la modale
    const modalImage = document.querySelector(".modal-image");
    modalImage.src = thumbnails[currentIndex].src; // Met à jour l'image de la modale
}

// Fonction pour naviguer à l'image suivante
function nextImage() {
    currentIndex = (currentIndex + 1) % totalImages; // Boucle à la première image si on va après la dernière
    showImage(currentIndex, thumbnails[currentIndex].src); // Met à jour l'image principale

    // Met à jour l'image de la modale
    const modalImage = document.querySelector(".modal-image");
    modalImage.src = thumbnails[currentIndex].src; // Met à jour l'image de la modale
}

// Écouter les touches du clavier pour la navigation
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        prevImage(); // Naviguer à l'image précédente
    } else if (event.key === "ArrowRight") {
        nextImage(); // Naviguer à l'image suivante
    } else if (event.key === "Escape") {
        closeModal(); // Fermer la modale avec la touche Échap
    }
});

// Améliorer l'accessibilité avec ARIA
thumbnails.forEach((thumb, index) => {
    thumb.setAttribute('role', 'button');
    thumb.setAttribute('tabindex', '0'); // Rendre les miniatures accessibles via le clavier
    thumb.setAttribute('aria-label', `Voir l'image ${index + 1}`);

    // Ajouter un écouteur d'événements pour les touches
    thumb.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            showImage(index, thumb.src);
        }
    });
});

// Améliorer l'accessibilité de la modale
const modalImages = document.querySelectorAll(".modal-image");
modalImages.forEach((modalImage, index) => {
    modalImage.setAttribute('role', 'button');
    modalImage.setAttribute('tabindex', '0'); // Rendre les images de la modale accessibles via le clavier
    modalImage.setAttribute('aria-label', `Voir l'image ${index + 1} en grand`);

    // Ajouter un écouteur d'événements pour les touches
    modalImage.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            showImage(index, modalImage.src);
        }
    });
});

let startX; // Position de départ de la touche

// Ajouter un écouteur d'événements pour le début du geste
document.getElementById("mainImage").addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX; // Récupérer la position X de départ
});

// Ajouter un écouteur d'événements pour le mouvement
document.getElementById("mainImage").addEventListener("touchmove", (event) => {
    const moveX = event.touches[0].clientX; // Récupérer la position X actuelle
    const diffX = startX - moveX; // Calculer la différence

    // Si le geste est un glissement vers la gauche
    if (diffX > 30) {
        nextImage(); // Aller à l'image suivante
        event.preventDefault(); // Empêcher le défilement de la page
    }

    // Si le geste est un glissement vers la droite
    else if (diffX < -30) {
        prevImage(); // Aller à l'image précédente
        event.preventDefault(); // Empêcher le défilement de la page
    }
});

// Ajouter un écouteur d'événements pour la fermeture de la modale
document.querySelector(".close-1").addEventListener("click", closeModal);

// Sélectionner le footer
const footer = document.querySelector('footer');
