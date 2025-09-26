/**
 * Vamos a crear dos montones de tarjetas, uno de películas y otro de recursos relacionados:
 * 
 */
const NMOVIES = 5
const NELEMENTSPMOVIE = 3
let draggedElement = null;

const dropTargets = document.querySelectorAll('#pelicula-intento .elementoVacio');




//Mostrar peliculas
const btnMostrarPelicula = document.getElementById('Mostrar_Película')



btnMostrarPelicula.addEventListener('click', (event) => {
    let imagenPeli = getElement(movieDeck)
    let contenedor = document.getElementById('pelicula-caratula')
    

    const imgElement = document.createElement('img')
    imgElement.classList.add('elemento')
    imgElement.src = `assets/movies/${imagenPeli}.jpg`
    imgElement.alt = 'caratula Peli'


    contenedor.innerHTML = ''
    contenedor.appendChild(imgElement)
    event.stopPropagation();

    resetDropTargets();
    resetRecursos()


})

//Mostrar recursos y dragg

const btnMostrarRecursos = document.getElementById('Mostrar_Recursos')

btnMostrarRecursos.addEventListener('click', (event) => {


    let imagenRecurso = getElement(elementDeck)
    let contenedor = document.getElementById('elementos-pelicula')
    let newContenedor = document.createElement('div')
    newContenedor.classList.add('elemento')
    newContenedor.classList.add('draggable')
    newContenedor.draggable = true;




    const imgElement = document.createElement('img')
    imgElement.classList.add('recurso')
    imgElement.src = `assets/characters/${imagenRecurso}.jpg`
    imgElement.alt = 'caratula Recurso'
    imgElement.draggable = false;



    newContenedor.appendChild(imgElement)
    //newContenedor.addEventListener('mouseup', seleccionarEventListener) cambia con el tema de dragg
    newContenedor.addEventListener('dragstart', (e) => {
        newContenedor.classList.add('dragging');
        draggedElement = newContenedor;
        e.dataTransfer.effectAllowed = "move";
        //console.log(`Estoy moviendo a ${newContenedor}`)
    });
    newContenedor.addEventListener('dragend', () => {
        newContenedor.classList.remove('dragging');
        draggedElement = null;
    });

    contenedor.appendChild(newContenedor);
    event.stopPropagation();

})

dropTargets.forEach(div => {
    div.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    })

    div.addEventListener('drop', (e) => { controlarDrop(e) });
});

const controlarDrop = (e) => {
    e.preventDefault();
    if (!draggedElement) return;

    const dropObjetivo = e.target;
    const imgRecurso = draggedElement.querySelector('img');
    const numeroRecurso = imgRecurso.src.split('/').pop();

    const pertenece = comprobarPertenece(numeroRecurso);

    if (pertenece===null || dropObjetivo.tagName!=='DIV' || dropObjetivo.classList.contains('ok')) return;// si no hay elemento o si ya esta lleno que se salga
    console.log(dropObjetivo);

    if (pertenece) {
        //dropObjetivo.src = imgRecurso.src;

        const imgElement = document.createElement('img')
        imgElement.classList.add('recurso')
        imgElement.src = imgRecurso.src
        imgElement.alt = 'caratula Recurso'
        dropObjetivo.appendChild(imgElement)

        dropObjetivo.classList.add('ok');
        draggedElement.remove();
        //dropObjetivo.classList.add('recurso');
    }
    else{ // en caso de fallo 
        draggedElement.classList.add('fail');

    }



}


const btnNuevoJuego = document.getElementById('Nuevo_Juego')
btnNuevoJuego.addEventListener('click', (e) => {
    resetDropTargets();
    resetCaratula();
    resetPeliculas();
    resetRecursos();
    e.stopPropagation();
});


const resetDropTargets = () => {
    dropTargets.forEach(div => {
        div.innerHTML = '';
        if(div.classList.contains('ok')) div.classList.remove('ok');
    });
}

const resetCaratula = () =>{
    const caratulaImg = document.getElementById('pelicula-caratula')
    if(caratulaImg) caratulaImg.innerHTML = '';
}

//desaparece con el tema del dragg
/* const seleccionarEventListener = (e)=>{
    
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

}*/


const comprobarPertenece = (numeroRecurso) => {
    const caratulaImg = document.getElementById('pelicula-caratula').querySelector('img');
    if (!caratulaImg) {
        alert('Primero muestra una película para poder adivinar.');
        return null;
    }

    let numRecurso = numeroRecurso.split('C')[0]
    //let numPeli = document.getElementById('pelicula-caratula').querySelector('img').src.split('/').pop().split('M').firstElementChild
    let numPeli = caratulaImg.src.split('/').pop().split('M')[0]
    return numRecurso == numPeli;
}

// document.getElementbyId('Nuevo_juego').addEventListener('click', (event)=>{

//     event.stopPropagation();
// });




const getMoviesDeck = () => {
    let movieDeck = []
    for (let i = 1; i <= NMOVIES; i++) {
        movieDeck.push("0" + i + "M")
    }
    //Barajamos con un método dela librería Underscore. Esta librería ofrece muchas funciones,
    //en este caso uso shuffle que recibe un arrayy lo devuelve de forma aleatoria
    movieDeck = _.shuffle(movieDeck)
    return movieDeck;
}

const getElementsDeck = () => {
    let elementDeck = []
    for (let i = 1; i <= NMOVIES; i++) {
        for (let j = 0; j < NELEMENTSPMOVIE; j++) {
            elementDeck.push("0" + i + "C" + j)
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





const getElement = (elementDeck) => {
    if (elementDeck.length === 0) throw 'No hay más elementos';
    const tarjeta = elementDeck.pop();
    return tarjeta;
}






