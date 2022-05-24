const apiUrl = "http://localhost:3000/api/products"; // Coordonnées de l'API
let productID = new URL(location).searchParams.get("id"); // Récupération de l'ID du produit


fetch(apiUrl + "/" + productID) // Récupération des données de l'API
    .then(res => res.json())

    .then(sofa => showProduct(sofa)) // Insertion des informations dans product.html

    .catch((err) => { // En cas d'erreur de récupération des données
        console.log(err);
    })

const showProduct = (sofa) => { // Création de la page du canapé
    document.querySelector(".item__img").innerHTML = `<img src="${sofa.imageUrl}" alt="${sofa.altTxt}"></img>`;
    document.querySelector("#title").textContent = sofa.name;
    document.querySelector("#description").textContent = sofa.description;
    document.querySelector("#price").textContent = sofa.price;

    for (let color of sofa.colors) {
        const productColor = document.createElement("option");
        document.querySelector("#colors").appendChild(productColor);
        productColor.value = color;
        productColor.innerHTML = color;
    }
}



