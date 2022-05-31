import { getDataById } from "./api.js";
import { addToCart, changeQuantity } from "./cart.js";

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
        addToCart({id : parseInt(productID), "name": productChoice, "price": parseInt(productPrice), "color" : colorChoice, "quantity" : parseInt(quantityChoice)});
    }
})

