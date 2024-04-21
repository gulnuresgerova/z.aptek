
// const basketCount = document.querySelector(".basket-count");
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

let tBody = document.querySelector("tbody");
let total = document.querySelector(".total");
// const BASE_URL = " http://localhost:8000/cofee";



let basket = getdataFromLocaleBasket();




function drawtable(data) {
    tBody.innerHTML = "";
  data.forEach((element) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `                   
    <td>${element.product.id}</td>
          <td class="basket-image"> <img src="${element.product.image} " alt=""> </td>
           <td>${element.product.title}</td>
           <td>${element.product.price}</td>
           <td class="sub-total">${element.product.price * element.count} $</td>
        <td>
            <i onclick=minusCount("${
              element.product.id
            }",this) class="fa-solid fa-minus"></i>
            <span class="count">${element.count}</span>
            <i onclick=plusCount("${
              element.product.id
            }",this) class="fa-solid fa-plus"></i>
        </td>
        <td><i onclick=deleteToData("${
          element.product.id
        }",this) class="fa-regular fa-trash-can"></i>
        </td>
    `;
        tBody.append(tr);
  });
}

drawtable(basket);

function minusCount(id, btn) {
  let product = basket.find((item) => item.product.id === id);
  --product.count;
  btn.closest("td").querySelector(".count").textContent = product.count;

  btn.closest("tr").querySelector(".sub-total").textContent = `${
    product.product.price * product.count
  } $`;
  totalCount() 
  setDataTOLocaleBasket(basket);
}
function plusCount(id, btn) {
  let product = basket.find((item) => item.product.id === id);
  ++product.count;
  btn.closest("td").querySelector(".count").textContent = product.count;
  btn.closest("tr").querySelector(".sub-total").textContent = `${
    product.product.price * product.count
  } $`;
  totalCount() 
  setDataTOLocaleBasket(basket);
}
function deleteToData(id, btn) {
  let product = basket.find((item) => item.product.id === id);
  basket = basket.filter((item) => item.product.id !== id);
  btn.closest("tr").remove();
  totalCount() 
  setDataTOLocaleBasket(basket);
}
function totalCount() {
  total.textContent = basket.reduce(
    (sum, item) => sum + item.count * item.product.price,0
  );
  setDataTOLocaleBasket(basket)
}
totalCount() 
function setDataTOLocaleBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

function getdataFromLocaleBasket() {
  return JSON.parse(localStorage.getItem("basket")) || [];
}