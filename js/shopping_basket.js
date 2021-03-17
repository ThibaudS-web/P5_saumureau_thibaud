// parser array / boucler / générer html
let getArrayTeddy = localStorage.getItem('teddies_basket')
console.log(getArrayTeddy)
let parseArrayTeddy = JSON.parse(getArrayTeddy)
console.log(parseArrayTeddy)

for(teddy of parseArrayTeddy){

    //créer la carte
    let card = document.createElement('div')             //créer un élément de balise <div>
    card.setAttribute('class', 'card card-off shadow mb-3')                   //ajouts de class
    let content = document.getElementById('content')    //Attraper la balise <div> avec l'id 'content'
    content.appendChild(card)                            //Placer la carte sous celle ci

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
    teddyNumber.innerHTML = 'Nombre sélectionné : ' + 
    cardBody.appendChild(teddyNumber)

    //prix total du produit 
    let teddyPrice = document.createElement('div')
    teddyPrice.setAttribute('class', 'h5 card-title')
    teddyPrice.innerHTML = 'Prix : ' + teddy.price/100 + '€'
    cardBody.appendChild(teddyPrice)

    //créer le button "Ajouter"
    let buttonAdd = document.createElement('button')
    buttonAdd.setAttribute('class', 'btn btn-success ml-3')
    buttonAdd.innerHTML = 'Ajouter'
    colTwo.appendChild(buttonAdd)

    //créer le button "Supprimer"
    let buttonRemove = document.createElement('button')
    buttonRemove.setAttribute('class', 'btn btn-danger ml-3')
    buttonRemove.innerHTML = 'Supprimer'
    colTwo.appendChild(buttonRemove)
    

    console.log(teddy.name)
}

console.log(parseArrayTeddy[0].image)

