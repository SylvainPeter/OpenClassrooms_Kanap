import { getDataById, postData } from "./api.js";

let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
let addressErrorMsg = document.querySelector("#addressErrorMsg");
let cityErrorMsg = document.querySelector("#cityErrorMsg");
let emailErrorMsg = document.querySelector("#emailErrorMsg");
let stringRegex = /^[a-zA-ZÀ-ÿ]*$/;
let addressRegex = /^[0-9]{1,4}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;
let emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
let allProducts = "";
let productsList = JSON.parse(localStorage.getItem("cart")); // Récupère tous les produits stockés dans le panier


// Génère le HTML
productsList.forEach((article) => { // pour chaque produit du panier
    let data = getDataById(article.id); // recupère data du canapé via l'API
    allProducts += displayCartProducts(article, data); // appelle function et rajoute le HTML à la string
})

// Hydrate la page cart.html
document.querySelector("#cart__items").innerHTML += allProducts;
updateCart(); // Met à jour le total affiché


// Ecoute des champs "Quantité"
document.querySelectorAll(".itemQuantity").forEach((form, index) => {
    form.addEventListener("change", () => {
        let newQuantity = parseInt(form.value);
        if (newQuantity <= 0 || newQuantity > 100) { // Si quantité <=0 ou <100, message d'erreur
            alert("Veuillez choisir une quantité entre 1 et 100 !");
        }
        else {
            changeQuantity(index, newQuantity); // Définit la nouvelle quantité
            updateCart(); // Met à jour le total affiché
        }
    })
})

// Ecoute des boutons "Supprimer"
document.querySelectorAll(".deleteItem").forEach((button, index) => {
    button.addEventListener("click", () => {
        removeFromCart(index); // Supprime le produit
        updateCart(); // Met à jour le total affiché
    })
})

// Ecoute les champs du formulaire
document.querySelector("#firstName").addEventListener("change", () => { // Contrôle le champ Prénom
    if (stringRegex.test(firstName.value)) {
        firstNameErrorMsg.innerHTML = "";
    }
    else {
        firstNameErrorMsg.innerHTML = "Veuillez entrer le prénom au format correct";
    }
})
document.querySelector("#lastName").addEventListener("change", () => { // Contrôle le champ Nom
    if (stringRegex.test(lastName.value)) {
        lastNameErrorMsg.innerHTML = "";
    }
    else {
        lastNameErrorMsg.innerHTML = "Veuillez entrer le nom au format correct";
    }
})
document.querySelector("#address").addEventListener("change", () => { // Contrôle le champ Adresse
    if (addressRegex.test(address.value)) {
        addressErrorMsg.innerHTML = "";
    }
    else {
        addressErrorMsg.innerHTML = "Veuillez entrer l'adresse au format correct";
    }
})
document.querySelector("#city").addEventListener("change", () => { // Contrôle le champ Ville
    if (stringRegex.test(city.value)) {
        cityErrorMsg.innerHTML = "";
    }
    else {
        cityErrorMsg.innerHTML = "Veuillez entrer la ville au format correct";
    }
})
document.querySelector("#email").addEventListener("change", () => { // Contrôle le champ Email
    if (emailRegex.test(email.value)) {
        emailErrorMsg.innerHTML = "";
    }
    else {
        emailErrorMsg.innerHTML = "Veuillez entrer l'adresse email au format correct";
    }
})

// Surveille le bouton "Commander"
document.querySelector("#order").addEventListener("click", (event) => {
    event.preventDefault();
    let contact = { // Récupère le contenu du formulaire
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    };

    let products = []; // Récupère l'Id de tous les produits du panier
    productsList.forEach((article) => {
        products.push(article.id);
    });

    let orderId = { contact, products }; // La commande finale

    postData(orderId); // Envoi de la commande finale à l'API
})


// FONCTIONS

// Card pour chaque produit
function displayCartProducts(article, data) {
    console.log(data); // pending ????
    return `<article class="cart__item" data-id="${article.id}" data-color="${article.color}">
    <div class="cart__item__img">
        <img src="${data.imageUrl}" alt="${data.altTxt}">
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${data.name}</h2>
            <p>${article.color}</p>
            <p id="article__price">${data.price} €</p>
        </div>
    <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
            <p>Qté :</p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
        </div>
    </div>
    </div>
 </article>`;
}

// Supprime un produit du panier
function removeFromCart(index) {
    productsList.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(productsList)); // On sauve le nouveau panier
    location.reload(); // On actualise la page cart.html
}

// Change la quantité d'un produit
function changeQuantity(product, quantity) {
    productsList[product].quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(productsList)); // On sauve le nouveau panier
}

// Affiche la quantité et le prix total du panier
function updateCart() {
    document.querySelector("#totalQuantity").innerHTML = getNumberProduct();
    document.querySelector("#totalPrice").innerHTML = getTotalPrice();
}

// Retourne le nombre de produits dans le panier
function getNumberProduct() {
    let totalNumber = 0; // on initialise le total
    for (let product of productsList) { // pour chaque produit
        totalNumber += product.quantity; // on récupère la quantité et on l'ajoute au total
    }
    return totalNumber; // on envoie le total
}

// Retourne le prix total du panier
function getTotalPrice() {
    let totalPrice = 0;
    for (let product of productsList) {
        totalPrice += product.quantity * product.price;
    }
    return totalPrice;
}


