const addBtn = document.getElementById("add-button");
const taskInput = document.getElementById("task-input");
const tasksBody = document.getElementById("tasks-body");

function addNewTask(taskTitle, completed = false) {
  return `
    <tr class="task">
      <td>
        <input class="task-checkbox" type="checkbox" ${completed ? "checked" : ""} />
      </td>
      <td class="task-title ${completed ? "completed" : ""}">${taskTitle}</td>
      <td>
        <button class="delete-button">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  `;
}

const STORAGE_KEY = "tasksData";

function saveToLocalStorage() {
  const tasks = [];
  tasksBody.querySelectorAll(".task").forEach((task) => {
    const title = task.querySelector(".task-title").textContent;
    const completed = task.querySelector(".task-checkbox").checked;

    tasks.push({
      title,
      completed,
    });
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadFromLocalStorage() {
  const savedTasks = localStorage.getItem(STORAGE_KEY);

  if (!savedTasks) return;

  const tasks = JSON.parse(savedTasks);

  tasks.forEach((task) => {
    tasksBody.insertAdjacentHTML(
      "beforeend",
      addNewTask(task.title, task.completed),
    );
  });
}

addBtn.addEventListener("click", (e) => {
  const taskTitle = taskInput.value.trim();
  // console.log(taskTitle);
  if (!taskTitle) {
    alert("Please enter a Title for the Task!");
    return;
  }

  tasksBody.insertAdjacentHTML("beforeend", addNewTask(taskTitle));
  saveToLocalStorage();
  taskInput.value = "";
});

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

tasksBody.addEventListener("click", (e) => {
  // console.log(e.target);
  const deleteBtn = e.target.closest(".delete-button");

  if (!deleteBtn) return;

  const confirmed = confirm("Are you sure you want to delete this task?");

  // console.log(confirmed);

  if (confirmed) {
    const task = deleteBtn.closest(".task");
    task.remove();
    saveToLocalStorage();
  }
});

tasksBody.addEventListener("change", (e) => {
  if (!e.target.classList.contains("task-checkbox")) return;

  const taskRow = e.target.closest(".task");
  const taskTitle = taskRow.querySelector(".task-title");

  taskTitle.classList.toggle("completed", e.target.checked);
  saveToLocalStorage();
});

loadFromLocalStorage();
