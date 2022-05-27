import { getDataById } from "./api.js";

let colorSelection = document.querySelector("#colors"); // Choix couleur
let quantitySelection = document.querySelector("#quantity"); // Choix quantité


getDataById(); // Récupération des données du canapé


document.querySelector("#addToCart").addEventListener("click", (event) => { //Ecoute le bouton "Ajouter au panier"
    if (colorSelection.value == "") { //Si couleur pas définie, message d'erreur
        alert("Veuillez choisir une couleur !");
    }
    else if (quantitySelection.value == 0 || quantitySelection.value > 100) { // Si quantité =0 ou <100, message d'erreur
        alert("Veuillez choisir une quantité entre 1 et 100 !");
    }
    else { // Si couleur définie + quantité entre 1 et 100, ajout du produit au panier
        addProductToCart();
    }
})

let addProductToCart = () => { // Ajoute le produit au panier
    let productChoice = document.querySelector("#title").textContent;
    let colorChoice = document.querySelector("#colors").value;
    let quantityChoice = document.querySelector("#quantity").value;
    alert(`Votre commande de ${quantityChoice} ${productChoice} couleur ${colorChoice} est ajoutée au panier !`)
}
