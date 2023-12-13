"use strict"

window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const todoId = urlParams.get('id')

    fetchTodoApi(todoId);
}

function fetchTodoApi(todoId){
    fetch(`http://localhost:8083/api/todos/${todoId}`)
    .then(res => res.json())
    .then(todo => {
        console.log(todo)
        displayTodoDetails(todo)
    })
}

function displayTodoDetails(todo) {
    let displayTodo = document.getElementById('displayTodo');

    displayTodo.innerHTML = `
        <div class='d-flex align-items-center justify-content-center' style='height: 100vh;'>
            <div class='card' style='width: 200px;'>
                <div class='card-body text-center'>
                    <h4>${todo.category}</h4>
                    <p>${todo.description}</p>
                    <p>${todo.deadline}</p>
                    <p>${todo.completed}</p>

                    <a href='/view-todo.html'>Go back</a>
                </div>
            </div>
        </div>`;
}
