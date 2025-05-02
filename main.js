console.log('Hello, world') // Imprime un saludo en la consola para verificar que el script está corriendo correctamente

const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_XZHWFi7Iw6Zgo0nBBGrRZajWP6F12AlPaAQe5vJ0Qq6oo9E5vj60UWPIDXabvTHC';
// URL de la API que retorna 3 imágenes aleatorias de gatos. Incluye el parámetro 'limit=3' y la API key para autenticación

async function reload() {
  // Función asíncrona que obtiene imágenes de gatos desde la API

  const res = await fetch(API_URL); // Hace la solicitud GET a la URL de la API
  const data = await res.json();    // Convierte la respuesta en formato JSON

  console.log(data) // Muestra los datos obtenidos en consola (arreglo con objetos que contienen URLs de imágenes)

  const img1 = document.getElementById('img1'); // Obtiene el elemento de imagen con ID 'img1'
  const img2 = document.getElementById('img2'); // Obtiene el elemento de imagen con ID 'img2'
  const img3 = document.getElementById('img3'); // Obtiene el elemento de imagen con ID 'img3'
  
  img1.src = data[0].url; // Asigna la primera URL de imagen al elemento img1
  img2.src = data[1].url; // Asigna la segunda URL de imagen al elemento img2
  img3.src = data[2].url; // Asigna la tercera URL de imagen al elemento img3
}

reload(); // Llama la función para ejecutar todo al cargar el script
