class Article {
    constructor(jsonArticle) {
        jsonArticle && Object.assign(this, jsonArticle);
    }
}

fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(jsonListArticle => {
        for (let jsonArticle of jsonListArticle) {
            let article = new Article(jsonArticle);
            document.querySelector(".items").innerHTML +=
                `<a href="http://localhost:3000/api/products/${article._id}">
                <article>
                  <img src="${article.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
                  <h3 class="productName">${article.name}</h3>
                  <p class="productDescription">${article.description}</p>
                </article>
              </a>`;
        }
    })