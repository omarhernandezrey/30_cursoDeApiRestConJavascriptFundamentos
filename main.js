const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_XZHWFi7Iw6Zgo0nBBGrRZajWP6F12AlPaAQe5vJ0Qq6oo9E5vj60UWPIDXabvTHC';
// URL para obtener 2 imágenes aleatorias de gatos

const API_URL_FAVOTITES = 'https://api.thecatapi.com/v1/favourites?limit=2&api_key=live_XZHWFi7Iw6Zgo0nBBGrRZajWP6F12AlPaAQe5vJ0Qq6oo9E5vj60UWPIDXabvTHC';
// URL para obtener 2 gatos marcados como favoritos

const spanError = document.getElementById('error'); // Elemento donde se mostrará un mensaje de error

async function loadRandomMichis() {
  // Función asíncrona para cargar imágenes aleatorias de gatos

  const res = await fetch(API_URL_RANDOM); // Solicitud GET a la API de imágenes aleatorias
  const data = await res.json();           // Convierte la respuesta en JSON
  console.log('Random');
  console.log(data);

  if (res.status !== 200) {
    // Si la respuesta no fue exitosa, muestra el código de error
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    // Si todo va bien, asigna las imágenes a los elementos correspondientes
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');

    img1.src = data[0].url;
    img2.src = data[1].url;
  }
}

async function loadFavoritesMichis() {
  // Función asíncrona para cargar gatos favoritos

  const res = await fetch(API_URL_FAVOTITES); // Solicitud GET a la API de favoritos
  const data = await res.json();              // Convierte la respuesta en JSON
  console.log('Favoritos');
  console.log(data);

  if (res.status !== 200) {
    // Si la respuesta no fue exitosa, muestra el código y mensaje de error
    spanError.innerHTML = "Hubo un error: " + res.status + " " + data.message;
  }

  // Si quieres mostrar algún favorito, puedes usar el img3:
  const img3 = document.getElementById('img3');
  if (data.length > 0) {
    img3.src = data[0].image.url;
  }
}

loadRandomMichis();      // Carga imágenes aleatorias al iniciar
loadFavoritesMichis();   // Carga imágenes favoritas al iniciar
