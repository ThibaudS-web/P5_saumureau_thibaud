//On créé un objet currentTeddy qui sera le l'objet user. On rajoute la quantité sélectionnée par l'user.
const currentTeddy = {
    id: null,
    name: null,
    color: null,
    price: null,
    quantity: null,
    image: null,
    description: null
}

fetch(`http://localhost:3000/api/teddies`)

    .then(function (response) {
        return response.json()
    })

    .then(function (teddies) {

        for (let teddy of teddies) {
            if (location.search === "?id=" + teddy._id) {
                updateTeddyInfo(teddy)
                
            }
        }
    })
//cette fonction appelle les fonctions d'affichage initiale.
function updateTeddyInfo(teddy) {
    //On injecte les données du teddy API dans le currentTeddy.
    currentTeddy.id = teddy._id
    currentTeddy.name = teddy.name
    currentTeddy.image = teddy.imageUrl
    currentTeddy.description = teddy.description
    currentTeddy.price = teddy.price/100
    currentTeddy.quantity = 1
   
    displayImageTeddy(currentTeddy)
    displayDescriptionTeddy(currentTeddy.description)
    displayPriceTeddy(currentTeddy)
    displayColorsTeddy(teddy)  
}

/////////////
//FUNCTIONS//   
/////////////

//Afficher l'image du teddy.
function displayImageTeddy(teddy) {
    let img = document.querySelector('#teddyImg')
    img.setAttribute("src", `${teddy.image}`)
    img.setAttribute("data-id", `${teddy._id}`)
}

//Afficher la description du teddy.
function displayDescriptionTeddy(teddyDescription) {
    let desc = document.querySelector('#description')
    desc.innerHTML = teddyDescription
}

//Création du tableau de quantité de teddy, quantité 1 par défaut.
let quantitiesTeddyArray = [2, 3, 4, 5, 6, 7, 8, 9, 10]
let select = document.getElementById('teddy_quantity')  
for (let number of quantitiesTeddyArray) {
    let option = document.createElement('option')
    option.setAttribute('value', `${number}`)
    option.innerHTML = number
    select.appendChild(option)
}

//Afficher le prix du teddy
function displayPriceTeddy(teddy) {
    let priceTeddy = document.querySelector('#card-price')
    let teddyPriceCents = teddy.price
    priceTeddy.innerHTML = "Prix : " + teddyPriceCents + " €"
}

//Modifier le prix du teddy quand l'user sélectionne une quantité.  
function updateDisplayTeddy(quantity) {
    let priceTeddy = document.querySelector('#card-price')
    let teddyPriceCents = currentTeddy.price
    let totalPrice = teddyPriceCents * quantity
    priceTeddy.innerHTML = "Prix : " + totalPrice + " €"
    currentTeddy.quantity = quantity
}

//Sélectionner les couleurs du produit pour les implémenter dans les balises <option>.
function displayColorsTeddy(teddy) {
    for (let color of teddy.colors) {
        let colorTeddy = document.getElementById("selectColor")
        let opt = document.createElement("option")
        opt.setAttribute('value', `${color}`)
        colorTeddy.appendChild(opt)
        opt.innerHTML += color
    }
}

let selectOption = document.querySelector('option')
//Ajouter le produit dans le localStorage, pour l'utiliser dans le panier. 
function addToShoppingBasket() {

    //Si l'item "teddies_basket" n'existe pas et que l'user a sélectionné une couleur. On créé un nouveau tableau "teddies_basket", on y ajoute le currentTeddy modifié par l'user, on stringify le tableau pour l'envoyer au localStorage
    if (localStorage.getItem('teddies_basket') == null && selectOption.selected === false) {
        let teddies_basket = [] 
        teddies_basket.push(currentTeddy)
        let teddies_basketString = JSON.stringify(teddies_basket)
        localStorage.setItem('teddies_basket', `${teddies_basketString}`)

    //Sinon si "teddies_basket" existe et que l'user a sélectionné une couleur. On attrape l'item du localStorage, on le parse pour obtenir le tableau "teddies_basket".
    } else if (localStorage.getItem('teddies_basket') != null && selectOption.selected === false) {

        let getTeddyArray = localStorage.getItem('teddies_basket')
        let parseArray = JSON.parse(getTeddyArray)
        let teddyIndex = null
        let teddyFound = null
        //On parcours le tableau pour chaque élément à l'intérieur de celui-ci. On attrape les données ID et Color. 
        // eslint-disable-next-line no-unused-vars
        parseArray.forEach((elementTeddy, index, array) => {

            let teddyID = elementTeddy.id
            let teddyColor = elementTeddy.color
            //Si l'ID et la couleur du teddy user correspond au teddy dans le tableau alors on assigne les valeurs suivantes.
            if (teddyID === currentTeddy.id && teddyColor === currentTeddy.color) {
                teddyFound = elementTeddy
                teddyIndex = index
            }
        })
        //Si un teddy dans le panier correspond avec un nouvel objet currentTeddy. On créé une variable pour la nouvelle quantité. On supprime du tableau l'ancien teddy qui sera remplacé par le nouveau avec la mise à jour de sa quantité avec la fonction splice().
        //On converti le tableau en string puis on l'envoi dans le localStorage.
        if (teddyFound != null) {

            let newTeddyQuantity = currentTeddy.quantity + teddyFound.quantity 
            teddyFound.quantity = newTeddyQuantity
            parseArray.splice(teddyIndex, 1, teddyFound)
            let teddyString = JSON.stringify(parseArray)
            localStorage.setItem('teddies_basket', `${teddyString}`)
        //Sinon on ajoute le currentTeddy au tableau, on converti le tableau puis on l'envoi dans le localStorage. 
        } else {

            parseArray.push(currentTeddy)
            let teddyString = JSON.stringify(parseArray)
            localStorage.setItem('teddies_basket', `${teddyString}`)

        }

    } else {

        console.log("ERROR")

    }
}

let alertMsg = document.querySelector('.alert')
// alertMsg.setAttribute('class', 'd-none')
//Cette fonction permet d'afficher 
function msgAddShopBasket() {

    //Si la balise option avec l'attribut "selected" est sélectionnée quand l'user commande son article. 
    if (selectOption.selected === true) {
        //Changer la couleur de l'input si l'user ne choisit pas la couleur du produit + alerte indiquant à l'user qu'il doit choisir une couleur.
        alertMsg.classList.add('alert-danger')
        let removeColor = document.querySelector('#selectColor')
        removeColor.classList.remove('border-primary')
        removeColor.classList.add('border-danger')
        alertMsg.classList.remove('d-none')
        alertMsg.innerHTML = "Veuillez sélectionner une couleur"
        
    //Sinon l'input prend la couleur de validation et un message de confirmation est envoyé à l'user.
    } else {
        let removeColor = document.querySelector('#selectColor')
        removeColor.classList.add('border-success')
        removeColor.classList.remove('border-danger')
        alertMsg.classList.remove('d-none')
        alertMsg.classList.remove('alert-danger')
        alertMsg.classList.add('alert-success')
        alertMsg.innerHTML = "Un nouvel article a été rajouté à votre panier !"
    }
}

/////////////////////
//ADDEVENTLISTENERS//
/////////////////////

//Ecouter l'évenement quand l'user sélectionne une quantité sur le HTML.
let selectQuantity = document.getElementById('teddy_quantity')
selectQuantity.addEventListener('change', function(quantity) {
    updateDisplayTeddy(parseInt(quantity.target.value))
})

//Ecouter l'évenement quand l'user click sur le boutton "Ajouter au panier".
let btnOrder = document.getElementById('btn_order')
btnOrder.addEventListener('click', function (){
    addToShoppingBasket(currentTeddy), 
    msgAddShopBasket(),
    updateHeaderBasket()})

//Ecouter l'évenement quand l'user sélectionne une couleur sur le HTML.
let selectedColor = document.querySelector('select')
selectedColor.addEventListener('change', function (event) {
    currentTeddy.color = event.target.value
})

//On importe la fonction ci-dessous pour mettre à jour le compteur du panier
import {updateHeaderBasket} from './shop_count.js'
updateHeaderBasket()

