let form = document.querySelector('#orderForm')
//============================================================================ firstName

//On écoute sur le changement d'état de l'input
form.firstName.addEventListener('change', function(){
    validFirstName(this)
})

//On crée une fonction pour la validation du prénom
const validFirstName = function(inputFirstName){
    //Création de l'expression régulière pour validation email
    let firstNameRegExp = new RegExp('^[A-Z][A-Za-z\é\è\ê\ç\-]+$', 'g')

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
const validlastName = function(inputLastName){
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
form.adress.addEventListener('change', function(){
    validAdress(this)
})

//On crée une fonction pour la validation de l'email
const validAdress = function(inputAdress){
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
const validCity = function(inputCity){
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
form.email.addEventListener('change', function(){
    validEmail(this)
})

//On crée une fonction pour la validation de l'email
const validEmail = function(inputEmail){
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

//============================================================================ SOUMISSION DU FORMULAIRE

form.addEventListener('submit', function(event){

    event.preventDefault()

    if(validFirstName(form.firstName) && validlastName(form.lastName) && validAdress(form.adress) && validEmail(form.email) && validCity(form.city)){

        form.submit()
        window.location.replace('http://127.0.0.1:5501/order_confirmation.html')
    
    } else {
        console.log('ERROR')
    }
})
