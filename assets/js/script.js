let menu = document.querySelector("#menu-btn");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
};

const productsDiv = document.querySelector(".products");

const BASE_URL = " http://localhost:8000/cofee";
let search = document.querySelector(".search");
let sort = document.querySelector(".sort");
// let basketCount = document.querySelector(".basket-count");
let favsCount = document.querySelector(".fav-count");
// let basket = getBasketFromLocaleStroge();

// calculateCountBasket(basket.length);
// getBasketCount()

let product = [];
let dataCopy = [];
let array = null;
let arrayCopy = null;

async function getData() {
  let res = await axios(`${BASE_URL}`);
  //   console.log(res.data);
  product = res.data;
  array = res.data;
  let data = res.data;
  dataCopy = data;
  arrayCopy = structuredClone(array);
  drawCooffe(res.data);
}

getData();

function drawCooffe(data) {
  productsDiv.innerHTML = "";
  data.forEach((element) => {
    productsDiv.innerHTML += `
      <div class="products-card-one">
      <div class="image">
        <img src="${element.image}" alt="" />
        
      </div>
     <div class="yan">
     <i id="fav" onclick=addToFavs("${element.id}",this) class="fa-solid fa-heart"
    "></i>
     
    <i id="bsg" class="fa-solid fa-cart-shopping" onclick=addToBasket(${
      element.id
    },this)></i>
    
    </div>
      <div class="rg">
      <a href="./details.html?id=${element.id}" class="mug-btn">Read More</a>
      <div class="icons">
      <i class="fa-solid fa-trash fa-beat-fade" onclick=deleteBtn(${
        element.id
      },this)></i>
    <a href="../../form.html?id=${
      element.id
    }"><i class="fa-solid fa-pen-to-square fa-beat-fade"></i></a>
      </div>
  
      </div>
      <div class="products-text">
        <p class="p-title">${element.title}</p>
       
        <div class="price">
      
                  <p class="p-price-two">${element.price}</p>
                  </div>
      </div>
    </div>
      `;
  });
}

async function deleteBtn(id, btn) {
  if (confirm("silmeye eminsen")) {
    await axios.delete(`${BASE_URL}/${id}`);
  }
  btn.closest(".products").remove;
}

let basket = getdataFromLocaleBasket();

function addToBasket(id) {
  console.log("ss");
  let product = dataCopy.find((item) => item.id == id);
  let index = basket.findIndex((item) => item.product.id === id);
  console.log(index);
  if (index === -1) {
    basket.push({ count: 1, product: product });
  } else {
    basket[index].count++;
  }
  setDataTOLocaleBasket(basket);
}
function setDataTOLocaleBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

function getdataFromLocaleBasket() {
  return JSON.parse(localStorage.getItem("basket")) || [];
}

search.addEventListener("input", function (element) {
  let filtered = array.filter((item) => {
    return item.title
      .toLocaleLowerCase()
      .includes(element.target.value.toLocaleLowerCase());
  });
  drawCooffe(filtered);
  console.log(filtered);
});

sort.addEventListener("click", function () {
  let sorted;
  if (this.innerText == "Ascending") {
    sorted = array.sort((a, b) => a.title.localeCompare(b.title));
    this.innerText = "Descending";
  } else if (this.innerText == "Descending") {
    sorted = array.sort((a, b) => b.title.localeCompare(a.title));
    this.innerText = "Default";
  } else {
    this.innerText = "Ascending";
    sorted = arrayCopy;
  }
  drawCooffe(sorted);
});

