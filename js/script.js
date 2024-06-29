
const getChiste = document.getElementById('fetchJoke')

const jokeList = document.getElementById('jokeList');

const deleteBtn = document.getElementById('deleteAllJokes');


getChiste.addEventListener('click', () => {
    //console.log('boton funciona capturado');
    fetch('https://api.chucknorris.io/jokes/random')
    .then((response) => {
      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }
      return response.json();
    })
    .then((data) => {
      //console.log(data.value);
      displayJoke(data.value);
      jokesEnLocalStorage(data.value);
    })
    
  .catch((error) => {
    Console.log('Error: no se pudo obtener el chiste', error);
  })
});


function displayJoke(joke) { //--->mostrar chistes en la pagina
    const jokeItem = document.createElement('li');
    jokeItem.textContent = joke;
    jokeList.appendChild(jokeItem);
}

function jokesEnLocalStorage(joke) { //---> guardar en localstorage pasando a string
    let jokes = JSON.parse(localStorage.getItem('jokes')) || [];
    jokes.push(joke);
    localStorage.setItem('jokes', JSON.stringify(jokes));
    //console.log(localStorage);
}

function loadJokesLocalStorage() { //--> funcion para que cargue los chistes en la apg
    let jokes = JSON.parse(localStorage.getItem('jokes')) || [];
    jokes.forEach((joke) => {
        displayJoke(joke);
    });
}

loadJokesLocalStorage(); //--> llamarla para cargarlos en la pag

deleteBtn.addEventListener ('click', () => { //--->boton para eliminar todos los chistes
    //console.log('funciona boton capturado') 
    localStorage.removeItem('jokes');
    jokeList.innerHTML = '';
    //console.log(localStorage);
});

