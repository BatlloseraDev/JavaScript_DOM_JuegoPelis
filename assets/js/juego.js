/**
 * Vamos a crear dos montones de tarjetas, uno de películas y otro de recursos relacionados:
 * 
 */
const NMOVIES = 5
const NELEMENTSPMOVIE = 3

/* Voy a crear un elemento */

// const btnNuevaPartida = () =>{
//     let imagenPeli =  getElement(movieDeck)
//     let contenedor = document.getElementById('pelicula-caratula')
//     const imgElement = document.createElement('img')
//     imgElement.classList.add('elemento')
//     imgElement.src = `assets/movies/${imagenPeli}.jpg`
//     if(contenedor.firstChild) contenedor.removeChild(contenedor.firstChild)
//     contenedor.appendChild(imgElement)
// }

let btnNuevaPartida = document.getElementById('Mostrar_Película')

btnNuevaPartida.addEventListener('click', (event)=> {
    let imagenPeli= getElement(movieDeck)
    let contenedor = document.getElementById('pelicula-caratula')

    const imgElement = document.createElement('img')
    imgElement.classList.add('elemento')
    imgElement.src = `assets/movies/${imagenPeli}.jpg`
    imgElement.alt = 'caratula Peli'

    
    contenedor.innerHTML= ''
    contenedor.appendChild(imgElement)
    event.stopPropagation();
})


// document.getElementbyId('Nuevo_juego').addEventListener('click', (event)=>{
    
//     event.stopPropagation();
// });




const getMoviesDeck = () => {
    let movieDeck = []
    for(let i = 1; i <= NMOVIES; i++) {
        movieDeck.push("0"+i+"M")
    }
    //Barajamos con un método dela librería Underscore. Esta librería ofrece muchas funciones,
    //en este caso uso shuffle que recibe un arrayy lo devuelve de forma aleatoria
    movieDeck = _.shuffle(movieDeck)
    return movieDeck;
}

const getElementsDeck = () => {
    let elementDeck = []
    for(let i = 1; i <= NMOVIES; i++) {
        for(let j = 1; j <= NELEMENTSPMOVIE; j++) {
            elementDeck.push("0"+i+"C"+j)
        } 
    }
    //Barajamos
    elementDeck = _.shuffle(elementDeck)
    return elementDeck;
}

let movieDeck = getMoviesDeck()
let elementDeck = getElementsDeck()



const getElement = (elementDeck)=>{
    if(elementDeck.length === 0) throw 'No hay más elementos';
    const tarjeta = elementDeck.pop();
    return tarjeta;
}






