const apiUrl = "http://localhost:3000/api/products"; // Coordonnées de l'API

// Récupère les données de tous les canapés via l'API
async function getData () {
    let data = await fetch(apiUrl)
        .then(res => res.json())
        .then(sofaList => sofaList)
        .catch((err) => { // En cas d'erreur de récupération des données
            document.querySelector(".items").innerHTML += `<p>Désolé, aucun produit disponible</p>`;
            console.log(err);
        })
    return data;
}

// Récupère les données d'un canapé particulier via l'API
async function getDataById (productID) {
    let data = await fetch(apiUrl + "/" + productID)
        .then(res => res.json())
        .then(sofa => sofa)
        .catch((err) => { // En cas d'erreur de récupération des données
            console.log(err);
        })
    return data;
}

// Poste la commande finale à l'API
async function postData (productID) {
    let data = await fetch(apiUrl + "/order", post)
        .then(res => res.json())
        .then(sofa => sofa)
        .catch((err) => { // En cas d'erreur de récupération des données
            console.log(err);
        })
        console.log(data);
    return data;
    /*  .then(responseAPI => {
    console.log("respondeAPI : "+responseAPI.orderId);
    localStorage.clear();                  
   document.location.href = `confirmation.html?orderId=${responseAPI.orderId}`;           
    })
    */
}


export { getData, getDataById, postData }

