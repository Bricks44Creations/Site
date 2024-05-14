// script.js
document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupère les valeurs des champs du formulaire
    const name = document.getElementById('name').value.trim();
    const comment = document.getElementById('comment').value.trim();

    // Vérifie que les champs ne sont pas vides
    if (name && comment) {
        const date = new Date().toLocaleString();

        // Crée un nouvel élément de commentaire
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');

        const nameElement = document.createElement('p');
        nameElement.classList.add('name');
        nameElement.textContent = name;

        const dateElement = document.createElement('p');
        dateElement.classList.add('date');
        dateElement.textContent = date;

        const commentTextElement = document.createElement('p');
        commentTextElement.textContent = comment;

        // Ajoute les éléments de commentaire à l'élément de commentaire
        commentElement.appendChild(nameElement);
        commentElement.appendChild(dateElement);
        commentElement.appendChild(commentTextElement);

        // Ajoute l'élément de commentaire au conteneur de commentaires
        document.getElementById('comments-container').appendChild(commentElement);

        // Réinitialise le formulaire
        document.getElementById('comment-form').reset();
    } else {
        alert('Veuillez remplir tous les champs.');
    }
});
