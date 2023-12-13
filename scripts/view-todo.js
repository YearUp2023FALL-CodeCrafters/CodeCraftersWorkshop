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
function displayUserTodo(userTodos){
    let userTable = document.querySelector('#userTodoTable');


    userTable.innerHTML = `
    <tr>
    <th>ID</th>
    <th>Category</th>
    <th>Description</th>
    <th>Deadline</th>
    <th>Priority</th>
    <th>Completed</th>
    </tr>`;


    userTodos.forEach(todo => {
        let row = userTable.insertRow();

        let idCell = row.insertCell(0);
        idCell.innerHTML = todo.id;

        let categoryCell = row.insertCell(1);
        categoryCell.innerHTML = todo.category;

        let descriptionCell = row.insertCell(2);
        descriptionCell.innerHTML = todo.description;

        let deadlineCell = row.insertCell(3);
        deadlineCell.innerHTML = todo.deadline;

        let priorityCell = row.insertCell(4);
        priorityCell.innerHTML = todo.priority;

        let completedCell = row.insertCell(5);
        completedCell.innerHTML = todo.completed ? '✓' : 'X';

        // let userIdCell = row.insertCell(6);
        // userIdCell.innerHTML = todo.userid;

    })
    
}