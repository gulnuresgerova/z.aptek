let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

const BASE_URL = " http://localhost:2000/products";
let flowersCard = document.querySelector(".flowers-pricing-cards");
let loadMoreBtn = document.querySelector(".load");
let search = document.querySelector(".search");
let sort = document.querySelector(".sort");

let favCount = document.querySelector(".fav-count");

let favorites = getFavoritesFromLocaleStorages();
calculateFavCount(favorites.length);

let loadCard = [];
let limit = 3;
let products = null;
let productsCopy = null;

async function getData() {
  let response = await axios(`${BASE_URL}`);
  products = response.data;
  productsCopy = structuredClone(products);
  console.log(response.data);
  loadCard = response.data;
  drawFlowers(response.data);
  drawFlowers(response.data.slice(0, limit));
}
getData();

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

    const bool = favorites.find((item) => item.id == element.id);

    favIconElement.className = !bool
      ? "fa-regular fa-heart"
      : "fa-solid fa-heart";

    favIconElement.addEventListener("click", function () {
      this.className === "fa-regular fa-heart"
        ? (this.className = "fa-solid fa-heart")
        : (this.className = "fa-regular fa-heart");
      let favoriteProducts = getFavoritesFromLocaleStorages();

      const favIndex = favoriteProducts.findIndex(
        (item) => item.id === element.id
      );

      if (favIndex === -1) {
        favoriteProducts.push(element);
      } else {
        favoriteProducts.splice(favIndex, 1);
      }

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

// LOADMORE
loadMoreBtn.addEventListener("click", function () {
  limit += 3;
  if (limit >= loadCard.length) {
    this.remove();
  }
  drawFlowers(loadCard.slice(0, limit));
});

search.addEventListener("input", function (element) {
  let filtered = products.filter((item) => {
    return item.name
      .toLocaleLowerCase()
      .includes(element.target.value.toLocaleLowerCase());
  });
  drawFlowers(filtered);
  console.log(filtered);
});

sort.addEventListener("click", function () {
  let sorted;
  if (this.innerText == "Ascending") {
    sorted = products.sort((a, b) => a.name.localeCompare(b.name));
    this.innerText = "Descending";
  } else if (this.innerText == "Descending") {
    sorted = products.sort((a, b) => b.name.localeCompare(a.name));
    this.innerText = "Default";
  } else {
    this.innerText = "Ascending";
    sorted = productsCopy;
  }
  drawFlowers(sorted);
});




