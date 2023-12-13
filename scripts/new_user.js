"use strict";

window.onload = () => {
  let name = document.getElementById("name");
  let username = document.getElementById("username");
  let password = document.getElementById("password");
  let confirmPassword = document.getElementById("confirmPassword");
  let addForm = document.getElementById("addForm");
  let resultContainer = document.getElementById("resultContainer");

  const API_BASE_URL = "http://localhost:8083/api";

  addForm.addEventListener("submit", addUser);

  function addUser(e) {
    e.preventDefault();
    let nameVal = name.value;
    let usernameVal = username.value;
    let passwordVal = password.value;
    let confirmPasswordVal = confirmPassword.value;

    if (passwordVal !== confirmPasswordVal) {
      return alert("passwords must match");
    }

    const data = {
      name: nameVal,
      username: usernameVal,
      password: passwordVal,
    };

    fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data?.error) return alert(data.error);
        // add info to result container
        resultContainer.innerHTML = `
                <p>successfully added user!</p>
                <p>id:${data.id}</p>
                <p>name:${data.name}
                <p>username:${data.username}</p>
            
            `;
      })
      .catch((error) => console.error("Error adding user", error));
  }
};
