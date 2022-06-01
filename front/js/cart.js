// FONCTIONS DU PANIER

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
        foundSameProduct.quantity += product.quantity; // on augmente sa quantité
    }
    else {
        cart.push(product); // si un produit de cette couleur n'existe pas, on ajoute nouveau produit au panier
    }
    saveCart(cart); // on sauve le panier
}

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
*/

// Retourne le nombre de produits dans le panier
function getNumberProduct() {
    let cart = getCart();
    let number = 0;
    for (let product of cart) {
        number += product.quantity;
    }
    return number;
}

// Retourne le prix total du panier
function getTotalPrice() {
    let cart = getCart();
    let total = 0;
    for (let product of cart) {
        total += product.quantity * product.price;
    }
    return total;
}

export { addToCart }
