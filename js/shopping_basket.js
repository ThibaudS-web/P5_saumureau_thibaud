//On déclare la variable totalPriceOrder, on s'en sert dans le script de validatioon de formulaire. 
let totalPriceOrder 

function loadBasketbasketContent() {

    let basketContent = document.getElementById('basket-content')
    basketContent.innerHTML = ''
    let getArrayTeddy = localStorage.getItem('teddies_basket')
    let parseArrayTeddy = JSON.parse(getArrayTeddy)

    //créer une condition afin de notifier à l'user que son panier est vide
    if(getArrayTeddy == null || parseArrayTeddy.length == 0){

        let msgNoProduct = document.createElement('div')
        msgNoProduct.setAttribute('class' ,'h3 justify-basketContent-center d-flex text-dark')
        msgNoProduct.innerHTML = "Votre panier est vide :'("
        basketContent.appendChild(msgNoProduct)
    }
    
    for(teddy of parseArrayTeddy){

        //créer la carte
        let card = document.createElement('div')                    //créer un élément de balise <div>
        card.setAttribute('class', 'card card-off shadow mb-3')     //ajouts de class   
       basketContent.appendChild(card)                            
    
        //créer la div row
        let row = document.createElement('div')
        row.setAttribute('class', 'row')
        card.appendChild(row)
    
        //créer la div column
        let colOne = document.createElement('div')
        colOne.setAttribute('class', 'col-md-4')
        row.appendChild(colOne)
    
        //créer la div image
        let img = document.createElement('img')
        img.setAttribute('src', `${teddy.image}`)
        img.setAttribute('alt', 'image de l\'ours en peluche commandé')
        colOne.appendChild(img)
        
        //créer une autre div column appendChild à divRow
        let colTwo = document.createElement('div')
        colTwo.setAttribute('class', 'col-md-8')
        row.appendChild(colTwo)
    
        //créer le corps de la carte 
        let cardBody = document.createElement('div')
        cardBody.setAttribute('class', 'card-body')
        colTwo.appendChild(cardBody)
    
        //créer les caractéristiques du produit commandé
        //nom du produit
        let teddyName = document.createElement('div')
        teddyName.setAttribute('class', 'h5 card-title')
        teddyName.innerHTML = 'Nom du produit : ' + teddy.name
        cardBody.appendChild(teddyName)
    
        //couleur du produit
        let teddyColor = document.createElement('div')
        teddyColor.setAttribute('class', 'h5 card-title')
        teddyColor.innerHTML = 'Couleur sélectionnée : ' + teddy.color
        cardBody.appendChild(teddyColor)
    
        //nombre selectionné du produit
        let teddyNumber = document.createElement('div')
        teddyNumber.setAttribute('class', 'h5 card-title')
        teddyNumber.innerHTML = 'Nombre sélectionné : '
        let orderNumber = document.createElement('strong')
        orderNumber.setAttribute('id', 'countOrder')
        teddyNumber.appendChild(orderNumber)
        orderNumber.innerHTML = teddy.quantity
        console.log(teddy.quantity)
        cardBody.appendChild(teddyNumber)
    
        //prix unitaire et total du produit 
        let teddyPrice = document.createElement('div')
        teddyPrice.setAttribute('class', 'h5 card-title')
        teddyPrice.innerHTML = 'Prix unitaire : ' + teddy.price/teddy.quantity + '€ || Total : ' + teddy.price  +'€'
        cardBody.appendChild(teddyPrice)
    
        //créer le button "Supprimer"
        let buttonRemove = document.createElement('button')
        buttonRemove.setAttribute('class', 'btn btn-danger ml-3')
        buttonRemove.innerHTML = 'Supprimer'
        colTwo.appendChild(buttonRemove)
    
        buttonRemove.addEventListener('click', function(){
            deleteTeddy(teddy)
            loadBasketbasketContent()
            
        })
    }
   
    totalPriceOrder = parseArrayTeddy.reduce(function(accumulator, currentValue){

        return currentValue.price + accumulator

    }, 0) 

    let getTotalPrice = document.getElementById('total_price')

    let totalQuantityOrder = parseArrayTeddy.reduce(function(acc, currV){

        return parseInt(currV.quantity) + parseInt(acc)

    }, 0)

    getTotalPrice.innerHTML = `Pour la commande de ${totalQuantityOrder} peluches, le total de votre commande est de : ${totalPriceOrder}€`
    
    updateHeaderBasket()
}


loadBasketbasketContent()

function deleteTeddy(teddy) {
    let getArrayTeddy = localStorage.getItem('teddies_basket')
    let parseLocalStorage = JSON.parse(getArrayTeddy)
    console.log(parseLocalStorage)
    
    //On cherche l'index correspondant

    let deleteTeddyIndex = parseLocalStorage.findIndex(function(currentTeddy, index, arr){

        //findIndex, cherche l'élément correpondant à la condition ci-dessous 
        //si condition est true : il renvoie l'indice du premier élément du tableau 
        //si condition est false : il continue de parcourir le tableau 
        return currentTeddy._id === teddy._id && currentTeddy.color === teddy.color

    }) 
    //si findIndex renvoit false pour tout les éléments du tableau parcouru, la valeur afficher est "-1"

    if(deleteTeddyIndex != -1){ 
        
        parseLocalStorage.splice(deleteTeddyIndex, 1)
        let stringLocalStorage = JSON.stringify(parseLocalStorage)
        localStorage.setItem('teddies_basket', `${stringLocalStorage}`) 
    }
}





