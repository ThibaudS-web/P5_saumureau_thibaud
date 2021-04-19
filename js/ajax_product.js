const currentTeddy = {
    id: null,
    name: null,
    color: null,
    price: null,
    quantity: null,
    image: null,
    description: null
}
//http://localhost:3000/api/teddies
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

function updateTeddyInfo(teddy) {
    currentTeddy.id = teddy._id
    currentTeddy.name = teddy.name
    currentTeddy.image = teddy.imageUrl
    currentTeddy.description = teddy.description
    currentTeddy.price = teddy.price/100
    currentTeddy.quantity = 1
   
    displayImageTeddy(currentTeddy)

    displayDescriptionTeddy(currentTeddy.description)
   
    displayPriceTeddy(currentTeddy)
    //Sélectionner les couleurs du produit pour les implémenter dans les balises <option>
    displayColorsTeddy(teddy)  
}

/////////////////////
//ADDEVENTLISTENERS//
/////////////////////

//créer un event permettant de selectionner le nombre de l'user pour effectuer la fonction de multiplication
let selectQuantity = document.getElementById('teddy_quantity')
selectQuantity.addEventListener('change', function(quantity) {
    updateDisplayTeddy(parseInt(quantity.target.value))
    console.log(quantity.target.value)
})

let btnOrder = document.getElementById('btn_order')
btnOrder.addEventListener('click', function () {addToShoppingBasket(currentTeddy)})

const selectedColor = document.querySelector('select')
selectedColor.addEventListener('change', function (event) {
    currentTeddy.color = event.target.value
})

/////////////
//FUNCTIONS//   
/////////////

//Afficher l'image du teddy
function displayImageTeddy(teddy) {
    let img = document.querySelector('#teddyImg')
    img.setAttribute("src", `${teddy.image}`)
    img.setAttribute("data-id", `${teddy._id}`)
}

function displayDescriptionTeddy(teddyDescription) {
    let desc = document.querySelector('#description')
    desc.innerHTML = teddyDescription
}

let quantitiesTeddyArray = [2, 3, 4, 5, 6, 7, 8, 9, 10]
let select = document.getElementById('teddy_quantity')  
for (let number of quantitiesTeddyArray) {
    let option = document.createElement('option')
    option.setAttribute('value', `${number}`)
    option.innerHTML = number
    select.appendChild(option)
}

function displayPriceTeddy(teddy) {
    let priceTeddy = document.querySelector('#card-price')
    let teddyPriceCents = teddy.price
    console.log(teddyPriceCents)
    priceTeddy.innerHTML = "Prix : " + teddyPriceCents + " €"
}

function updateDisplayTeddy(quantity) {
    let priceTeddy = document.querySelector('#card-price')
    let teddyPriceCents = currentTeddy.price
    let totalPrice = teddyPriceCents * quantity
    priceTeddy.innerHTML = "Prix : " + totalPrice + " €"
    currentTeddy.quantity = quantity
}

function displayColorsTeddy(teddy) {
    for (let color of teddy.colors) {
        let colorTeddy = document.getElementById("selectColor")
        let opt = document.createElement("option")
        opt.setAttribute('value', `${color}`)
        opt.setAttribute('class', 'class-color')
        opt.setAttribute('data-color', `${color}`)
        colorTeddy.appendChild(opt)
        opt.innerHTML += color
    }
}

//Ajouter le produit dans le localStorage
function addToShoppingBasket() {


    if (localStorage.getItem('teddies_basket') == null && selectOption.selected === false) {
        let teddies_basket = [] 
        teddies_basket.push(currentTeddy)
        let teddies_basketString = JSON.stringify(teddies_basket)
        localStorage.setItem('teddies_basket', `${teddies_basketString}`)

    } else if (localStorage.getItem('teddies_basket') != null && selectOption.selected === false) {

        let getTeddyArray = localStorage.getItem('teddies_basket')
        let parseArray = JSON.parse(getTeddyArray)
        let teddyIndex = null
        let teddyFound = null

        parseArray.forEach((elementTeddy, index, array) => {

            let teddyID = elementTeddy.id
            let teddyColor = elementTeddy.color

            if (teddyID === currentTeddy.id && teddyColor === currentTeddy.color) {
                console.log("réussi")

                teddyFound = elementTeddy
                teddyIndex = index
            }
        })

        if (teddyFound != null) {

            let newTeddyQuantity = currentTeddy.quantity + teddyFound.quantity 
            // let newTeddyPrice = currentTeddy.price + teddyFound.price

            console.log("===", newTeddyQuantity)
            // console.log(newTeddyPrice)
            teddyFound.quantity = newTeddyQuantity
            // teddyFound.price = newTeddyPrice
            parseArray.splice(teddyIndex, 1, teddyFound)

            let teddyString = JSON.stringify(parseArray)
            localStorage.setItem('teddies_basket', `${teddyString}`)

        } else {

            parseArray.push(currentTeddy)
            let teddyString = JSON.stringify(parseArray)
            localStorage.setItem('teddies_basket', `${teddyString}`)

        }

    } else {

        console.log("ERROR")

    }
}

let selectOption = document.querySelector('option')

let alertMsg = document.querySelector('.alert')
alertMsg.setAttribute('class', 'd-none')

btnOrder.addEventListener('click', function msgAddShopBasket() {

    function addProduct() {
        let shoppingBasket = document.getElementById('count')
        shoppingBasket.innerHTML++
    }

    if (selectOption.selected === true) {
        //Changer la couleur de l'input si l'user ne choisit pas la couleur du produit + alert d'avertissement
        alertMsg.classList.remove('d-none')
        alertMsg.classList.add('alert-danger')
        let removeColor = document.querySelector('#selectColor')
        removeColor.classList.remove('border-primary')
        removeColor.classList.add('border-danger')

    } else {
        let removeColor = document.querySelector('#selectColor')
        removeColor.classList.add('border-success')
        removeColor.classList.remove('border-danger')
        alertMsg.classList.remove('d-none')
        alertMsg.classList.remove('alert-danger')
        alertMsg.classList.add('alert-success')
        alertMsg.innerHTML = "Un nouvel article a été rajouté à votre panier !"
        addProduct()
    }
})