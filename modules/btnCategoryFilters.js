import { printCardsCasas } from "./printCasas.js";

export const btnCategoryFilters = (arrayBtns, arrayHouse, contenedor) => {
  arrayBtns.forEach((boton) => {
    boton.addEventListener("click", () => {
      const filtro = arrayHouse.filter(
        (House) => House.ubicacion === boton.id
      );
        const filteredCasas = boton.id === "all" ? arrayHouse : filtro;
        console.log(filteredCasas);
        printCardsCasas(contenedor, filteredCasas);
    });
  });
};

export const btnCategoryFilters2 = (categoryList, arrayHouse, contenedor) => {
  categoryList.forEach((category) => {
    const categoryBtn = document.getElementById(category);
    categoryBtn.addEventListener("click", () => {
      const ubicacion = categoryBtn.id.slice(0, -1);
      console.log(ubicacion);
      const filtro = arrayHouse.filter((House) => House.ubicacion === ubicacion);
      const filteredCasas = ubicacion === "all" ? arrayHouse : filtro;
      console.log(filteredCasas);
      printCardsCasas(contenedor, filteredCasas);
    });
  });
};





