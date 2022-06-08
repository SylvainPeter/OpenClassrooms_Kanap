import { getDataById } from "./api.js";


// Affiche le panier
let productsList = JSON.parse(localStorage.getItem("cart")); // Récupère tous les produits stockés


// Génère le HTML
let allProducts = ""; // string vide
productsList.forEach((article) => { // pour chaque produit du panier
    let data = getDataById(article.id); // recupère data du canapé via l'API
    allProducts += displayCartProducts(article, data); // appelle function et rajoute le HTML à la string
})

// Hydrate la page cart.html
document.querySelector("#cart__items").innerHTML += allProducts;
// Affiche la quantité et le prix total du panier
updateCart();


// Ecoute des champs "Quantité"
let quantityForms = document.querySelectorAll(".itemQuantity");
quantityForms.forEach((form, index) => {
    form.addEventListener("change", () => {
        let newQuantity = parseInt(form.value);
        if (newQuantity <= 0 || newQuantity > 100) { // Si quantité <=0 ou <100, message d'erreur
            alert("Veuillez choisir une quantité entre 1 et 100 !");
        }
        else {
            changeQuantity(index, newQuantity); // Définit la nouvelle quantité
            updateCart(); // Met à jour le total
        }
    })
})

// Ecoute des boutons "Supprimer"
let deleteButtons = document.querySelectorAll(".deleteItem");
deleteButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        removeFromCart(index); // Supprime le produit
        updateCart(); // Met à jour le total
    })
})

// Surveille les champs du formulaire
let firstName = document.querySelector("#firstName");
let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
let lastName = document.querySelector("#lastName");
let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
let address = document.querySelector("#address");
let addressErrorMsg = document.querySelector("#addressErrorMsg");
let city = document.querySelector("#city");
let cityErrorMsg = document.querySelector("#cityErrorMsg");
let email = document.querySelector("#email");
let emailErrorMsg = document.querySelector("#emailErrorMsg");
let regex1 = /^[a-zA-ZÀ-ÿ]*$/;
let regex2 = /^[0-9]{1,4}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;
let regex3 = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

firstName.addEventListener("change", () => { // Contrôle le champ Prénom
    if (regex1.test(firstName.value)) {
        firstNameErrorMsg.innerHTML = " ";
    }
    else {
        firstNameErrorMsg.innerHTML = "Veuillez entrer le prénom au format correct";
    }
})

lastName.addEventListener("change", () => { // Contrôle le champ Nom
    if (regex1.test(lastName.value)) {
        lastNameErrorMsg.innerHTML = " ";
    }
    else {
        lastNameErrorMsg.innerHTML = "Veuillez entrer le nom au format correct";
    }
})

address.addEventListener("change", () => { // Contrôle le champ Adresse
    if (regex2.test(address.value)) {
        addressErrorMsg.innerHTML = " ";
    }
    else {
        addressErrorMsg.innerHTML = "Veuillez entrer l'adresse au format correct";
    }
})

city.addEventListener("change", () => { // Contrôle le champ Ville
    if (regex1.test(city.value)) {
        cityErrorMsg.innerHTML = " ";
    }
    else {
        cityErrorMsg.innerHTML = "Veuillez entrer la ville au format correct";
    }
})

email.addEventListener("change", () => { // Contrôle le champ Email
    if (regex3.test(email.value)) {
        emailErrorMsg.innerHTML = " ";
    }
    else {
        emailErrorMsg.innerHTML = "Veuillez entrer l'adresse email au format correct";
    }
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
    let totalNumber = 0;
    for (let product of productsList) {
        totalNumber += product.quantity;
    }
    return totalNumber;
}

// Retourne le prix total du panier
function getTotalPrice() {
    let totalPrice = 0;
    for (let product of productsList) {
        totalPrice += product.quantity * product.price;
    }
    return totalPrice;
}


