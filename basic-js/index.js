const tasks = [];

function addTask(taskValue) {
  let taskList = document.getElementById("list");

  let taskDescription = document.createElement("input");
  taskDescription.type = "text";
  taskDescription.value = taskValue;
  taskDescription.setAttribute("disabled", true);
  taskDescription.id = "task-description";

  let taskBox = document.createElement("div");
  taskBox.id = "list-items";

  taskList.appendChild(taskBox);

  let buttonBox = document.createElement("div");
  buttonBox.id = "task-buttons";

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.id = "secondary-button";
  deleteButton.onclick = () => deleteTask(taskValue, taskBox);

  let editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.id = "secondary-button";
  editButton.onclick = () => editTask(taskDescription, taskBox, buttonBox);

  let timerStartButton = document.createElement("button");
  timerStartButton.id = "secondary-button";
  timerStartButton.className = "fas fa-play";

  buttonBox.append(deleteButton, editButton, timerStartButton);
  taskBox.append(taskDescription, buttonBox);   
}

function saveTask() {
  let taskValue = document.getElementById('add-task').value;
  if (!taskValue) {
    alert("Task cannot be empty");
    return;
  }

  if (tasks.length >= 3) {
    alert("Firstly finish the tasks from the list");
    return;
  }

  tasks.push(taskValue);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    addTask(taskValue);
    document.getElementById('add-task').value = ''; 
}

function deleteTask(taskValue, taskBox) { 
  const index = tasks.indexOf(taskValue);
  
  if (index > -1) {
    console.log("Task deleted:", taskValue);
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  taskBox.remove();

  alert("Task deleted successfully!");
}

function editTask(taskDescription, taskBox, buttonBox) {
  const index = tasks.indexOf(taskDescription.value);

  taskDescription.removeAttribute("disabled");

  buttonBox.style.display = "none";

  let saveNewValueBox = document.createElement("div");
  buttonBox.id = "task-buttons";

  let cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.id = "secondary-button";
  cancelButton.onclick = () => {
    taskDescription.setAttribute("disabled", true);
    saveNewValueBox.remove();
    buttonBox.style.display = "flex";
  };

  let saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.id = "secondary-button";
  saveButton.onclick = () => saveUpdatedTask(index, taskDescription.value);  

  saveNewValueBox.append(cancelButton, saveButton);
  taskBox.appendChild(saveNewValueBox);
}

function saveUpdatedTask(index, newTaskValue, taskDescription, saveNewValueBox, buttonBox) {
  if (index > -1) {
    tasks[index] = newTaskValue;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  taskDescription.setAttribute("disabled", true);
  saveNewValueBox.remove();
  buttonBox.style.display = "flex";
}

document.addEventListener("DOMContentLoaded", () => {
  let storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {

    let listTasks = JSON.parse(storedTasks);

    for (let task of listTasks) {
      tasks.push(task);
      addTask(task);
    }
  }
});