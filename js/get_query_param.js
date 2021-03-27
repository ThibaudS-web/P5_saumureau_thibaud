//Stocker la donnée suivante, l'orderID, dans une variable
let params = new URLSearchParams(document.location.search.substring(1))
let orderID = params.get("orderID")
let priceOrder = params.get("priceOrder")

//afficher le prix total de la commande dans la div
let innerTextPriceOrder = document.querySelector('h1')
innerTextPriceOrder.innerHTML = `Votre commande de ${priceOrder}€ a bien été prise en compte !`

//afficher numéro de commande dans la div
let innerTextOrderID = document.getElementById('order-id')
innerTextOrderID.innerHTML = `Veuillez conserver votre numéro de commande : ${orderID}`