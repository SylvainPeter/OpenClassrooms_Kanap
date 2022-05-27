const apiUrl = "http://localhost:3000/api/products"; // Coordonnées de l'API
const productID = new URL(location).searchParams.get("id"); // Récupération de l'ID d'un produit


let getData = async () => { // Récupération des données de tous les canapés via l'API
    fetch(apiUrl)
        .then(res => res.json())
        .then((sofaList) => { // Insertion des infos dans la page index.html
            sofaList.forEach((sofa) => {
                document.querySelector(".items").innerHTML += displayProducts(sofa);
            });
        })
        .catch((err) => { // En cas d'erreur de récupération des données
            document.querySelector(".items").innerHTML += `<p>Désolé, aucun produit disponible</p>`;
            console.log(err);
        })
}

let getDataById = async () => { // Récupération des données d'un canapé en particulier via l'API
    fetch(apiUrl + "/" + productID)
        .then(res => res.json())
        .then(sofa => showProduct(sofa))
        .catch((err) => { // En cas d'erreur de récupération des données
            console.log(err);
        })
}

let displayProducts = (sofa) => { // Structure d'une fiche canapé
    return `<a href="./product.html?id=${sofa._id}">
            <article>
            <img src="${sofa.imageUrl}" alt="${sofa.altTxt}"/>
            <h3 class="productName">${sofa.name}</h3>
            <p class="productDescription">${sofa.description}</p>
            </article>
            </a>`
}

let showProduct = (sofa) => { // Structure d'une page produit
    document.querySelector(".item__img").innerHTML = `<img src="${sofa.imageUrl}" alt="${sofa.altTxt}">`;
    document.querySelector("#title").textContent = sofa.name;
    document.querySelector("#description").textContent = sofa.description;
    document.querySelector("#price").textContent = sofa.price;
    for (let color of sofa.colors) { // Insertion des options de couleur et de quantité
        let productColor = document.createElement("option");
        document.querySelector("#colors").appendChild(productColor);
        productColor.value = color;
        productColor.innerHTML = color;
    }
}


export { getData, getDataById }