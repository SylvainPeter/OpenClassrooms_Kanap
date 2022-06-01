let list = JSON.parse(localStorage.getItem("cart"));


// Insertion des données dans la page index.html
list.forEach((article) => {
    document.querySelector("#cart__items").innerHTML += displayCartProducts(article);
})


function displayCartProducts (article) { // Structure d'une fiche canapé
    return `<article class="cart__item" data-id="${article.id}" data-color="${article.color}">
    <div class="cart__item__img">
        <img src="${article.imageUrl}" alt="${article.altTxt}">
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${article.name}</h2>
            <p>${article.color}</p>
            <p id="article__price">${article.totalPrice} €</p>
        </div>
    <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
            <p>Qté : ${article.quantity}</p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
        </div>
    </div>
    </div>
 </article>`;
}


// FONCTIONS DU PANIER



// Supprime un produit du panier
function removeFromCart(product) {
    let cart = getCart();
    cart = cart.filter(p => p.id != product.id);
    saveCart(cart);
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


