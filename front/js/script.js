const apiUrl = "http://localhost:3000/api/products"; // Coordonnées de l'API

fetch(apiUrl) // Récupération des données de l'API
    .then(res => res.json())

    .then((sofaList) => { // Insertion des fiches dans index.html
        sofaList.forEach((sofa) => {
            document.querySelector(".items").innerHTML += displayProduct(sofa);
        });
    })

    .catch((err) => { // En cas d'erreur de récupération des données
        document.querySelector(".items").innerHTML += `<p>Désolé, aucun produit disponible</p>`;
        console.log(err);
    })

    const displayProduct = (sofa) => { // Création d'une fiche canapé
        return `<a href="./product.html?id=${sofa._id}">
                <article>
                <img src="${sofa.imageUrl}" alt="${sofa.altTxt}"/>
                <h3 class="productName">${sofa.name}</h3>
                <p class="productDescription">${sofa.description}</p>
                </article>
                </a>`
    }