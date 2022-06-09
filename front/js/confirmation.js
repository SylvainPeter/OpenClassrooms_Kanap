let orderId = new URL(location).searchParams.get("orderId"); // Récupère l'ID du canapé dans l'URL de la page product.html
let orderConfirmation = document.querySelector("#orderId");

orderConfirmation.innerHTML = orderId;