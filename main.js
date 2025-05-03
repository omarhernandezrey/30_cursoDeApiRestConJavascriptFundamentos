// Crea una instancia de Axios configurada con la base de la URL de la API
const api = axios.create({
  baseURL: 'https://api.thecatapi.com/v1'
});

// Establece la clave de autenticación global para todas las solicitudes hechas con Axios
api.defaults.headers.common['X-API-KEY'] = 'live_XZHWFi7Iw6Zgo0nBBGrRZajWP6F12AlPaAQe5vJ0Qq6oo9E5vj60UWPIDXabvTHC';


// URL para obtener imágenes aleatorias de gatos (limit=2)
const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2';

// URL para obtener y guardar gatos favoritos
const API_URL_FAVOTITES = 'https://api.thecatapi.com/v1/favourites';

// Función que genera dinámicamente la URL para eliminar un gato favorito específico por ID
const API_URL_FAVOTITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;

// URL para subir imágenes de gatos desde un formulario
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';

// Elemento del DOM donde se mostrará cualquier mensaje de error
const spanError = document.getElementById('error');


// Función para obtener 2 gatos aleatorios desde la API y mostrarlos en la página
async function loadRandomMichis() {
  const res = await fetch(API_URL_RANDOM);    // Solicitud GET simple con fetch
  const data = await res.json();              // Convierte la respuesta en JSON

  console.log('Random');
  console.log(data);                          // Imprime el arreglo con 2 objetos de gatos

  if (res.status !== 200) {
    // Si ocurre un error en la respuesta, muestra el código
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    // Selecciona las imágenes y botones del HTML
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');

    // Asigna las URLs de las imágenes aleatorias
    img1.src = data[0].url;
    img2.src = data[1].url;

    // Configura los botones para guardar estos gatos como favoritos al hacer clic
    btn1.onclick = () => saveFavouriteMichi(data[0].id);
    btn2.onclick = () => saveFavouriteMichi(data[1].id);
  }
}


// Función para cargar los gatos favoritos del usuario
async function loadFavouriteMichis() {
  const res = await fetch(API_URL_FAVOTITES, {
    method: 'GET',
    headers: {
      'X-API-KEY': 'live_XZHWFi7Iw6Zgo0nBBGrRZajWP6F12AlPaAQe5vJ0Qq6oo9E5vj60UWPIDXabvTHC', // Autenticación requerida
    },
  });

  const data = await res.json(); // Convierte la respuesta en JSON
  console.log('Favoritos');
  console.log(data);             // Imprime el arreglo de favoritos

  if (res.status !== 200) {
    // Muestra error si falla
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    // Selecciona la sección del HTML donde se mostrarán los favoritos
    const section = document.getElementById('favoriteMichis');
    section.innerHTML = ""; // Limpia el contenido previo

    // Agrega un título a la sección
    const h2 = document.createElement('h2');
    const h2Text = document.createTextNode('Michis favoritos');
    h2.appendChild(h2Text);
    section.appendChild(h2);

    // Recorre cada michi favorito y lo muestra con su imagen y botón
    data.forEach(michi => {
      const article = document.createElement('article'); // Contenedor individual
      const img = document.createElement('img');         // Imagen del gato
      const btn = document.createElement('button');      // Botón para eliminar
      const btnText = document.createTextNode('Sacar al michi de favoritos');

      img.src = michi.image.url;     // Asigna la imagen del gato
      img.width = 150;               // Ancho fijo
      btn.appendChild(btnText);      // Texto del botón

      // Al hacer clic se elimina ese michi de favoritos
      btn.onclick = () => deleteFavouriteMichi(michi.id);

      article.appendChild(img);      // Añade la imagen al contenedor
      article.appendChild(btn);      // Añade el botón al contenedor
      section.appendChild(article);  // Añade el contenedor a la sección del DOM
    });
  }
}


// Función para guardar un gato como favorito usando Axios (más seguro y profesional)
async function saveFavouriteMichi(id) {
  const { data, status } = await api.post('/favourites', {
    image_id: id, // ID del gato a guardar como favorito
  });

  console.log('Save');

  if (status !== 200) {
    // Muestra error si falla
    spanError.innerHTML = "Hubo un error: " + status + data.message;
  } else {
    // Si todo va bien, recarga la lista de favoritos
    console.log('Michi guardado en favoritos');
    loadFavouriteMichis();
  }
}


// Función para eliminar un gato de favoritos por ID
async function deleteFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVOTITES_DELETE(id), {
    method: 'DELETE',
    headers: {
      'X-API-KEY': 'live_XZHWFi7Iw6Zgo0nBBGrRZajWP6F12AlPaAQe5vJ0Qq6oo9E5vj60UWPIDXabvTHC',
    }
  });

  const data = await res.json();

  if (res.status !== 200) {
    // Muestra el error con código y mensaje si falla
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    // Si se borra correctamente, recarga los favoritos
    console.log('Michi eliminado de favoritos');
    loadFavouriteMichis();
  }
}


// Función para subir una imagen personalizada desde un formulario HTML
async function uploadMichiPhoto() {
  const form = document.getElementById('uploadingForm'); // Obtiene el formulario
  const formData = new FormData(form);                   // Crea un FormData con la imagen

  console.log(formData.get('file'));                     // Muestra el archivo en consola

  const res = await fetch(API_URL_UPLOAD, {
    method: 'POST',
    headers: {
      // No se agrega 'Content-Type', fetch lo gestiona con FormData
      'X-API-KEY': 'live_XZHWFi7Iw6Zgo0nBBGrRZajWP6F12AlPaAQe5vJ0Qq6oo9E5vj60UWPIDXabvTHC',
    },
    body: formData, // Se envía el archivo como cuerpo de la solicitud
  });

  const data = await res.json();

  if (res.status !== 201) {
    // Muestra error si falla la carga
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    console.log({ data });
  } else {
    // Si se carga bien, guarda automáticamente la imagen subida como favorita
    console.log('Foto de michi subida :)');
    console.log({ data });
    console.log(data.url);
    saveFavouriteMichi(data.id);
  }
}

// Ejecuta las funciones al cargar la página
loadRandomMichis();
loadFavouriteMichis();
