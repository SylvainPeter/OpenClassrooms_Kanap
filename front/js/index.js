import { getData } from "./api.js";

// Récupère les données de tous les canapés via l'API
let sofaList = await getData();

// Génère le HTML des canapés
let allSofas = "";
sofaList.forEach((sofa) => {
    allSofas += displayProduct(sofa);
})

// Insère le HTML des canapés dans la page index.html
document.querySelector(".items").innerHTML += allSofas;

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
