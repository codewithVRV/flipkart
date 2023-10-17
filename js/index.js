// console.log("Index.js added ")


async function fetchCategories () { // every function returns a promise;
    const response = await fetch("https://fakestoreapi.com/products/categories");
    const data = await response.json();
    // console.log(data);
    return data;
}



async function populateCategories () {
    const categories = await fetchCategories();

    removeLoader()

    const categoryList = document.getElementById("categoryList");
    categoryList.classList.add("category-list", "d-flex", "flex-row", "justify-content-between", "align-items-center")
    categories.forEach ( category => {

        const categoryHolder = document.createElement("div");
        const categoryLink = document.createElement("a");
        categoryLink.href = `productList.html?category=${category}`
        categoryLink.textContent = category.charAt(0).toUpperCase() + category.slice (1);
        categoryHolder.classList.add("category-item");
        categoryHolder.appendChild(categoryLink);
        categoryList.appendChild(categoryHolder);

    })

}

populateCategories();