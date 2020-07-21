// Récuperer l'identifiant de la caméra à afficher
let cameraId = obtenirParametre("id")
console.log(cameraId)

// Afficher les informations détaillées de la caméra
let camera__image = document.getElementById("camera__image")
let camera__info = document.getElementById("camera__info")
promiseGet("http://localhost:3000/api/cameras/" + cameraId).then(reponse => {
    ficheCamera = JSON.parse(reponse)
    camera__image.innerHTML = ""
    if (ficheCamera) {
        let nameElt = document.createElement("h1")
        nameElt.textContent = ficheCamera.name
        let imgElt = document.createElement("img")
        imgElt.src = ficheCamera.imageUrl
        imgElt.alt = "camera vintage"
        let priceElt = document.createElement("p")
        priceElt.className = "price"
        priceElt.textContent = new Intl.NumberFormat().format(ficheCamera.price/100) + " € "
        let descriptionElt = document.createElement("p")
        descriptionElt.textContent = ficheCamera.description
        let lensesElt = document.querySelector("select")
        for (let i = 0; i < ficheCamera.lenses.length; i++) { 
            let lensesOpt=new Option(ficheCamera.lenses[i], ficheCamera.lenses[i])
            lensesElt.appendChild(lensesOpt)
        };

        camera__image.appendChild(imgElt)
        camera__info.appendChild(nameElt)
        camera__info.appendChild(descriptionElt)
        camera__info.appendChild(priceElt)
    } else {
        let msgElt = document.createElement("p")
        msgElt.textContent = "Aucune camera disponible"
    }
})

// Ajouter au panier
let form = document.querySelector("form")
form.addEventListener("submit", function(e) {
    e.preventDefault()
    //Choix de la lentille obligatoire
    const lensesSelect = document.querySelector('select[name="lenses"]')
    if(lensesSelect.value === '') alert("Vous devez choisir une lentille")
    else {
        localStorage.setItem(cameraId,JSON.stringify(ficheCamera))
        window.location.assign("panier.html")
    }   
})
