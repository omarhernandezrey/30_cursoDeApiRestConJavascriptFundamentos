console.log('Hello, world') // Imprime un saludo en la consola para verificar que el script se ejecuta

const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_XZHWFi7Iw6Zgo0nBBGrRZajWP6F12AlPaAQe5vJ0Qq6oo9E5vj60UWPIDXabvTHC'; 
// URL de la API que retorna 3 imágenes aleatorias de gatos, con límite y clave API incluidos correctamente

async function reload() {
  // Función asíncrona que obtiene imágenes desde la API y las muestra en la página

  const res = await fetch(API_URL); // Hace una petición HTTP GET a la API
  const data = await res.json();    // Espera la conversión de la respuesta a formato JSON

  console.log(data) // Muestra en la consola los datos obtenidos para inspección

  const img1 = document.getElementById('img1'); // Obtiene la referencia a la primera imagen por ID
  const img2 = document.getElementById('img2'); // Obtiene la referencia a la segunda imagen por ID
  const img3 = document.getElementById('img3'); // Obtiene la referencia a la tercera imagen por ID
  
  img1.src = data[0].url; // Asigna la URL de la primera imagen al elemento img1
  img2.src = data[1].url; // Asigna la URL de la segunda imagen al elemento img2
  img3.src = data[2].url; // Asigna la URL de la tercera imagen al elemento img3
}

reload(); // Llama a la función para que cargue las imágenes al iniciar
