const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_XZHWFi7Iw6Zgo0nBBGrRZajWP6F12AlPaAQe5vJ0Qq6oo9E5vj60UWPIDXabvTHC';
// URL para obtener 2 imágenes aleatorias de gatos

const API_URL_FAVOTITES = 'https://api.thecatapi.com/v1/favourites?limit=2&api_key=live_XZHWFi7Iw6Zgo0nBBGrRZajWP6F12AlPaAQe5vJ0Qq6oo9E5vj60UWPIDXabvTHC';
// URL para obtener 2 gatos marcados como favoritos

const spanError = document.getElementById('error'); // Elemento para mostrar errores

async function loadRandomMichis() {
  // Carga 2 gatos aleatorios y asigna las imágenes y botones
  const res = await fetch(API_URL_RANDOM);        // Solicita gatos aleatorios
  const data = await res.json();                  // Convierte la respuesta a JSON
  console.log('Random');
  console.log(data);                              // Muestra los datos en consola

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status; // Muestra error si falla
  } else {
    const img1 = document.getElementById('img1'); // Imagen del primer gato
    const img2 = document.getElementById('img2'); // Imagen del segundo gato
    const btn1 = document.getElementById('btn1'); // Botón para guardar el primer gato
    const btn2 = document.getElementById('btn2'); // Botón para guardar el segundo gato

    img1.src = data[0].url;                       // Asigna la imagen 1
    img2.src = data[1].url;                       // Asigna la imagen 2

    btn1.onclick = () => saveFavouriteMichi(data[0].id); // Guarda el gato 1
    btn2.onclick = () => saveFavouriteMichi(data[1].id); // Guarda el gato 2
  }
}

async function loadFavouriteMichis() {
  // Carga los gatos favoritos y los muestra en pantalla
  const res = await fetch(API_URL_FAVOTITES);     // Solicita los favoritos
  const data = await res.json();                  // Convierte la respuesta a JSON
  console.log('Favoritos');
  console.log(data);                              // Muestra en consola

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message; // Muestra error
  } else {
    data.forEach(michi => {
      const section = document.getElementById('favoriteMichis'); // Sección de favoritos
      const article = document.createElement('article');         // Contenedor individual
      const img = document.createElement('img');                 // Imagen del favorito
      const btn = document.createElement('button');              // Botón para quitar
      const btnText = document.createTextNode('Sacar al michi de favoritos');

      img.src = michi.image.url;      // Asigna la URL de la imagen favorita
      img.width = 150;                // Ancho fijo
      btn.appendChild(btnText);       // Texto del botón
      article.appendChild(img);       // Añade imagen al contenedor
      article.appendChild(btn);       // Añade botón al contenedor
      section.appendChild(article);   // Añade el contenedor al DOM
    });
  }
}

async function saveFavouriteMichi(id) {
  // Guarda un gato como favorito enviando su image_id
  const res = await fetch(API_URL_FAVOTITES, {
    method: 'POST',                              // Método POST
    headers: {
      'Content-Type': 'application/json',        // Tipo de contenido
    },
    body: JSON.stringify({
      image_id: id                               // ID de la imagen a guardar
    }),
  });
  const data = await res.json();                // Convierte respuesta a JSON

  console.log('Save');
  console.log(res);                             // Muestra en consola

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message; // Muestra error si falla
  }
}

loadRandomMichis();     // Ejecuta la carga de gatos aleatorios al iniciar
loadFavouriteMichis();  // Ejecuta la carga de favoritos al iniciar
