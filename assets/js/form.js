const BASE_URL = "http://localhost:2000/products";
let tbody = document.querySelector("tbody");
let submit = document.querySelector(".submit");
let form = document.querySelector("form");
let allInputs = document.querySelectorAll("input");
async function getDataTable() {
  let response = await axios(`${BASE_URL}`);

  console.log(response.data);
  dataTable(response.data);
}
getDataTable();

function dataTable(data) {
  tbody.innerHTML = "";
  data.forEach((element) => {
    let trElem = document.createElement("tr");
    trElem.innerHTML += `
    
    <td>${element.id}</td>
    <td><img src="${element.images}" alt=""></td>
    <td>${element.name}</td>
    <td>${element.price}</td>
    <td>  Lorem ipsum dolor sit amet.</td>
    <td>
    <i class="fa-solid fa-trash fa-beat" onclick=deleteIcon(${element.id},this)></i>
    <i class="fa-solid fa-pen-to-square fa-beat"  onclick=editIcon(${element.id},this) data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"></i>
    </td>
    
    
    `;
    tbody.append(trElem);
  });
}

async function deleteIcon(id, btn) {
  if (confirm("Do you want to delete")) {
    btn.closest("tr");

    await axios.delete(`${BASE_URL}/${id}`);
  }
}

let editStatus = false;
let elId;
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let newObj = {
    images: `./assets/image/${allInputs[0].value.split("\\")[2]}`,
    name: allInputs[1].value,
    price: allInputs[2].value,
  };
  console.log(newObj);
 
  if (!editStatus) {
    await axios.post(`${BASE_URL}`, newObj);
   
  } else{
    await axios.patch(`${BASE_URL}/${elId}`, newObj);
  }
  
});




async function editIcon(id, btn) {
  editStatus=true;
  elId = id;
  let res = await axios(`${BASE_URL}/${id}`);
  allInputs[0].value = "";
  allInputs[1].value = "";
  allInputs[2].value = "";
  let data = res.data;
  submit.innerText = "Edit";
  console.log(id);
  console.log(allInputs[0]);
  //   allInputs[0].value = data.image;
  allInputs[1].value = data.name;
  allInputs[2].value = data.price;



  
}