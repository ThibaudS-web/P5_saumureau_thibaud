let ElementsNumber = localStorage.getItem('teddies_basket')
let parseElementNumber = JSON.parse(ElementsNumber)

for(element of parseElementNumber){

        let shoppingBasket = document.getElementById('count')
        shoppingBasket.innerHTML ++

}