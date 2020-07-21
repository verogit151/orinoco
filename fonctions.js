const API_URL = "http://localhost:3000/api/"

// Récupération de l'identifiant de la caméra passé dans l'URL
function obtenirParametre (sVar) {
    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"))
}

// API Get 
function promiseGet(url) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest()
      req.open("GET", url)
      req.onload = () => resolve(req.responseText)
      req.onerror = () => reject(req.statusText)
      req.send()
    })
}

// API Post
function promisePost(url, data) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest()
      req.open("POST", url)
      req.setRequestHeader("Content-Type", "application/json")
      req.onload = () => resolve(req.responseText)
      req.onerror = () => reject(req.statusText)
      req.send(data)
    })
}

// Gestion du compteur d'articles dans le panier dans la barre de navigation  
let compteur = document.querySelector(".compteur")  
let nombrePanier = localStorage.length
if (nombrePanier > 0) {
  compteur.textContent = nombrePanier
}
else compteur.style.visibility = "hidden"

// Validation de la saisie du compte client
// Nom, prénom et ville
function validateTxt(fldTxt) {
  let regex = /^[a-zA-Z]+[\- 'a-zA-Z]+$/
  //return regex.match(fldTxt.value)
  return fldTxt.value.match(regex)
}
// Adresse
function validateAddress(fldTxt) {
  let regex = /^[0-9A-Za-z]+[\- 'a-zA-Z0-9]+$/
  return regex.test(fldTxt.value)
}
// Email
function validateEmail(fldTxt) {
  let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
  return regex.test(fldTxt.value)
}
