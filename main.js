const inputTask = document.getElementById("input-task");
const TaskList = document.getElementById("task-list");
const btn = document.querySelector(".add-btn");

function addTask() {
    let task_value = inputTask.value.trim();
    if (task_value === "") {
        alert("Please enter a task");
    } else {
        const li = document.createElement("li");
        li.innerHTML = `<div><input type="checkbox"> ${task_value}</div><span>&times;</span>`;
        TaskList.appendChild(li);
        inputTask.value = "";

        const checkbox = li.querySelector("input[type='checkbox']");
        const textDiv = li.querySelector("div");

        checkbox.addEventListener("change", function () {
            textDiv.classList.toggle("checked", checkbox.checked);
            textDiv.style.color = checkbox.checked ? "darkgrey" : "#000";
            settasks();
        });

        settasks(); 
    }
}

btn.addEventListener("click", addTask);

inputTask.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

TaskList.addEventListener("click", function (e) {
    if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        settasks(); 
    }
});

function settasks() {
    localStorage.setItem("lists", TaskList.innerHTML);
}

function gettasks() {
    TaskList.innerHTML = localStorage.getItem("lists") || "";

    const allCheckboxes = TaskList.querySelectorAll("input[type='checkbox']");
    allCheckboxes.forEach((checkbox) => {
        const textDiv = checkbox.parentElement;
        checkbox.addEventListener("change", function () {
            textDiv.classList.toggle("checked", checkbox.checked);
            textDiv.style.color = checkbox.checked ? "darkgrey" : "#000";
            settasks(); 
        });
    });
}

window.addEventListener("DOMContentLoaded", gettasks);