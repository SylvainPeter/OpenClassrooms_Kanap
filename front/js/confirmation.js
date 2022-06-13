let orderId = new URL(location).searchParams.get("orderId"); // Récupère l'ID du canapé dans l'URL de la page product.html

document.querySelector("#orderId").innerHTML = orderId; // Hydrate la page confirmation.js