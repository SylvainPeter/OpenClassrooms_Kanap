import { getData } from "./api.js";

// Récupération des données de tous les canapés
let sofaList = await getData();

// Insertion des données dans la page index.html
sofaList.forEach((sofa) => {
    document.querySelector(".items").innerHTML += displayProducts(sofa);
})


function displayProducts (sofa) { // Structure d'une fiche canapé
    return `<a href="./product.html?id=${sofa._id}">
            <article>
            <img src="${sofa.imageUrl}" alt="${sofa.altTxt}"/>
            <h3 class="productName">${sofa.name}</h3>
            <p class="productDescription">${sofa.description}</p>
            </article>
            </a>`
}
