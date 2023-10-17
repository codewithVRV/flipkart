

console.log("javaScript loaded")
// once the all content is loaded then js will going to execute the logic;


document.addEventListener("DOMContentLoaded", async () => {

    async function fetchProducts () {
        const response = await axios.get("https://fakestoreapi.com/products");
        console.log(response.data)
        return response.data;
    }

    async function fetchProductsByCategory (category) {
        const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`)
        return response.data;
    }
    const downloadProducts = await fetchProducts();
    // fetchProducts();

    async function populateProducts (flag, customProducts) {
        let products = customProducts;
        const queryParamsObject = getQueryParams ();

        if(flag == false){
            console.log(queryParamsObject['category']);
            if(queryParamsObject["category"]){
                products = await fetchProductsByCategory(queryParamsObject["category"])
            }
            else{
                products = await fetchProducts();

            }

        }
        const productList = document.getElementById("productList");

        products.forEach(product => {

            const imageInsideProductImage = document.createElement("img");
            imageInsideProductImage.src = product.image;

            const productImage = document.createElement("div");
            productImage.classList.add("product-img");


            productImage.appendChild(imageInsideProductImage);


            const productName = document.createElement("div");
            productName.classList.add("product-name", "text-center")
            productName.textContent = product.title.substring(0, 11) + "...";


            const productPrice = document.createElement("div");
            productPrice.classList.add("product-price", "text-center")
            productPrice.textContent = `$ ${product.price}`

          


            const productItem = document.createElement("a");
            productItem.href = `productDetails.html?id=${product.id}`;
            productItem.target = "_blank";
            productItem.classList.add("product-item", "text-decoration-none", "d-inline-block");


            productItem.appendChild(productImage)
            productItem.appendChild(productName)
            productItem.appendChild(productPrice)

            productList.appendChild(productItem)
        });
    }

    // for categories

    async function fetchCategories () {
        const response = await fetch("https://fakestoreapi.com/products/categories");
        const data = await response.json();
        return data;
    }

    async function populateCategory () {
        const categories = await fetchCategories();
        const categoryList = document.getElementById("categoryList");
        categories.forEach(category  => {
            const categoryLink = document.createElement("a");
            categoryLink.classList.add("d-flex", "text-decoration-none");
            categoryLink.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            categoryLink.href = `productList.html?category=${category}`

            categoryList.appendChild(categoryLink);
        })
    }


    
    async function downloadAndPopulate () {
        Promise.all([populateProducts(false), populateCategory()])
        .then(() => {
            removeLoader()
        })
        
    }

    downloadAndPopulate()



    const filterSearch = document.getElementById("search");
    filterSearch.addEventListener("click", async () => {
        const productList = document.getElementById("productList");
        const minPrice = Number(document.getElementById("minPrice").value);
        const maxPrice = Number(document.getElementById("maxPrice").value);

        const products = downloadProducts;
        filterProducts = products.filter(product => product.price > minPrice && product.price < maxPrice);
        // console.log(filterProducts)
        productList.innerHTML = "";
        populateProducts(true,filterProducts)

    });

    const clearFilter = document.getElementById("clear");
    clearFilter.addEventListener("click", () => {
        window.location.reload();
    })

})