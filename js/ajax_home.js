//On importe la fonction ci-dessous pour mettre à jour le compteur du panier
import { updateHeaderBasket } from './shop_count.js'
updateHeaderBasket()
fetch(`http://localhost:3000/api/teddies`) //accueil boucle teddies
    .then(function (response) {
        return response.json()
    })

    .then(function (teddies) {

        for (let teddy of teddies) {
            loadHomeContent(teddy)
        }

    })

function loadHomeContent(teddy) {
//Créer la div parent
    let divParent = document.createElement('div')
    divParent.setAttribute('class', 'col-12 col-md-12 col-lg-12 mb-5')

//Créer la div enfant
    let divChild = document.createElement('div')
    divParent.appendChild(divChild).setAttribute('class', 'card shadow-lg border-secondary')

//Créer la balise <img> dans la div enfant
    let imgCard = document.createElement('img')
    divChild.appendChild(imgCard).setAttribute('class', 'card-img-top')
    imgCard.setAttribute('src', `${teddy.imageUrl}`)
    imgCard.setAttribute('alt', "image d'un ours en peluche")

//Créer la balise <a> dans la div enfant
    let linkCard = document.createElement('a')
    divChild.appendChild(linkCard).setAttribute('class', 'stretched-link btn btn-secondary')
    linkCard.setAttribute('href', `product.html?id=${teddy._id}`)
    linkCard.setAttribute('data-identification', `${teddy._id}`)
    linkCard.innerHTML = "Commander"

    document.querySelector('#cont').appendChild(divParent)
}














