const tasks = [];

function addTask(taskValue) {
  let timer = null;
  let seconds = 0;
  let taskList = document.getElementById("list");

  const taskDescription = document.createElement("input");
  taskDescription.type = "text";
  taskDescription.value = taskValue;
  taskDescription.setAttribute("disabled", true);
  taskDescription.className = "task-description";

  const display = document.createElement("p");
  display.className = "display";
  display.textContent = "00:00";

  const timerBox = document.createElement("div");
  timerBox.className = "timer";
  timerBox.appendChild(display);

  const descriptionTimerBox = document.createElement("div");
  descriptionTimerBox.className = "description-timer-box";
  descriptionTimerBox.append(taskDescription, timerBox);

  const taskBox = document.createElement("div");
  taskBox.className = "list-items";

  const buttonBox = document.createElement("div");
  buttonBox.className = "task-buttons";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "secondary-button";
  deleteButton.onclick = () => deleteTask(taskValue, taskBox);

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "secondary-button";
  editButton.onclick = () => editTask(taskDescription, buttonBox);

  const playButton = document.createElement("button");
  playButton.className = "secondary-button fa fa-play";
  playButton.onclick = () => startTimer(display, playButton, pauseButton);

  const pauseButton = document.createElement("button");
  pauseButton.className = "secondary-button fa fa-pause";
  pauseButton.style.display = "none";
  pauseButton.onclick = () => stopTimer(playButton, pauseButton);

  buttonBox.append(deleteButton, editButton, playButton, pauseButton);
  taskBox.append(descriptionTimerBox, buttonBox);
  taskList.appendChild(taskBox);

  function startTimer(display, playButton, pauseButton) {
    if (!timer) {
      timer = setInterval(() => {
        seconds++;
        display.textContent = timeFormat(seconds);
      }, 1000);
      playButton.style.display = "none";
      pauseButton.style.display = "inline-block";
    }
  }

  function stopTimer(playButton, pauseButton) {
    if (timer) {
      clearInterval(timer);
      timer = null;
      playButton.style.display = "inline-block";
      pauseButton.style.display = "none";
    }
  }
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
  saveNewValueBox.id = "task-buttons";

  let cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.id = "secondary-button";
  cancelButton.onclick = () => {
    taskDescription.setAttribute("disabled", true);
    taskDescription.value = tasks[index];
    saveNewValueBox.remove();
    buttonBox.style.display = "flex";
  };

  let saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.id = "secondary-button";
  saveButton.onclick = () => saveUpdatedTask(index, taskDescription.value, taskDescription, saveNewValueBox, buttonBox);  

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


function timeFormat(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
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