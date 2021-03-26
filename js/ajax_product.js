let colorTeddy = ''
fetch(`http://localhost:3000/api/teddies/`)

    .then(function(response) {
        return response.json()
    })

    .then(function(teddies) {
        
        for(teddy of teddies){
    
            if(location.search === "?id=" + teddy._id){
                console.log(teddy._id)

                let img = document.querySelector('#teddyImg')
                img.setAttribute("src", `${teddy.imageUrl}`)
                img.setAttribute("data-id", `${teddy._id}`)


                let desc = document.querySelector('#description')
                desc.innerHTML = teddy.description

                let priceTeddy = document.querySelector('#card-price')
                let teddyPriceCents = teddy.price/100
                priceTeddy.innerHTML = "Prix : " + teddyPriceCents + " €"
                console.log(teddy._id)

                let selectQuantity = document.getElementById('teddy_quantity')

                //créer une fonction de multiplication
                function updateTeddyQuantity(nbrA, nbrB) {
                    let totalPrice = nbrA*nbrB
                    priceTeddy.innerHTML = "Prix : " + totalPrice + " €" 
                    teddyObject.price = totalPrice
                }

                //créer un event permettant de selectionner le nombre de l'user pour effectuer la fonction de multiplication
                selectQuantity.addEventListener('change', function(event){
                    let selectedNumberQuantity = event.target.value
                    updateTeddyQuantity(teddyPriceCents, selectedNumberQuantity)
                    teddyObject.quantity = selectedNumberQuantity
                    console.log(selectedNumberQuantity)
                })
                                  
                const teddyObject = {
                    id: `${teddy._id}`,
                    name: `${teddy.name}`,
                    color: '',
                    price: teddyPriceCents, 
                    quantity: 1,   
                    image: `${teddy.imageUrl}`,     
                }             
                
                btnOrder.addEventListener('click', function(){addToShoppingBasket(teddyObject)})

                const selectedColor = document.querySelector('select')
               
                selectedColor.addEventListener('change', function (event){
                   colorTeddy = event.target.value
                })

                //Sélectionner les couleurs du produit pour les implémenter dans les balises <option>
                for(teddy of teddy.colors){

                    let colorTeddy = document.getElementById("selectColor")
                    let opt = document.createElement("option")
                    opt.setAttribute('value', `${teddy}`)
                    opt.setAttribute('class', 'class-color')
                    opt.setAttribute('data-color', `${teddy}`)
                    colorTeddy.appendChild(opt)
                    opt.innerHTML += teddy

                }

            } else {
                console.log();
            }
        }   
    })

//Ajouter le produit dans le localStorage
function addToShoppingBasket(teddy){

    teddy.color = colorTeddy

    if(localStorage.getItem('teddies_basket') == null && selectOption.selected === false){

        let teddies_basket = []
        teddies_basket.push(teddy)
        let teddies_basketString = JSON.stringify(teddies_basket)
        localStorage.setItem('teddies_basket', `${teddies_basketString}`)

    } else if(localStorage.getItem('teddies_basket') != null && selectOption.selected === false) {
        
        
        let getTeddyArray = localStorage.getItem('teddies_basket')
        let parseArray = JSON.parse(getTeddyArray)
        let teddyIndex = null
        let teddyFound = null

        parseArray.forEach((elementTeddy, index, array) => {
            
            
            let teddyID = elementTeddy.id
            let teddyColor = elementTeddy.color
            console.log(teddyID, teddyColor)
            
            if(teddyID === teddy.id && teddyColor === teddy.color){
                console.log("réussi")

                teddyFound = elementTeddy
                teddyIndex = index
            }
        })


        let quantityOption = document.querySelectorAll('#teddy_quantity > option')
        console.log(quantityOption)

        if(teddyFound != null){

            // j'ajoute ici la quantité sélectionnée

            let newTeddyQuantity = parseInt(teddyFound.quantity) + parseInt(teddy.quantity)
            let newTeddyPrice = teddy.price + teddyFound.price
                   
            console.log(newTeddyQuantity)
            console.log(newTeddyPrice)
            teddy.quantity = parseInt(newTeddyQuantity)
            teddy.price = newTeddyPrice
            parseArray.splice(teddyIndex, 1, teddy)
                    
            let teddyString = JSON.stringify(parseArray) 
            localStorage.setItem('teddies_basket', `${teddyString}`) 
            
        } else {

            parseArray.push(teddy)
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

let btnOrder = document.getElementById('btn_order')

btnOrder.addEventListener('click', function msgAddShopBasket() {

    function addProduct() {
        let shoppingBasket = document.getElementById('count')
        shoppingBasket.innerHTML ++
    }

    if(selectOption.selected === true) {
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



// let teddyFound = null

// parseArray.forEach((elementTeddy, index, array) => {
    
//     let teddyID = elementTeddy.id
//     let teddyColor = elementTeddy.color
//     console.log(teddyID, teddyColor)
    
//     if(teddyID === teddy.id && teddyColor === teddy.color){
//         console.log("réussi")
        
//         teddyFound = elementTeddy      
//     }
// });
// let selectOption = document.querySelector('#teddy_quantity')
// let quantityOption = document.querySelectorAll('#teddy_quantity > option')
// console.log(quantityOption)

// if(teddyFound != null){

//     j'ajoute ici la quantité sélectionnée
//     let teddyString = JSON.stringify(parseArray) 
//     localStorage.setItem('teddies_basket', `${teddyString}`) 
    
// } else {

    // parseArray.push(teddy)
    // let teddyString = JSON.stringify(parseArray) 
    // localStorage.setItem('teddies_basket', `${teddyString}`) 

// }    