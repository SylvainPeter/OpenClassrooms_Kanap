// Affiche le panier
let productsList = JSON.parse(localStorage.getItem("cart")); // Récupère tous les produits stockés
productsList.forEach((article) => { // Insère les produits dans la page cart.html
    document.querySelector("#cart__items").innerHTML += displayCartProducts(article);
})
updateCart(); // Affiche la quantité et le prix total du panier


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


// Card pour chaque produit
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


