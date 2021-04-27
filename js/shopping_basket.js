//On importe la fonction ci-dessous pour mettre à jour le compteur du panier
import {updateHeaderBasket} from './shop_count.js'
updateHeaderBasket()
//On déclare la variable totalPriceOrder, on l'export pour le script de validation de formulaire.
export let totalPriceOrder 

function loadbasketContent() {

    let basketContent = document.getElementById('basket-content')
    basketContent.innerHTML = ''
    let getArrayTeddy = localStorage.getItem('teddies_basket')
    let parseArrayTeddy = JSON.parse(getArrayTeddy)

    //Une condition afin de notifier à l'user que son panier est vide
    if(getArrayTeddy == null || parseArrayTeddy.length == 0){
        let msgNoProduct = document.createElement('div')
        msgNoProduct.setAttribute('class' ,'h3 justify-content-center d-flex text-dark')
        msgNoProduct.innerHTML = "Votre panier est vide :'("
        basketContent.appendChild(msgNoProduct)
    }
    
    for(let teddy of parseArrayTeddy){

        //créer la carte
        let card = document.createElement('div')                    
        card.setAttribute('class', 'card card-off shadow mb-3')     
        basketContent.appendChild(card)                            
    
        //créer la div row
        let row = document.createElement('div')
        row.setAttribute('class', 'row g-0 d-flex align-items-center')
        card.appendChild(row)
    
        //créer la div column
        let colOne = document.createElement('div')
        colOne.setAttribute('class', 'col-md-5')
        row.appendChild(colOne)
    
        //créer la div image
        let img = document.createElement('img')
        img.setAttribute('src', `${teddy.image}`)
        img.setAttribute('class', "img-fluid")
        img.setAttribute('alt', 'image de l\'ours en peluche commandé')
        colOne.appendChild(img)
        
        //créer une autre div column appendChild à divRow
        let colTwo = document.createElement('div')
        colTwo.setAttribute('class', 'col-md-7')
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
        cardBody.appendChild(teddyNumber)
    
        //afficher le prix unitaire et le total du produit 
        let teddyPrice = document.createElement('div')
        teddyPrice.setAttribute('class', 'h5 card-title')
        let totalPrice = teddy.price * teddy.quantity
        teddyPrice.innerHTML = 'Prix unitaire : ' + teddy.price + '€ || Total : ' + totalPrice  +'€'
        cardBody.appendChild(teddyPrice)
    
        //créer le button "Supprimer"
        let buttonRemove = document.createElement('button')
        buttonRemove.setAttribute('class', ' btn btn-danger')
        buttonRemove.innerHTML = "Supprimer"
        cardBody.appendChild(buttonRemove)
        
        //Supprime le teddy sélectionné par l'user et affiche la page sans le teddy qui a été supprimé
        buttonRemove.addEventListener('click', function(){
            deleteTeddy(teddy)
            loadbasketContent()
            updateHeaderBasket()       
        })
    }
    //Attrape dans le tableau des teddies les prix et les quantités pour avoir le prix total de la commande. Le Array.reduce() va traiter chaque valeur d'une liste, ici le prix, afin de la réduire à une seule valeur. 
    totalPriceOrder = parseArrayTeddy.reduce(function(accumulator, currentValue){

        return currentValue.price * currentValue.quantity  + accumulator

    }, 0) 

    let getTotalPrice = document.getElementById('total_price')

    //Attrape dans le tableau des teddies la quantités pour avoir le prix total de la commande.
    let totalQuantityOrder = parseArrayTeddy.reduce(function(acc, currV){

        return currV.quantity + acc

    }, 0)

    getTotalPrice.innerHTML = `Pour la commande de ${totalQuantityOrder} peluches, le total de votre commande est de : ${totalPriceOrder}€`
}

loadbasketContent()

function deleteTeddy(teddy) {
    let getArrayTeddy = localStorage.getItem('teddies_basket')
    let parseLocalStorage = JSON.parse(getArrayTeddy)
    
    //On cherche l'index correspondant

    // eslint-disable-next-line no-unused-vars
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





