let form = document.querySelector('#orderForm')
//============================================================================ Prénom

//On écoute sur le changement d'état de l'input
form.firstName.addEventListener('change', function(){
    validFirstName(this)
})

//On crée une fonction pour la validation du prénom
function validFirstName(inputFirstName){
    //Création de l'expression régulière pour validation email
    let firstNameRegExp = new RegExp('^[A-Z][A-Za-z\é\è\ê\ç\\s\-]+$', 'g')

    //récupération de la balise <small> 
    let smallFirstName = inputFirstName.nextElementSibling
    
    //On test l'expression régulière
    let testFirstName = firstNameRegExp.test(inputFirstName.value)
    if(testFirstName){
        smallFirstName.innerHTML= "Prénom valide !"
        smallFirstName.classList.remove("text-danger")
        smallFirstName.setAttribute('class', 'text-success')
        return true
    } else {
        smallFirstName.innerHTML= "Prénom non valide : commencez votre prénom par une majuscule ! "
        smallFirstName.classList.remove("text-succes")
        smallFirstName.setAttribute('class', 'text-danger')
        return false
    }
}

//============================================================================ NOM
//On écoute sur le changement d'état de l'input
form.lastName.addEventListener('change', function(){
    validlastName(this)
})

//On crée une fonction pour la validation du nom
function validlastName(inputLastName){
    //Création de l'expression régulière pour validation email
    let lastNameRegExp = new RegExp('^[A-Z\é\è\ê\ç\\s\-]+$', 'g')

    //récupération de la balise <small> 
    let smallLastName = inputLastName.nextElementSibling
    
    //On test l'expression régulière
    let testLastName = lastNameRegExp.test(inputLastName.value)
    if(testLastName){
        smallLastName.innerHTML= "Nom valide !"
        smallLastName.classList.remove("text-danger")
        smallLastName.setAttribute('class', 'text-success')
        return true
    } else {
        smallLastName.innerHTML= "Nom non valide : veuillez saisir votre nom en majuscule ! "
        smallLastName.classList.remove("text-succes")
        smallLastName.setAttribute('class', 'text-danger')
        return false
    }
}

//============================================================================ Adresse DE LIVRAISON

//On écoute sur le changement d'état de l'input
form.address.addEventListener('change', function(){
    validAddress(this)
})

//On crée une fonction pour la validation de l'email
function validAddress(inputAdress){
    //Création de l'expression régulière pour validation email
    let adressRegExp = new RegExp('^[0-9]+[A-Za-z\é\è\ê\,\ç\\s\-]+$', 'g')
    //récupération de la balise <small> 
    let smallAdress = inputAdress.nextElementSibling
    
    //On test l'expression régulière
    let testAdress = adressRegExp.test(inputAdress.value)
    if(testAdress){
        smallAdress.innerHTML= "Adress valide !"
        smallAdress.classList.remove("text-danger")
        smallAdress.setAttribute('class', 'text-success')
        return true
    } else {
        smallAdress.innerHTML= "Adress non valide ! "
        smallAdress.classList.remove("text-succes")
        smallAdress.setAttribute('class', 'text-danger')
        return false
    }
}
//============================================================================ VILLE

//On écoute sur le changement d'état de l'input
form.city.addEventListener('change', function(){
    validCity(this)
})

//On crée une fonction pour la validation de l'email
function validCity(inputCity){
    //Création de l'expression régulière pour validation email
    let cityRegExp = new RegExp('^[A-Za-z\é\è\ê\'\ç\\s\-]+$', 'g')
    //récupération de la balise <small> 
    let smallCity = inputCity.nextElementSibling
    
    //On test l'expression régulière
    let testCity = cityRegExp.test(inputCity.value)
    if(testCity){
        smallCity.innerHTML= "Ville valide !"
        smallCity.classList.remove("text-danger")
        smallCity.setAttribute('class', 'text-success')
        return true
    } else {
        smallCity.innerHTML= "Ville non valide ! "
        smallCity.classList.remove("text-succes")
        smallCity.setAttribute('class', 'text-danger')
        return false
    }
}
//============================================================================ EMAIL

//On écoute sur le changement d'état de l'input

form.email.addEventListener('change', function(event){
    validEmail(this)
})

//On crée une fonction pour la validation de l'email
function validEmail(inputEmail){
    //Création de l'expression régulière pour validation email
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g')

    //récupération de la balise <small> 
    let smallEmail = inputEmail.nextElementSibling
    
    //On test l'expression régulière
    let testEmail = emailRegExp.test(inputEmail.value)
    if(testEmail){
        smallEmail.innerHTML= "Adress-mail valide !"
        smallEmail.classList.remove("text-danger")
        smallEmail.setAttribute('class', 'text-success')
        return true
    } else {
        smallEmail.innerHTML= "Adress-mail non valide ! "
        smallEmail.classList.remove("text-succes")
        smallEmail.setAttribute('class', 'text-danger')
        return false
    }
}



//On crée un objet contact sur l'event click pour la validation de commande 

//============================================================================ SOUMISSION DU FORMULAIRE

form.addEventListener('submit', function(event){

    event.preventDefault()
    
    if(validFirstName(form.firstName) && 
        validlastName(form.lastName) && 
        validAddress(form.address) && 
        validEmail(form.email) && 
        validCity(form.city)){

            let contactValue = {
                firstName : form.firstName.value,
                lastName : form.lastName.value,
                address: form.address.value,
                city: form.city.value, 
                email: form.email.value
            }
          
            let getLocalTeddies = localStorage.getItem('teddies_basket')
            let arrayTeddies = JSON.parse(getLocalTeddies)
            let productsValue = arrayTeddies.map(teddy => teddy.id )
            
            let postBody = {
                contact: contactValue,
                products: productsValue
            }

        fetch('http://localhost:3000/api/teddies/order',{
            method: "POST", 
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(postBody)

        })
        
        .then(function(response){
            return response.json()
        })

        .then(function(body){
            //créer le query parameter et envoyer le orderID dans l'url
            let orderIDParam = new URLSearchParams(window.location.search)
            orderIDParam.set('orderID', `${body.orderId}`)
            window.location.search = orderIDParam
            window.location.replace(`http://127.0.0.1:5501/order_confirmation.html?${orderIDParam}`)
        })
    
    } else {
        console.log('ERROR')
    }
})

//footer-bottom 0 