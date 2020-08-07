// Validation des champs du compte client

// Nom
const nameInput = document.querySelector('.form-control#name')
nameInput.addEventListener('input', () => {
    if (!validateTxt(nameInput)) nameInput.className = "form-control invalid"
    else nameInput.className = "form-control valid"
})
// Prénom
const surnameInput = document.querySelector('.form-control#surname')
surnameInput.addEventListener('input', () => {
    if (!validateTxt(surnameInput)) surnameInput.className = "form-control invalid"
    else surnameInput.className = "form-control valid"
})
// Adresse
const addressInput = document.querySelector('.form-control#address')
addressInput.addEventListener('input', () => {
    if (!validateAddress(addressInput)) addressInput.className = "form-control invalid"
    else addressInput.className = "form-control valid"
})
// Ville
const cityInput = document.querySelector('.form-control#city')
cityInput.addEventListener('input', () => {
    if (!validateTxt(cityInput)) cityInput.className = "form-control invalid"
    else cityInput.className = "form-control valid"
})
// Email
const emailInput = document.querySelector('.form-control#email')
emailInput.addEventListener('input', () => {
    if (!validateEmail(emailInput)) emailInput.className = "form-control invalid"
    else emailInput.className = "form-control valid"
})

// Passer commande : récupération des produits + compte client 
document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault()
    if ((validateTxt(nameInput) && nameInput.value.length > 0)
    && (validateTxt(surnameInput) && surnameInput.value.length > 0)
    && (validateAddress(addressInput) && addressInput.value.length > 0)
    && (validateTxt(cityInput) && cityInput.value.length > 0)
    && (validateEmail(emailInput) && emailInput.value.length > 0)) {
        let contact = {
            firstName: e.target.elements.surname.value, 
            lastName: e.target.elements.name.value, 
            address: e.target.elements.address.value, 
            city: e.target.elements.city.value,
            email: e.target.elements.email.value
        }
        
        let products = []
        for( let i = 0; i < localStorage.length; i++){
            products.push(localStorage.key(i))
        }
        // Appel API post pour récupération du numéro de commande
        localStorage.clear()
        let order = {contact, products}
        promisePost(API_URL + "cameras/order", JSON.stringify(order)).then(reponse => {
            const obj = JSON.parse(reponse)
            window.location.assign("commande.html?orderId=" + obj.orderId)
        })
        .catch( error => {
            alert('Une erreur est survenue. Veuillez réessayer ultérieurement.')
        })
    }
    else alert('Le formulaire est invalide.')
})

