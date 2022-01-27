console.log("start");
const d = document;
const $postList = d.querySelector(".post-list");
const $addPostForm = d.querySelector(".add-post-form");
const $userNameValue = d.getElementById("username-value");
const $nameValue = d.getElementById("name-value");
const $emailValue = d.getElementById("email-value");
const $passwordValue = d.getElementById("password-value");
const btnSubmit = d.querySelector(".btn");
let output = "";
let id = Math.random();

const url = "https://61e1c0413050a10017681fb6.mockapi.io/users";

const renderPost = (posts) => {
  posts.forEach((post) => {
    output += `
        <div class="card mt-4 col-md-6 bg-ligt">
          <div class="card-body" data-id=${post.id}>
            <h5 class="card-title name">${post.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${post.id}</h6>
            <p class="card-title username">${post.username}</p>
            <p class="card-title email">${post.email}</p>
            <p class="card-title password">${post.password}</p>
            <a href="#" class="btn btn-primary" id="edit-post">Editar</a>
            <a href="#" class="btn btn-primary" id="delete-post">Eliminar</a>
          </div>
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
    let userNameContent = parent.querySelector(".username").textContent;
    let nameContent = parent.querySelector(".name").textContent;
    let emailContent = parent.querySelector(".email").textContent;
    let passwordContent = parent.querySelector(".password").textContent;

    $userNameValue.value = userNameContent;
    $nameValue.value = nameContent;
    $emailValue.value = emailContent;
    $passwordValue.value = passwordContent;
  }

  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: $userNameValue.value,
        name: $nameValue.value,
        email: $emailValue.value,
        password : $passwordValue.value,
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
      id : id,
      username : $nameValue.value,
      name : $userNameValue.value, 
      email: $emailValue.value,
      password: $passwordValue.value,

    }),
  })
    .then((res) => res.json())
    .then((data) => {
      let dataArr = [];
      dataArr.push(data);
      renderPost(dataArr);
    });
  $userNameValue.value = "";
  $nameValue.value = "";
  $emailValue.value = "";
  $passwordValue.value = "";
});
