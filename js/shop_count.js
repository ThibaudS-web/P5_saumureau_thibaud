export function updateHeaderBasket() {
        
        let shoppingBasket = document.getElementById('count')
        let getTeddies = localStorage.getItem("teddies_basket")
        let arrayGetTeddies =  JSON.parse(getTeddies)

        let totalCount = arrayGetTeddies.reduce(function(accumulator, currentValue){

                return currentValue.quantity + accumulator
        }, 0)

        shoppingBasket.innerHTML =  totalCount 
}

