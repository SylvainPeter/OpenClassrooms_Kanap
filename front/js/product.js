// Coordonnées de l'API
const apiUrl = "http://localhost:3000/api/products";
// Récupération de l'ID du produit
const productID = new URL(location).searchParams.get("id");
// Choix couleur
let colorSelection = document.querySelector("#colors");
// Choix quantité
let quantitySelection = document.querySelector("#quantity");


// Récupération des données de l'API
let getDataById = () => {
fetch(apiUrl + "/" + productID)
    .then(res => res.json())
    .then(sofa => showProduct(sofa))
    // En cas d'erreur de récupération des données
    .catch((err) => {
        console.log(err);
    })
}

// Affiche les informations du canapé dans la page product.html
let showProduct = (sofa) => {
    document.querySelector(".item__img").innerHTML = `<img src="${sofa.imageUrl}" alt="${sofa.altTxt}">`;
    document.querySelector("#title").textContent = sofa.name;
    document.querySelector("#description").textContent = sofa.description;
    document.querySelector("#price").textContent = sofa.price;
    // Insertion des options de couleur et de quantité
    for (let color of sofa.colors) {
        let productColor = document.createElement("option");
        document.querySelector("#colors").appendChild(productColor);
        productColor.value = color;
        productColor.innerHTML = color;
    }
}

getDataById();


//Ecoute le bouton "Ajouter au panier"
document.querySelector("#addToCart").addEventListener("click", (event) => {
    //Si la couleur n'est pas définie, message d'erreur
    if (colorSelection.value == "") {
        alert("Veuillez choisir une couleur !");
    }
    //Si la quantité est égale à 0 ou supérieure à 100, message d'erreur
    else if (quantitySelection.value == 0 || quantitySelection.value > 100) {
        alert("Veuillez choisir une quantité entre 1 et 100 !");
    }
    // Si la couleur est définie et la quantité est comprise entre 1 et 100, ajout du produit au panier
    else {
        addProductToCart();
    }
    
})

// Ajoute le produit au panier
let addProductToCart = () => {
    let productChoice = document.querySelector("#title").textContent;
    let colorChoice = document.querySelector("#colors").value;
    let quantityChoice = document.querySelector("#quantity").value;
    alert(`Votre commande de ${quantityChoice} ${productChoice} couleur ${colorChoice} est ajoutée au panier !`)
}
