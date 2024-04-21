let id = new URLSearchParams(window.location.search).get("id");

console.log(id);
const details = document.querySelector(".details");
const goback = document.querySelector(".goback");
const BASE_URL = " http://localhost:8000/cofee";

fetch(`${BASE_URL}/${id}`)
  .then((res) => res.json())
  .then((el) => {
    details.innerHTML = `
    <div class="box">
    <div class="box-img"><img src="${el.image}" alt=""></div>
    <div class="box-body">
        <p class="title">${el.title} <br> <br>  
        Ilfo: <br>
        promotes calcium absorption in the gut and maintains adequate serum calcium and phosphate concentrations to enable normal bone mineralization and to prevent hypocalcemic tetany</p>
       
    </div>
    <div class="box-price">
        <p>$${el.price}</p>
    </div>
</div>
    
    `;
  });

goback.addEventListener("click", function () {
  window.history.back();
});

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
