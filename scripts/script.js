// const incorrectDataJSON = {
//     'name': 'Whitney',
//     'age': 29
// }

import getDataFetch from "../helpers/getData.js";
import deleteDataFetch from "../helpers/deleteData.js";
import {
  btnCategoryFilters,
  btnCategoryFilters2,
} from "../modules/btnCategoryFilters.js";
import { getCategoryFilter } from "../modules/getCategoryFilter.js";
import { printCardsCasas } from "../modules/printCasas.js";
import postDataFetch from "../helpers/postData.js";

// const dataJson = JSON.stringify(incorrectDataJSON);
// console.log(dataJson);
// console.log(typeof dataJson);


const urlCasas = "http://localhost:3000/Casas";
const urlFavoritos = "http://localhost:3000/favoritos";
let Casas = [];

const contenedorCasas = document.getElementById("contenedorCards");
const nodelistipo=document.getElementById('select');
const nodelistip=document.getElementById("select");
console.log(nodelistip);
const arrayList = [...nodelistip];
arrayList.forEach(element => {
  console.log(element.value);
});
console.log(typeof arrayList);
//-----Capturando el input de búsqueda
const search = document.getElementById("search");

//-----Botones de filtrado--------

//------Capturar el primer conjunto de botones-----
const botonAll = document.getElementById("all");
const botonsur = document.getElementById("sur");
const botonnorte = document.getElementById("norte");
const botoncentro = document.getElementById("centro");

//Colocamos todos estos botones en un array
const arrayBotones = [botonAll, botonsur, botonnorte,botoncentro];

document.addEventListener("DOMContentLoaded", async () => {
  sessionStorage.removeItem("editCasa");
  sessionStorage.removeItem("CasaDetails");
  try {
    Casas = await getDataFetch(urlCasas);
    console.log(Casas);

    printCardsCasas(contenedorCasas, Casas,0);
    //Ejecutamos la función que nos permite filtrar x categoría
    btnCategoryFilters(arrayBotones, Casas, contenedorCasas);
    //   printCardsCasas(contenedorCasas, filtros);

    //----Funcionalidad al segundo conjunto de botones
    const parcialCategories = getCategoryFilter(Casas);
    const categories = ["all2", ...parcialCategories];
    console.log(categories);
    btnCategoryFilters2(categories, Casas, contenedorCasas);
    //   printCardsCasas(contenedorCasas, filtros2);
  } catch (error) {
    console.log(error);
    alert(error);
  }
});

document.addEventListener("click", async ({ target }) => {
  //Funcionalidad de ir a detalles del Casa
  if (target.classList.contains("card__img")) {
    sessionStorage.setItem("CasaDetails", JSON.stringify(target.id));
    location.href = "./pages/casaDetails.html";
  }
  //Funcionalidad de eliminar un Casa
  if (target.classList.contains("card__delete")) {
    Swal.fire({
      title: "¿Está usted seguro de eliminar?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        const idCasaDelete = parseInt(target.name);
        const urlDelete = `${urlCasas}/${idCasaDelete}`;

        try {
          await deleteDataFetch(urlDelete);
          Casas = await getDataFetch(urlCasas);
          printCardsCasas(contenedorCasas, Casas,0);
        } catch (error) {
          console.log("No se pudo eliminar hay un error" + error);
        }
      }
    });
  }

  //Inicio de la funcionalidad de edición

  if (target.classList.contains("card__edit")) {
    console.log(target.name);
    sessionStorage.setItem("editCasa", JSON.stringify(target.name));
    location.href = "./pages/formCasa.html";
  }

  //Para agregar a favoritos
  if (target.classList.contains("card__favorite")) {
    const idFavorito = target.name;
    const urlCasaFavorito = `${urlFavoritos}?id=${idFavorito}`;

    const favorito = await getDataFetch(urlCasaFavorito);
    //Obtenemos el objeto
    const favoriteCasa = await getDataFetch(
      `${urlCasas}/${idFavorito}`
    );
    if (favorito.length === 0 && Object.entries(favoriteCasa).length) {
      await postDataFetch(urlFavoritos, favoriteCasa);
      const data = await getDataFetch(urlFavoritos);
      console.log(data);
    }
  }
});

//Escuchar el evento search del input de búsqueda por nombre
search.addEventListener("search", async () => {
  const searchTerm = search.value;
  try {
    if (searchTerm) {
      const datosCasas = await getDataFetch(urlCasas);
      const resultadoBusqueda = datosCasas.filter((House) =>
        House.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      printCardsCasas(contenedorCasas, resultadoBusqueda,0);
    } else {
      const datosCasas = await getDataFetch(urlCasas);
      printCardsCasas(contenedorCasas, datosCasas,0);
    }
  } catch (error) {
    console.log(error);
  }
});
