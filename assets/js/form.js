let allInput = document.querySelectorAll("input");
let form = document.querySelector("form");
const BASE_URL = " http://localhost:8000/cofee";
const id = new URLSearchParams(window.location.search).get("id");

async function formData() {
  let response = await axios(`${BASE_URL}/${id}`);
  allInput[1].value = response.data.title;
  allInput[2].value = response.data.price;
}
if (id) {
  formData();
}

form.addEventListener("submit",  function (e) {
  e.preventDefault();
  console.log("aaaaaaaaaaaaaaa");
  let newObject = {
    image: `./images/${allInput[0].value.split("\\")[2]}`,
    title: allInput[1].value,
    price: allInput[2].value,
  };

  if (!id) {
    if (
      allInput[0] != "" &&
      allInput[1].value != "" &&
      allInput[2].value != ""
    ) {
         axios.post(`${BASE_URL}`,newObject)
    }else{
      window.alert("inputlari doldur")
    }
  }else{
    axios.patch(`${BASE_URL}/${id}` ,newObject)

  }
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
