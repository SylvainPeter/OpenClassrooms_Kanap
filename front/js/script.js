fetch("http://localhost:3000/api/products") // Récupération des données de l'API

    .then(res => res.json())

    .then((sofaList) => { // Création des éléments à afficher dans index.html
        sofaList.forEach((sofa) => {
            document.querySelector(".items").innerHTML +=
                `<a href="./product.html?id=${sofa._id}">
                 <article>
                 <img src="${sofa.imageUrl}" alt="${sofa.altTxt}"/>
                 <h3 class="productName">${sofa.name}</h3>
                 <p class="productDescription">${sofa.description}</p>
                 </article>
                 </a>`;
        });
    })

    .catch((e) => { // En cas d'erreur de récupération des données
        document.querySelector(".items").innerHTML += `<p>Désolé, aucun produit disponible</p>`;
    })
