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

export { getData, getDataById }