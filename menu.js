const url = "https://61e1c0413050a10017681fb6.mockapi.io/products";

const d = document;

const $postList = d.querySelector(".post-list");
const $addPostForm = d.querySelector(".add-post-form");
const $nameValue = d.getElementById("name-value");
const $priceValue = d.getElementById("price-value");
const $descValue = d.getElementById("desc-value");
const $urlValue = d.getElementById("url-value");
const btnSubmit = d.querySelector(".btn");
let output = "";
let id = Math.random();

const renderPost = (posts) => {
  posts.forEach((post) => {
    output += `
        <div class="card mt-4 col-md-6 bg-ligt ">
          <img src=${post.url} class="" alt="" width="100%" 
          height="400"">
          <div class="card-body" data-id=${post.id}>
            <h5 class="card-title name">${post.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted price">${post.price}</h6>
            <p class="card-title desc">${post.description}</p>
            <p class="card-title url">${post.url}</p>
            <a href="#" class="btn btn-primary" id="edit-post">Editar</a>
            <a href="#" class="btn btn-primary" id="delete-post">Eliminar</a>
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
    let priceContent = parent.querySelector(".price").textContent;
    let descContent = parent.querySelector(".desc").textContent;
    let urlContent = parent.querySelector(".url").textContent;
    
    $nameValue.value = nameContent;
    $priceValue.value = priceContent;
    $descValue.value = descContent;
    $urlValue.value = urlContent;
   
  }

  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        
        name: $nameValue.value,
        price: $priceValue.value,
        description: $descValue.value,
        url: $urlValue.value,
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
      name: $nameValue.value,
      price: $priceValue.value,
      desc: $descValue.value,
      url: $urlValue.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      let dataArr = [];
      dataArr.push(data);
      renderPost(dataArr);
    });
  $nameValue.value = "";
  $priceValue.value = "";
  $descValue.value = "";
  $urlValue.value = "";
});
