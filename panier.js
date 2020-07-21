// Affichage du panier
let checkPanier = document.getElementById("checkPanier")

let tbody = document.getElementById("checkPanier__list")
tbody.innerHTML = ""
let totalPrice = 0
// Contrôle des articles
if (localStorage.length == 0) {
    // Panier vide
    let form = document.querySelector("form")
    form.innerHTML = ""
    let msgElt = document.createElement("p")
    msgElt.className = "message"
    msgElt.textContent = "Votre panier est vide"
    form.appendChild(msgElt)
    let buttonElt = document.createElement("div")
    buttonElt.className = "row button col-12"
    form.appendChild(buttonElt)
    let inputElt = document.createElement("input")
    inputElt.type = "submit"
    inputElt.id = "start"
    inputElt.value = "Commencer mes achats"
    buttonElt.appendChild(inputElt)

    //commencer mes achats
    document.querySelector("input#start").addEventListener("click", function(e) {
        e.preventDefault()
        window.location.assign("index.html")
    })
}
else {
    // Affichage de la liste des articles du panier
    for( let i = 0; i < localStorage.length; i++){
        let cameraId = localStorage.key(i)
        console.log(cameraId)
        let ficheCamera = JSON.parse(localStorage.getItem(cameraId))
        const price = ficheCamera.price/100

        let ligneElt = document.createElement("tr")
        
        let colProducts = document.createElement("td")
        let imgElt = document.createElement("img")
        imgElt.src = ficheCamera.imageUrl
        imgElt.alt = "camera vintage"
        colProducts.appendChild(imgElt)
        ligneElt.appendChild(colProducts)

        let colName = document.createElement("td")
        colName.textContent = ficheCamera.name
        ligneElt.appendChild(colName)

        let colPrice = document.createElement("td")
        colPrice.textContent = new Intl.NumberFormat().format(price) + " € "
        ligneElt.appendChild(colPrice)

        let colDelete = document.createElement("td")
        let aElt = document.createElement("a")
        aElt.href = "panier.html?del=" + cameraId
        aElt.className = "del"
        let faElt = document.createElement("span")
        faElt.className = "fa-stack"
        let trashElt = document.createElement("i")
        trashElt.className ="fas fa-trash-alt fa-stack-1x"
        faElt.appendChild(trashElt)
        aElt.appendChild(faElt)
        colDelete.appendChild(aElt)
        ligneElt.appendChild(colDelete)
        
        tbody.appendChild(ligneElt)
        totalPrice += price
    }    
    // Affichage du prix total du panier
    if (totalPrice > 0) {
        let ligneElt = document.createElement("tr")
        let colTotalLabel = document.createElement("td")
        colTotalLabel.setAttribute("colspan", "2")
        colTotalLabel.textContent = "TOTAL"
        ligneElt.appendChild(colTotalLabel)
        let colTotalPrice = document.createElement("td")
        colTotalPrice.textContent = new Intl.NumberFormat().format(totalPrice) + " € "
        ligneElt.appendChild(colTotalPrice)
        tbody.appendChild(ligneElt)
    }

    // continuer mes achats
    document.querySelector("input#continue").addEventListener("click", function(e) {
        e.preventDefault()
        window.location.assign("index.html")
    })

    // s'identifier
    document.querySelector("input#account").addEventListener("click", function(e) {
        e.preventDefault()
        window.location.assign("account.html")
    })

    // supprimer une produit
    let idProduit = obtenirParametre("del")
    if (idProduit) {
        localStorage.removeItem(idProduit)
        window.location.assign("panier.html")
    }
}