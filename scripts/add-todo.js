'use strict';

const API_BASE_URL = 'http://localhost:8083/api';

const userDropDown = document.getElementById('userSelect');
const categorySelect = document.getElementById('categorySelect');

window.onload = () => {
    populateUserApi();
    populateCategoryApi();

   handleFormSubmission();
};

function handleFormSubmission(){
    const addBtn = document.getElementById('addBtn');
    addBtn.onclick = function (event) {
    event.preventDefault(); 
    handleAddTodo();
};

}

function populateUserApi() {
    fetch(`${API_BASE_URL}/users`)
        .then(response => response.json())
        .then(users => {
            populateUserDropDown(users)
        })
        .catch(error => console.error('Error fetching users:', error));
}

function populateCategoryApi() {
    fetch(`${API_BASE_URL}/categories`)
        .then(response => response.json())
        .then(categories => {
            populateCategoryDropDown(categories)
        })
        .catch(error => console.error('Error fetching categories:', error));
}

function populateUserDropDown(users) {
    users.forEach(user => {
        const option = new Option(user.name, user.id);
        userDropDown.appendChild(option);
    });
}

function populateCategoryDropDown(categories) {
    categories.forEach(category => {
        const option = new Option(category.name, category.id);
        categorySelect.appendChild(option);
    });
}

function handleAddTodo() {
    const selectedUserId = userDropDown.value;
    const selectedCategoryId = categorySelect.value;
    const priority = document.getElementById('prioritySelect').value;
    const deadline = document.getElementById('deadline').value;
    const description = document.getElementById('description').value;

    const todoData = {
        userid: selectedUserId,
        category: selectedCategoryId,
        description: description,
        deadline: deadline,
        priority: priority,
    };

    fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayPostReq(data)
    })
    .catch(error => console.error('Error adding todo', error));
}


function displayPostReq(data){
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.textContent = `Todo added successfully. ID: ${data.id}, Description: ${data.description}`;
}