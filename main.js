const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_XZHWFi7Iw6Zgo0nBBGrRZajWP6F12AlPaAQe5vJ0Qq6oo9E5vj60UWPIDXabvTHC';
// URL para obtener 2 imágenes aleatorias de gatos

const API_URL_FAVOTITES = 'https://api.thecatapi.com/v1/favourites?api_key=live_XZHWFi7Iw6Zgo0nBBGrRZajWP6F12AlPaAQe5vJ0Qq6oo9E5vj60UWPIDXabvTHC';
// URL para consultar o guardar gatos favoritos

const API_URL_FAVOTITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_XZHWFi7Iw6Zgo0nBBGrRZajWP6F12AlPaAQe5vJ0Qq6oo9E5vj60UWPIDXabvTHC`;
// Función que retorna la URL para eliminar un gato favorito por su ID

const spanError = document.getElementById('error'); // Elemento HTML para mostrar errores

async function loadRandomMichis() {
  // Carga dos gatos aleatorios desde la API
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log('Random');
  console.log(data);

  if (res.status !== 200) {
    // Si falla la solicitud, muestra el error
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    // Si todo va bien, actualiza imágenes y botones
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    
    img1.src = data[0].url;
    img2.src = data[1].url;

    btn1.onclick = () => saveFavouriteMichi(data[0].id);
    btn2.onclick = () => saveFavouriteMichi(data[1].id);
  }
}

async function loadFavouriteMichis() {
  // Carga y muestra los gatos marcados como favoritos
  const res = await fetch(API_URL_FAVOTITES);
  const data = await res.json();
  console.log('Favoritos');
  console.log(data);

  if (res.status !== 200) {
    // Si falla, muestra el error
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    // Limpia y reconstruye la sección de favoritos
    const section = document.getElementById('favoriteMichis');
    section.innerHTML = "";

    const h2 = document.createElement('h2');
    const h2Text = document.createTextNode('Michis favoritos');
    h2.appendChild(h2Text);
    section.appendChild(h2);

    data.forEach(michi => {
      const article = document.createElement('article');
      const img = document.createElement('img');
      const btn = document.createElement('button');
      const btnText = document.createTextNode('Sacar al michi de favoritos');

      img.src = michi.image.url;
      img.width = 150;
      btn.appendChild(btnText);
      btn.onclick = () => deleteFavouriteMichi(michi.id);
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  }
}

async function saveFavouriteMichi(id) {
  // Guarda un gato como favorito con su image_id
  const res = await fetch(API_URL_FAVOTITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image_id: id
    }),
  });
  const data = await res.json();

  console.log('Save');
  console.log(res);

  if (res.status !== 200) {
    // Si falla la solicitud, muestra el error
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    // Si se guarda correctamente, recarga la lista de favoritos
    console.log('Michi guardado en favoritos');
    loadFavouriteMichis();
  }
}

async function deleteFavouriteMichi(id) {
  // Elimina un gato favorito por su ID
  const res = await fetch(API_URL_FAVOTITES_DELETE(id), {
    method: 'DELETE',
  });
  const data = await res.json();

  if (res.status !== 200) {
    // Muestra error si falla
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    // Si se elimina correctamente, recarga favoritos
    console.log('Michi eliminado de favoritos');
    loadFavouriteMichis();
  }
}

loadRandomMichis();      // Carga gatos aleatorios al iniciar
loadFavouriteMichis();   // Carga favoritos al iniciar
