import { getDataById, postData } from "./api.js";

let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
let addressErrorMsg = document.querySelector("#addressErrorMsg");
let cityErrorMsg = document.querySelector("#cityErrorMsg");
let emailErrorMsg = document.querySelector("#emailErrorMsg");
let stringRegex = /^[a-zA-ZÀ-ÿ]*$/;
let addressRegex = /^[0-9]{1,4}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;
let emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;
let products = [];
let totalPrice = 0;
let totalQuantity = 0;
let productsList = JSON.parse(localStorage.getItem("cart")); // Récupère tous les produits stockés dans le panier

// Hydrate la page cart.html
document.querySelector("#cart__items").innerHTML += await createCartHtml();
updateCartTotal(); // Met à jour le total affiché


// Ecoute des champs "Quantité"
document.querySelectorAll(".itemQuantity").forEach((form, index) => {
    form.addEventListener("change", () => {
        let newQuantity = parseInt(form.value);
        if (newQuantity <= 0 || newQuantity > 100) { // Si quantité <=0 ou <100, message d'erreur
            alert("Veuillez choisir une quantité entre 1 et 100 !");
        }
        else {
            changeQuantity(index, newQuantity); // Définit la nouvelle quantité
            updateCartTotal(); // Met à jour le total affiché
        }
    })
})

// Ecoute des boutons "Supprimer"
document.querySelectorAll(".deleteItem").forEach((button, index) => {
    button.addEventListener("click", () => {
        removeFromCart(index); // Supprime le produit
        updateCartTotal(); // Met à jour le total affiché
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

    productsList.forEach((article) => { // Récupère l'Id de tous les produits du panier
        products.push(article.id);
    });

    let orderId = { contact, products }; // La commande finale

    postData(orderId); // Envoi de la commande finale à l'API
})


// FONCTIONS

// Récupère les données du panier
async function createCartHtml() {
    let cartHtml = "";
    for (const article of productsList) {
        let data = await getDataById(article.id); // Recupère data des canapés via l'API
        cartHtml += displayCartProducts(article, data); // Rajoute le HTML à cartHtml
    }
    return cartHtml;
}

// Card pour chaque produit
function displayCartProducts(article, data) {
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
    localStorage.setItem("cart", JSON.stringify(productsList)); // On sauvegarde le nouveau panier
    document.location.reload(); // On actualise la page cart.html
}

// Change la quantité d'un produit
function changeQuantity(product, quantity) {
    productsList[product].quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(productsList)); // On sauvegarde le nouveau panier
}

// Affiche la quantité et le prix total du panier
async function updateCartTotal() {
    let quantityArray = productsList.map(element => { return element.quantity }); // Crée un tableau des quantités
    if (quantityArray.length > 0) { // Si la quantité est supérieure à 0
        totalQuantity = quantityArray.reduce((acc, x) => acc + x) // On calcule le total de la quantité
        for (const article of productsList) { // On récupère le prix des canapés via l'API
            let data = await getDataById(article.id);
            totalPrice += data.price * article.quantity; // On calcule le prix total du panier
        }
    }
    document.querySelector("#totalQuantity").innerHTML = totalQuantity; // On affiche la quantité totale
    document.querySelector("#totalPrice").innerHTML = totalPrice; // On affiche le prix total
}


