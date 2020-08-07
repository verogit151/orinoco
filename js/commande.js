// Récupération du numéro de commande
let orderNum = obtenirParametre("orderId");

// Affichage du numéro de commande
let commande = document.getElementById("numOrder");
commande.textContent = orderNum; 

// Retour à la page d'accueil
let form = document.querySelector("form");
form.addEventListener("submit", function(e) {
    e.preventDefault(); 
    localStorage.clear();
    window.location.assign("index.html");
});