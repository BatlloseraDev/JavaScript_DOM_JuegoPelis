/**
 * Vamos a crear dos montones de tarjetas, uno de películas y otro de recursos relacionados:
 * 
 */
const NMOVIES = 5
const NELEMENTSPMOVIE = 3

//Mostrar peliculas
let btnMostrarPelicula = document.getElementById('Mostrar_Película')

btnMostrarPelicula.addEventListener('click', (event)=> {
    let imagenPeli= getElement(movieDeck)
    let contenedor = document.getElementById('pelicula-caratula')

    const imgElement = document.createElement('img')
    imgElement.classList.add('elemento')
    imgElement.src = `assets/movies/${imagenPeli}.jpg`
    imgElement.alt = 'caratula Peli'


    contenedor.innerHTML= ''
    contenedor.appendChild(imgElement)
    event.stopPropagation();

    resetRecursos()


})

//Mostrar recursos

let btnMostrarRecursos = document.getElementById('Mostrar_Recursos')

btnMostrarRecursos.addEventListener('click', (event)=> {

   
    let imagenRecurso= getElement(elementDeck)
    let contenedor = document.getElementById('elementos-pelicula')
    let newContenedor = document.createElement('div')
    newContenedor.classList.add('elemento')

    const imgElement = document.createElement('img')
    imgElement.classList.add('recurso')
    imgElement.src = `assets/characters/${imagenRecurso}.jpg`
    imgElement.alt = 'caratula Recurso'

    newContenedor.appendChild(imgElement)
    newContenedor.addEventListener('mouseup', seleccionarEventListener)
    contenedor.appendChild(newContenedor)
    event.stopPropagation();

})




const seleccionarEventListener = (e)=>{
    
    let img = (e.target.tagName== 'DIV') ? e.target.firstElementChild : e.target
    let numeroRecurso = img.src.split('/').pop()
    if(comprobarPertenece(numeroRecurso)) {
        
        img.parentElement.classList.add('ok');
    }
    else{
        img.parentElement.classList.add('fail');
    }

    
    // let img= (e.target.tagName === 'DIV') ? e.target.querySelector('img') : e.target
    // let numeroPeli = img.src.split('/').pop()
    // if(comprobarPertenece(numeroPeli)) 

}


const comprobarPertenece = (numeroRecurso)=>{
    let numRecurso = numeroRecurso.split('C')[0]
    //let numPeli = document.getElementById('pelicula-caratula').querySelector('img').src.split('/').pop().split('M').firstElementChild
    let numPeli = document.getElementById('pelicula-caratula').querySelector('img').src.split('/').pop().split('M')[0]
    return numRecurso== numPeli;
}

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
        for(let j = 0; j < NELEMENTSPMOVIE; j++) {
            elementDeck.push("0"+i+"C"+j)
        } 
    }
    //Barajamos
    elementDeck = _.shuffle(elementDeck)
    return elementDeck;
}

let movieDeck = getMoviesDeck()
let elementDeck = getElementsDeck()


const resetRecursos = () => {
    elementDeck = getElementsDeck()
    let contenedor = document.getElementById('elementos-pelicula')
    contenedor.innerHTML = ''

}

const resetPeliculas = () => {
    movieDeck = getMoviesDeck()
}





const getElement = (elementDeck)=>{
    if(elementDeck.length === 0) throw 'No hay más elementos';
    const tarjeta = elementDeck.pop();
    return tarjeta;
}






