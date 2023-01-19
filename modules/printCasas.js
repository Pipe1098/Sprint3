export const printCardsCasas = (contenedor, arrayCasas, num) => {
    contenedor.innerHTML = "";
    if (num == 1) {
        arrayCasas.forEach(Casa => {
            const article = document.createElement("article");
            article.classList.add("main__card");
            article.innerHTML = `
        <figure class="card__image">
                    <img id=${Casa.id} src=${Casa.image} alt="${Casa.name}" class="card__img">
                </figure>
                <button class="card__delete" name='${Casa.id}'>❌</button>
                <button class="card__edit" name='${Casa.id}'>✏</button>
                <button class="card__favorite" name='${Casa.id}'>❤</button>
                <h4 class="card__name">${Casa.name}</h4>
                <h4 class="card__name">${Casa.height}m2</h4>
                <h4 class="card__name">$${Casa.precio}</h4>
                <h4 class="card__name">${Casa.comodidades}</h4>
                <h4 class="card__name">${Casa.descripcion}</h4>
                <h4 class="card__name">${Casa.modalidad}</h4>
                <h4 class="card__name">${Casa.contacto}</h4>
                <h4 class="card__name">${Casa.tipo}</h4>
                <h4 class="card__name">${Casa.ubicacion}</h4>
        `;

            contenedor.appendChild(article);
        });
    }
    else {
        arrayCasas.forEach(Casa => {
            const article = document.createElement("article");
            article.classList.add("main__card");
            article.innerHTML = `
        <figure class="card__image">
                    <img id=${Casa.id} src=${Casa.image} alt="${Casa.name}" class="card__img">
                </figure>
                <button class="card__delete" name='${Casa.id}'>❌</button>
                <button class="card__edit" name='${Casa.id}'>✏</button>
                <button class="card__favorite" name='${Casa.id}'>❤</button>
                <h4 class="card__name">${Casa.name}</h4>
                <h4 class="card__precio">Precio:$${Casa.precio}</h4>
                <h4 class="card__mod">${Casa.modalidad}</h4>
                
        `;

            contenedor.appendChild(article);
        });
    }
};