"use strict"

window.onload = () => {
    fetchUserApi();

}

function fetchUserApi(){
    fetch(`http://localhost:8083/api/users`)
    .then(res => res.json())
    .then(users => displayDropDown(users))
    .catch(err => {
        console.error(`THIS IS NOT FETCHING THE USERS API`, err)
    })
}

function displayDropDown(users){
    let userDropDown = document.getElementById('selectUserDropdown')

    users.forEach(user => {
       let options = new Option(user.name, user.id)
       userDropDown.appendChild(options)
    });

    userDropDown.onchange = () => {
        let selectedUserId = userDropDown.value;
        fetchUserTodos(selectedUserId);
    };
}

function fetchUserTodos(userId) {
    fetch(`http://localhost:8083/api/todos/byuser/${userId}`)
        .then(res => res.json())
        .then(userTodo => {
            console.log(userTodo);
            displayUserTodo(userTodo)
        })
        .catch(err => {
            console.error(`NOT FETCHING THE USER TODO`, err);
        });
}


//
function displayUserTodo(){

}