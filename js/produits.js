let produit = document.getElementsByClassName("produits")[0]
// Accès à la page produit

promiseGet("http://localhost:3000/api/cameras/")
.then(reponse => {
    let cameras = JSON.parse(reponse)
    produit.innerHTML = ""
    if (cameras.length > 0) {
        cameras.forEach(function (camera) {
            let colElt = document.createElement("div")
            colElt.className = "col-12 col-md-4 mt-4"  
            let idElt = document.createElement("a")
            idElt.href ="camera.html?id=" + camera._id
            let cardElt = document.createElement("div")
            cardElt.className = "card shadow"
            let imgElt = document.createElement("img")
            imgElt.src = camera.imageUrl
            imgElt.className = "card-img-top card__image"
            imgElt.alt = "Caméra vintage"
            let bodyElt = document.createElement("div")
            bodyElt.className = "card-body"
            let nameElt = document.createElement("h2")
            nameElt.className = "card-title"
            nameElt.textContent = camera.name
            let priceElt = document.createElement("div")
            priceElt.className = "card-price"
            priceElt.textContent = new Intl.NumberFormat().format(camera.price/100) + " € "

            produit.appendChild(colElt)
            colElt.appendChild(idElt)
            idElt.appendChild(cardElt)
            cardElt.appendChild(imgElt)
            cardElt.appendChild(bodyElt)
            bodyElt.appendChild(nameElt)
            bodyElt.appendChild(priceElt)
        })
    } else {
        let msgElt = document.createElement("p")
        msgElt.className = "error"
        msgElt.textContent = "Aucun produit disponible"
        produit.appendChild(msgElt)
    }
})
.catch( error => {
    let msgElt = document.createElement("p")
    msgElt.className = "error"
    msgElt.textContent = "Une erreur est survenue. Veuillez réessayer ultérieurement."
    produit.appendChild(msgElt)
})