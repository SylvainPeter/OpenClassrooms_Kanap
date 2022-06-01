import { getDataById } from "./api.js";

const productID = new URL(location).searchParams.get("id"); // Récupération de l'ID du canapé

// Récupération des données du canapé correspondant à cet ID
let sofa = await getDataById(productID); 

// Insertion des infos dans la page product.html
showProduct(sofa);

function showProduct (sofa) { // Structure d'une page canapé
    document.querySelector(".item__img").innerHTML = `<img src="${sofa.imageUrl}" alt="${sofa.altTxt}">`;
    document.querySelector("#title").textContent = sofa.name;
    document.querySelector("#description").textContent = sofa.description;
    document.querySelector("#price").textContent = sofa.price;
    for (let color of sofa.colors) { // Options de couleur et de quantité
        let productColor = document.createElement("option");
        document.querySelector("#colors").appendChild(productColor);
        productColor.value = color;
        productColor.innerHTML = color;
    }
}

//Ecoute le bouton "Ajouter au panier"
document.querySelector("#addToCart").addEventListener("click", (event) => { 
    let colorSelection = document.querySelector("#colors"); // Choix utilisateur couleur
    let quantitySelection = document.querySelector("#quantity"); // Choix utilisateur quantité
    if (colorSelection.value == "") { //Si couleur pas définie, message d'erreur
        alert("Veuillez choisir une couleur !");
    }
    else if (quantitySelection.value == 0 || quantitySelection.value > 100) { // Si quantité 0 ou <100, message d'erreur
        alert("Veuillez choisir une quantité entre 1 et 100 !");
    }
    else { // Si couleur définie + quantité entre 1 et 100, ajout du produit au panier
        let productChoice = document.querySelector("#title").textContent;
        let productPrice = document.querySelector("#price").textContent;
        let colorChoice = document.querySelector("#colors").value;
        let quantityChoice = document.querySelector("#quantity").value;
        alert(`Votre commande de ${quantityChoice} ${productChoice} couleur ${colorChoice} est ajoutée au panier !`);
        addToCart({ // on stocke les infos dans le localStorage
            id : parseInt(productID), 
            "name": productChoice, 
            "color" : colorChoice, 
            "quantity" : parseInt(quantityChoice),
            "price": parseInt(productPrice), 
            "imageUrl" : sofa.imageUrl,
            "altTxt" : sofa.altTxt
        });
    }
})

// Sauve le panier
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Récupère le panier
function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
        return [];
    }
    else {
        return JSON.parse(cart);
    }
}

// Ajoute un produit au panier
function addToCart(product) {
    let cart = getCart(); // récupère le panier
    let foundSameProduct = cart.find(p => p.id == product.id && p.color == product.color);
    if (foundSameProduct != undefined) { // si un produit de cette couleur existe déjà
        foundSameProduct.quantity += product.quantity; // on augmente juste sa quantité
    }
    else {
        cart.push(product); // si un produit de cette couleur n'existe pas, on ajoute nouveau produit au panier
    }
    saveCart(cart); // on sauve le panier
}