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

                let desc = document.querySelector('#description')
                desc.innerHTML = teddy.description

                let priceTeddy = document.querySelector('#card-price')
                let convertPriceTeddy = teddy.price/100
                priceTeddy.innerHTML = "Prix : " + convertPriceTeddy + " €"
                console.log(teddy._id)

                const teddyObject = {
                    name:`${teddy.name}`,
                    color:'',
                    price:`${teddy.price}`, 
                    image:`${teddy.imageUrl}`        
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
                    colorTeddy.appendChild(opt).setAttribute('value', `${teddy}`)
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

    if(localStorage.getItem('teddies_basket') == null){

        let teddies_basket = []
        teddies_basket.push(teddy)
        let teddies_basketString = JSON.stringify(teddies_basket)
        localStorage.setItem('teddies_basket', `${teddies_basketString}`)

    } else if(localStorage.getItem('teddies_basket') != null) {
        
        let getTeddyArray = localStorage.getItem('teddies_basket')
        let parseArray = JSON.parse(getTeddyArray)
        parseArray.push(teddy)
        let teddyString = JSON.stringify(parseArray) 
        localStorage.setItem('teddies_basket', `${teddyString}`)                     
        
    } else {
        console.log("ERROR")
    }                  
}

let alertMsg = document.querySelector('.alert')
alertMsg.setAttribute('class', 'd-none')


let btnOrder = document.getElementById('btn_order')

btnOrder.addEventListener('click', function msgAddShopBasket() {

    let selectOption = document.querySelector('option')

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

    


// A VOIR : localStorage  // timestamp // universaly unique Id
//substring + indexOf
//boucle for if id en cours = id que j'ai récupéré 
