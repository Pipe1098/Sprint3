import getDataFetch from "../helpers/getData.js";
import { printCardsCasas } from "../modules/printCasas.js";

const urlFavoritos = "http://localhost:3000/favoritos";
const contenedor = document.getElementById("contenedor");


document.addEventListener('DOMContentLoaded', async() => {
    const favoritos = await getDataFetch(urlFavoritos);
    printCardsCasas(contenedor, favoritos,1);
})