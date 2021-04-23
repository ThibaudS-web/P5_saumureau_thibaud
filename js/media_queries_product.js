
let divBackGround = document.getElementById('div_bg')
let priceDisplay = document.getElementById('card-price')
let smartphone = 480
let tablet = 800

function mediaQueriesPhone () {

    if(window.innerWidth < smartphone){
        divBackGround.classList.remove('border', 'shadow', 'bg-light')
        // priceDisplay.classList.add('ml-5')
        
    } else {
        divBackGround.classList.add('border', 'shadow', 'bg-light')       
    }
}

function mediaQueriesTablet (){
    if(window.innerWidth < tablet){
        priceDisplay.classList.add('ml-4')
    }
}

mediaQueriesPhone()
mediaQueriesTablet()

