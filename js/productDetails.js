console.log("ja added");
document.addEventListener("DOMContentLoaded", () => {
    async function populateProduct () {
        const queryParams = getQueryParams();
        if(queryParams['id']){
            const productId = queryParams['id'];
            const product = await fetchProductById(productId);
            removeLoader()
            

            const productDescription = document.getElementById("product-desc")
            const productInfo = document.getElementById("product-info")
            const productPrice = document.getElementById("product-price")
            const productName = document.getElementById("product-name")

            const productImage = document.getElementById("product-img");

            productImage.src = product.image;

            productName.textContent = product.title;
            productDescription.textContent = product.description;

            productInfo.textContent = product.title;

            productPrice.textContent = "$ " + product.price;



        }
    }
    populateProduct();


})