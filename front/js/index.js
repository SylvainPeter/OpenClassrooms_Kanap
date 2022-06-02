import { getData } from "./api.js";

// Récupère les données de tous les canapés
let sofaList = await getData();

// Insert les cards dans la page index.html
sofaList.forEach((sofa) => {
    document.querySelector(".items").innerHTML += displayProducts(sofa);
})


// Card d'un canapé
function displayProducts (sofa) {
    return `<a href="./product.html?id=${sofa._id}">
            <article>
            <img src="${sofa.imageUrl}" alt="${sofa.altTxt}"/>
            <h3 class="productName">${sofa.name}</h3>
            <p class="productDescription">${sofa.description}</p>
            </article>
            </a>`
}
