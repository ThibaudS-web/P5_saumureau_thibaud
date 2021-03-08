
fetch(`http://localhost:3000/api/teddies/`)
    .then(function(response) {
        return response.json()
    })
    .then(function(teddies) {
        console.log(teddies)
        
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
                
                for(teddy of teddy.colors){

                    let colorTeddyOne = document.getElementById("selectColor")
                    let opt = document.createElement("option")
    
                    colorTeddyOne.appendChild(opt).setAttribute('value', `${teddy.colors}`)
                    opt.innerHTML += teddy
                }
            
            } else {
                console.log();
            }
        }   
    })


//substring + indexOf
//boucle for if id en cours = id que j'ai récupéré 
