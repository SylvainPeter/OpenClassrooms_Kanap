// Coordonnées de l'API
const apiUrl = "http://localhost:3000/api/products";

// Récupération des données de l'API
let getData = () => {
    fetch(apiUrl)
    .then(res => res.json())
    // Insertion des fiches dans la page index.html
    .then((sofaList) => {
        sofaList.forEach((sofa) => {
            document.querySelector(".items").innerHTML += displayProduct(sofa);
        });
    })
    // En cas d'erreur de récupération des données
    .catch((err) => {
        document.querySelector(".items").innerHTML += `<p>Désolé, aucun produit disponible</p>`;
        console.log(err);
    })
}

// Création d'une fiche canapé
let displayProduct = (sofa) => {
    return `<a href="./product.html?id=${sofa._id}">
            <article>
            <img src="${sofa.imageUrl}" alt="${sofa.altTxt}"/>
            <h3 class="productName">${sofa.name}</h3>
            <p class="productDescription">${sofa.description}</p>
            </article>
            </a>`
}


getData();