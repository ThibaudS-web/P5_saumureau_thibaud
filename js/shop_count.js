function updateHeaderBasket() {

        let shoppingBasket = document.getElementById('count')
        let ElementsNumber = localStorage.getItem('teddies_basket')
        let parseElementNumber = JSON.parse(ElementsNumber)
        shoppingBasket.innerHTML = parseElementNumber.length
        
}

updateHeaderBasket()