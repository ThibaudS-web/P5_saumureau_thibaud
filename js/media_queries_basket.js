let inputCity = document.getElementById('city-media')
let tablet = 800

function mediaQueriesTablet () {

    if(window.innerWidth < tablet){
        inputCity.classList.add('mt-4')
    }
}

mediaQueriesTablet()