import { getData } from "./api.js";

// Récupère les données de tous les canapés via l'API
let sofaList = await getData();

// Génère le HTML
let allSegments = "";
sofaList.forEach((sofa) => {
    allSegments += displayProduct(sofa);
})

// Hydrate la page index.html
document.querySelector(".items").innerHTML += allSegments;

// Card d'un canapé
function displayProduct (sofa) {
    return `<a href="./product.html?id=${sofa._id}">
            <article>
            <img src="${sofa.imageUrl}" alt="${sofa.altTxt}"/>
            <h3 class="productName">${sofa.name}</h3>
            <p class="productDescription">${sofa.description}</p>
            </article>
            </a>`
}
