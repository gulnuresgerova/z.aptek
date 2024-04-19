const BASE_URL = " http://localhost:2000/products";
let flowersCard = document.querySelector(".flowers-pricing-cards");
let favCount = document.querySelector(".fav-count");


let favorites = getFavoritesFromLocaleStorages();
calculateFavCount(favorites.length);
drawFlowers(favorites)

function drawFlowers(data) {
    flowersCard.innerHTML = "";
    data.forEach((element) => {
      const pricingCardDiv = document.createElement("div");
      pricingCardDiv.className = "pricing-card";
  
      const pricingImageDiv = document.createElement("div");
      pricingImageDiv.className = "pricing-image";
  
      const pricingImage = document.createElement("img");
      pricingImage.src = element.images;
  
      const pricingName = document.createElement("p");
      pricingName.textContent = element.name;
  
      const pricingPrice = document.createElement("p");
      pricingPrice.textContent = `${element.price}`;
  
      const readMore = document.createElement("a");
      readMore.href = `details.html?id=${element.id}`;
      readMore.innerText = "Read More";
  
      // FAVORITES
      const favIconElement = document.createElement("i");
      favIconElement.className = "fa-solid fa-heart";
    
 
  
      favIconElement.addEventListener("click", function () {
        favorites = favorites.filter((item) => item.id !== element.id);
        setProductToLocaleStorage(favorites);
        pricingCardDiv.remove();
        let favoriteProducts = getFavoritesFromLocaleStorages();

  
        setProductToLocaleStorage(favoriteProducts);
        calculateFavCount(favoriteProducts.length);
      });
  
      pricingImageDiv.append(pricingImage, favIconElement);
      pricingCardDiv.append(pricingImageDiv, readMore, pricingName, pricingPrice);
      flowersCard.append(pricingCardDiv);
    });
  }


  function setProductToLocaleStorage(products) {
    localStorage.setItem("favs", JSON.stringify(products));
  }
  
  function getFavoritesFromLocaleStorages() {
    return JSON.parse(localStorage.getItem("favs")) ?? [];
  }
  
  function calculateFavCount(count) {
    favCount.textContent = count;
  }