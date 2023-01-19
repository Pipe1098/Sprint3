//1. Capturar el formulario

import getDataFetch from "../helpers/getData.js";
import { submitForm } from "../modules/submitForm.js";

const urlCasas = "http://localhost:3000/Casas";
const form = document.querySelector(".form");

//2. Capturamos todos los elementos hijos de este form

const valuesForm = Object.values(form);
console.log(valuesForm);

//--Queremos utilizar este form para crear un nuevo Casa y para editar información de cualquier Casa

const editFormStr = sessionStorage.getItem("editCasa")
  ? JSON.parse(sessionStorage.getItem("editCasa"))
  : "";

const editForm = editFormStr ? parseInt(editFormStr) : null;

//--- Para que nos actualice el título de acuerdo con la acción que vamos a realizar: Crear nuevo Casa o editar Casa

const title = document.querySelector(".title");
const submitButton = valuesForm[valuesForm.length - 1];
console.log(submitButton);

submitButton.innerHTML = editForm ? "Guardar cambios" : "Crear Casa";

//--Este evento permite rellenar los campos del formulario cuando el usuario vá a realizar la edición de un Casa
document.addEventListener("DOMContentLoaded", async () => {
  let editCasa = {};
  const url = editForm ? `${urlCasas}/${editForm}` : urlCasas;

  try {
    if (editForm) {
      editCasa = await getDataFetch(url);
      console.log(editCasa);

      title.innerText = editForm
        ? `Actualiza los datos de ${editCasa.name}`
        : "Agregar nuevo Casas";

      valuesForm.forEach((valueInput) => {
        if (valueInput.id) {
          valueInput.value = editCasa[valueInput.id];
        }
      });
    }

    await submitForm(form, url, editForm);
  } catch (error) {
    console.log(error);
    alert(error);
  }
});

