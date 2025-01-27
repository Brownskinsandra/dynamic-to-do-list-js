// document.addEventListener("DOMContentLoaded", () => {
//     // Select DOM elements
//     const addButton = document.getElementById("add-task-btn");
//     const taskInput = document.getElementById("task-input");
//     const taskList = document.getElementById("task-list");

//     /**
//      * Function to add a new task to the list
//      */
//     function addTask() {
//         // Retrieve and trim the task input value
//         const taskText = taskInput.value.trim();

//         // Check if taskText is empty
//         if (taskText === "") {
//             alert("Please enter a task.");
//             return; // Stop execution if no task is entered
//         }

//         // Create a new <li> element and set its text content to taskText
//         const listItem = document.createElement("li");
//         listItem.textContent = taskText;

//         // Create a new button element for removing the task
//         const removeButton = document.createElement("button");
//         removeButton.textContent = "Remove";

//         // Use classList.add to assign the 'remove-btn' class
//         removeButton.classList.add("remove-btn");

//         // Assign an onclick event to remove the <li> element from taskList
//         removeButton.onclick = () => {
//             taskList.removeChild(listItem);
//         };

//         // Append the remove button to the <li> element
//         listItem.appendChild(removeButton);

//         // Append the <li> element to the task list
//         taskList.appendChild(listItem);

//         // Clear the task input field
//         taskInput.value = "";
//     }

//     // Attach event listener to the "Add Task" button
//     addButton.addEventListener("click", addTask);

//     // Attach event listener to the input field for 'Enter' key press
//     taskInput.addEventListener("keypress", (event) => {
//         if (event.key === "Enter") {
//             addTask();
//         }
//     });
// });
document.addEventListener("DOMContentLoaded", () => {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Function to load tasks from Local Storage
    function loadTasks() {
        // Retrieve tasks from Local Storage and parse them into an array
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

        // Populate the task list in the DOM
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' to prevent duplicate saving
    }

    /**
     * Function to add a new task to the list
     * @param {string} taskText - The text of the task to add
     * @param {boolean} save - Whether to save the task to Local Storage
     */
    function addTask(taskText, save = true) {
        // Check if the taskText is empty
        if (!taskText.trim()) {
            alert("Please enter a task.");
            return;
        }

        // Create a new <li> element and set its text content
        const listItem = document.createElement("li");
        listItem.textContent = taskText;

        // Create a new button element for removing the task
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-btn");

        // Assign an onclick event to the remove button
        removeButton.onclick = () => {
            taskList.removeChild(listItem); // Remove from the DOM
            removeTask(taskText); // Remove from Local Storage
        };

        // Append the remove button to the <li> element
        listItem.appendChild(removeButton);

        // Append the <li> element to the task list
        taskList.appendChild(listItem);

        // Save the task to Local Storage if specified
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
            storedTasks.push(taskText);
            localStorage.setItem("tasks", JSON.stringify(storedTasks));
        }

        // Clear the task input field
        taskInput.value = "";
    }

    /**
     * Function to remove a task from Local Storage
     * @param {string} taskText - The text of the task to remove
     */
    function removeTask(taskText) {
        // Retrieve tasks from Local Storage
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

        // Filter out the task to remove
        const updatedTasks = storedTasks.filter(task => task !== taskText);

        // Save the updated task list back to Local Storage
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    // Attach event listener to the "Add Task" button
    addButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        addTask(taskText); // Save is true by default
    });

    // Attach event listener to the input field for 'Enter' key press
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const taskText = taskInput.value.trim();
            addTask(taskText); // Save is true by default
        }
    });

    // Load tasks from Local Storage on page load
    loadTasks();
});
