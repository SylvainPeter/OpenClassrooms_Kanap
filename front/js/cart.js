let productsList = JSON.parse(localStorage.getItem("cart")); // Récupération des articles du panier


// Insertion du contenu du panier dans la page cart.html
productsList.forEach((article) => {
    document.querySelector("#cart__items").innerHTML += displayCartProducts(article);
})


// Ecoute tous les boutons "Supprimer"
let deleteButton = document.querySelectorAll(".deleteItem");
deleteButton.forEach((button, i) => {
    button.addEventListener("click", () => {
        removeFromCart(i);
    })
})


// Ecoute du champ "Quantité"
let quantityForm = document.querySelectorAll(".itemQuantity");
quantityForm.forEach((form, i) => {
    form.addEventListener("change", () => {
        let newQuantity = form.value;
        changeQuantity(i, newQuantity);
    })
})


// Structure de l'affichage d'un article
function displayCartProducts(article) {
    return `<article class="cart__item" data-id="${article.id}" data-color="${article.color}">
    <div class="cart__item__img">
        <img src="${article.imageUrl}" alt="${article.altTxt}">
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${article.name}</h2>
            <p>${article.color}</p>
            <p id="article__price">${article.price} €</p>
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
function removeFromCart(i) {
    productsList.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(productsList)); // On sauve le panier
    location.reload();
}

// Change la quantité d'un produit
function changeQuantity(product, quantity) {
    productsList[product].quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(productsList)); // On sauve le panier
}



/* Change la quantité d'un produit
function changeQuantity(product, quantity) {
    let cart = getCart(); // récupère panier
    let foundProduct = cart.find(p => p.id == product.id); // vérifie si le produit existe déjà
    if (foundProduct != undefined) {  // s'il est déjà défini
        foundProduct.quantity += quantity;  // on augmente sa quantité
        if (foundProduct.quantity <= 0) {  // si la quantité est <=0
            removeFromCart(foundProduct); // on le supprime
        }
        else {
            saveCart(cart); // on sauve le panier
        }
    }
}

// Retourne le nombre de produits dans le panier
function getNumberProduct() {
    let cart = getCart();
    let number = 0;
    for (let product of cart) {
        number += product.quantity;
    }
    return number;
}
*/

// Retourne le prix total du panier
function getTotalPrice() {
    let cart = getCart();
    let total = 0;
    for (let product of cart) {
        total += product.quantity * product.price;
    }
    return total;
}


