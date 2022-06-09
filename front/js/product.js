import { getDataById } from "./api.js";




let productID = new URL(location).searchParams.get("id"); // Récupère l'ID du canapé dans l'URL de la page product.html

let sofa = await getDataById(productID); // Récupère les données du canapé correspondant à cet ID via l'API
showProduct(sofa); // Insère le HTML de la page canapé dans la page product.html


//Ecoute le bouton "Ajouter au panier"
document.querySelector("#addToCart").addEventListener("click", (event) => {
    let colorSelection = document.querySelector("#colors").value; // Choix utilisateur couleur
    let quantitySelection = document.querySelector("#quantity").value; // Choix utilisateur quantité
    if (colorSelection == "") { //Si couleur pas définie, message d'erreur
        alert("Veuillez choisir une couleur !");
    }
    else if (quantitySelection <= 0 || quantitySelection > 100) { // Si quantité <=0 ou <100, message d'erreur
        alert("Veuillez choisir une quantité comprise entre 1 et 100 !");
    }
    else { // Si couleur définie + quantité entre 1 et 100
        alert(`Votre commande de ${quantitySelection} ${sofa.name} couleur ${colorSelection} est ajoutée au panier !`);
        addToCart({ // On ajoute le produit au panier
            id: productID,
            "color": colorSelection,
            "quantity": parseInt(quantitySelection),
            "price" : 10 // LIGNE A SUPPRIMER
        });
    }
})


// Card d'un canapé
function showProduct(sofa) {
    document.querySelector(".item__img").innerHTML = `<img src="${sofa.imageUrl}" alt="${sofa.altTxt}">`;
    document.querySelector("#title").textContent = sofa.name;
    document.querySelector("#description").textContent = sofa.description;
    document.querySelector("#price").textContent = sofa.price;
    for (let color of sofa.colors) { // Pour chaque couleur disponible
        let productColor = document.createElement("option"); // On crée une option couleur
        document.querySelector("#colors").appendChild(productColor);
        productColor.value = color;
        productColor.innerHTML = color;
    }
}

// Ajoute un produit au panier
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart == null) { // Si le panier n'existe pas
        cart = [];
    }
    // Récupère le panier
    let foundSameProduct = cart.find(p => p.id == product.id && p.color == product.color);
    if (foundSameProduct != undefined) { // Si un produit de cette couleur existe déjà
        foundSameProduct.quantity += product.quantity; // On augmente simplement sa quantité
    }
    else {
        cart.push(product); // Si un produit de cette couleur n'existe pas déjà, on ajoute ce nouveau produit au panier
    }
    localStorage.setItem("cart", JSON.stringify(cart)); // On sauve le panier
}