const url = "https://61e1c0413050a10017681fb6.mockapi.io/pedidos";

const d = document;

const $postList = d.querySelector(".post-list");
const $addPostForm = d.querySelector(".add-post-form");
const $nameValue = d.getElementById("name-value");
const $amountValue = d.getElementById("amount-value");
const $locationValue = d.getElementById("loc-value");

const btnSubmit = d.querySelector(".btn");
let output = "";
let id = Math.random();

const renderPost = (posts) => {
  posts.forEach((post) => {
    output += `
        <div class="card mt-4 col-md-6 bg-ligt ">
          <div class="card-body" data-id=${post.id}>
            <h5 class="card-title name">${post.nombre}</h5>
            <h6 class="card-subtitle mb-2 text-muted amount">${post.cantidad}</h6>
            <p class="card-title location">${post.ubicacion}</p>
            <a href="#" class="btn btn-primary" id="edit-post">Editar</a>
            <a href="#" class="btn btn-primary" id="delete-post">Despachar</a>
          </div>
        </div>
`;
  });
  $postList.innerHTML = output;
};

fetch(url)
  .then((res) => res.json())
  .then((data) => renderPost(data));

$postList.addEventListener("click", (e) => {
  e.preventDefault();

  let delButonIsPressed = e.target.id == "delete-post";
  let editButonIsPressed = e.target.id == "edit-post";
  let id = e.target.parentElement.dataset.id;

  if (editButonIsPressed) {
    const parent = e.target.parentElement;
    let nameContent = parent.querySelector(".name").textContent;
    let amountContent = parent.querySelector(".amount").textContent;
    let locationContent = parent.querySelector(".location").textContent;
    

    $nameValue.value = nameContent;
    $amountValue.value = amountContent;
    $locationValue.value = locationContent;
   
  }

  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: $nameValue.value,
        cantidad: $amountValue.value,
        ubicacion: $locationValue.value,
        
      }),
    })
      .then((res) => res.json())
      .then(() => location.reload());
  });

  if (delButonIsPressed) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => location.reload());
  }
});

$addPostForm.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      nombre: $nameValue.value,
      cantidad: $amountValue.value,
      ubicacion: $locationValue.value,
      
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      let dataArr = [];
      dataArr.push(data);
      renderPost(dataArr);
    });
  $nameValue.value = "";
  $amountValue.value = "";
  $locationValue.value = "";
  
});
