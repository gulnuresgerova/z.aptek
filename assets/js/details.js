let id = new URLSearchParams(window.location.search).get("id");
let details = document.querySelector(".details");
let detailsBtn = document.querySelector(".detailsBtn");
const BASE_URL = "http://localhost:2000/products";

async function getData() {
  let response = await axios(`${BASE_URL}/${id}`);
  console.log(response.data);
 
  details.innerHTML = `
          
          <div class="card">
          <div class="card-body">
       
          <img src="${response.data.images}" alt="">
          
      
  <div class="det-text">
  
  <h3 class="card-title">  Name: ${response.data.name}</h3>
  <p>${response.data.price}</p>

  <p class="text"> <p style="font-size:20px; font-weight: 700;">Additional Information:</p> 
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor accusamus eos facere asperiores. Dolorum, a. Voluptatum delectus debitis doloribus odit tempore, nesciunt explicabo eum dolore!
</p>
  
  </div>
            
          
          </div>
        </div>
          
          
          `;
}
getData();

// function drawCards(data) {
//   details.innerHTML = "";

// }

detailsBtn.addEventListener("click", function () {
  window.history.back();
});