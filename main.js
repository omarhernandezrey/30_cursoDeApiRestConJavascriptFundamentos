const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_XZHWFi7Iw6Zgo0nBBGrRZajWP6F12AlPaAQe5vJ0Qq6oo9E5vj60UWPIDXabvTHC';
// URL para obtener 2 imágenes aleatorias de gatos

const API_URL_FAVOTITES = 'https://api.thecatapi.com/v1/favourites?limit=2&api_key=live_XZHWFi7Iw6Zgo0nBBGrRZajWP6F12AlPaAQe5vJ0Qq6oo9E5vj60UWPIDXabvTHC';
// URL para obtener 2 gatos marcados como favoritos

const spanError = document.getElementById('error'); // Elemento donde se muestra el error si ocurre

async function loadRandomMichis() {
  // Función para obtener y mostrar dos gatos aleatorios desde la API
  const res = await fetch(API_URL_RANDOM); // Realiza la solicitud a la API
  const data = await res.json();           // Convierte la respuesta en JSON
  console.log('Random');
  console.log(data);                       // Muestra en consola los datos obtenidos

  if (res.status !== 200) {
    // Si la respuesta no fue exitosa, muestra el código de error
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    // Si fue exitosa, actualiza las imágenes en el HTML
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    
    img1.src = data[0].url; // Asigna la primera imagen aleatoria
    img2.src = data[1].url; // Asigna la segunda imagen aleatoria
  }
}

async function loadFavouriteMichis() {
  // Función para obtener y mostrar los gatos marcados como favoritos
  const res = await fetch(API_URL_FAVOTITES); // Solicita los favoritos
  const data = await res.json();              // Convierte la respuesta en JSON
  console.log('Favoritos');
  console.log(data);                          // Muestra los datos en consola

  if (res.status !== 200) {
    // Si hay error, lo muestra con el mensaje de la API
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  }
}

async function saveFavouriteMichis() {
  // Función para guardar un gato como favorito (falta imagen real)
  const res = await fetch(API_URL_FAVOTITES, {
    method: 'POST', // Método POST para enviar datos
    headers: {
      'Content-Type': 'application/json', // Indica que se envía JSON
    },
    body: JSON.stringify({
      image_id: 'dje' // ❌ ID falso: debe ser reemplazado por uno real de un gato mostrado
    }),
  });
  const data = await res.json(); // Convierte la respuesta en JSON

  console.log('Save');
  console.log(res); // Muestra el objeto de respuesta en consola

  if (res.status !== 200) {
    // Muestra error si falla la petición
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  }
}

loadRandomMichis();       // Ejecuta la carga inicial de gatos aleatorios
loadFavouriteMichis();    // Ejecuta la carga inicial de favoritos
