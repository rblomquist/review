// ----------------------------------------
// module that contains my event listeners
// ----------------------------------------

// imports local storage class and creates a new instance
import TheLocaleStorage from "./localStorage.js";

const storage = new TheLocaleStorage();
// let count = storage.filterItems(false).length
const counter = document.querySelector("#remaining");


// add new list to the window.
function addTask(task, first="notInitial") {
    // checks to see if this is the first time the program is run
    if (first === "initial") {
        // if first time only writes, does not sae to local storage
        task = task
    }
    else {
        // subsequent times will add item to local storage and adjust #of tasks remaining
        task = document.querySelector("#newTask").value
        storage.setItem(task, false);
        // document.querySelector("#remaining").textContent = `${count} tasks remaining`
    }
    let count = storage.filterItems(false).length
    
    // creates new element to store new task
    const taskList = document.querySelector("#taskList")

    const div = document.createElement("div");
    // adds classes for styling
    div.classList.add("flex");
    div.classList.add("blackBorder");
    
    // loops through the list to see if the items have been completed or not
    let item = JSON.parse(storage.getItem(task))
    if (item["complete"] === true) {
        // if item has been completed adds "completed" class and checks the box on the initial rendering
        // this is mostly for the initial run
        div.classList.add("completed")

        div.innerHTML = 
        `<label>Complete: <input type="checkbox" class="checkbox" checked></label>
        <p>${task}</p>
        <button class="remove">X</button>`;
    }
    else {
        // if not completed leaves box unchecked
        div.innerHTML = 
            `<label>Complete: <input type="checkbox" class="checkbox"></label>
            <p>${task}</p>
            <button class="remove">X</button>`;
            // count++;
            counter.textContent = `${count} tasks remaining`

    }
        
    taskList.append(div);

    // completes task when checkbox is checked
    const checkBox = div.querySelector(".checkbox");
    addCompleteTask(checkBox, div, task, count);
    
    // removes task when X is pressed
    const removeButton = div.querySelector(".remove");
    removeTask(removeButton, div, task, count);

};

// function when user clicks the checkbox
function addCompleteTask(target, div, task, count) {
    
    target.addEventListener("change", 
    
        function completeTask(e) {
            // if the box gets checked adds"complete" class and saves 
            // completed value to true in local storage
            if (e.currentTarget.checked) {
                div.classList.add("completed")
                storage.setItem(task, true);
                storage.refreshList()
                count = storage.filterItems(false).length

                counter.textContent = `${count} tasks remaining`
            }
            // if unchecking removes the "completed" class and saves
            // completed to false in local storage
            else {
                div.classList.remove("completed")
                storage.setItem(task, false);
                storage.refreshList()
                count = storage.filterItems(false).length

                counter.textContent = `${count} tasks remaining`
            }
    })
};

// function when clicking the X button
function removeTask(button, div, task, count) {
    button.addEventListener("click", 
    // removes item from the display and the local storage. then updates the remaining #
    function removeTask(e){
        div.remove();
        storage.removeItems(task);
        storage.refreshList();
    
        count = storage.filterItems(false).length

        counter.textContent = `${count} tasks remaining`;

    })
};

// function to change the task view
function changeView(target, number) {

    target.addEventListener("click", 
        function changeView(e) {
            const active = document.querySelector(".active");
            // checks to see if current class is active or not.
            // if not active removes the active class from the view that 
            // does and adds it to the view that was clicked
            if (e.currentTarget.classList.contains("inactive")) {
                active.classList.add("inactive");
                active.classList.remove("active");

                e.currentTarget.classList.remove("inactive");
                e.currentTarget.classList.add("active");
            }
            
            if (number === 1) {
                taskList.innerHTML = "";
                storage.refreshList()
                for (let i = 0; i < storage.toDoList.length; i++) {
                    let key = storage.toDoList[i]
                    let task = key["task"];
                    addTask(task, "initial");
                    
                }}
            
            else if (number === 2) {
                taskList.innerHTML = "";
                storage.refreshList()
                let filteredItems = storage.filterItems(false);
                for (let i = 0; i < filteredItems.length; i++) {
                    let key = filteredItems[i]
                    let task = key["task"];
                    addTask(task, "initial");
                }}

            else if (number === 3) {
                taskList.innerHTML = "";
                storage.refreshList()
                let filteredItems = storage.filterItems(true);
                for (let i = 0; i < filteredItems.length; i++) {
                    let key = filteredItems[i]
                    let task = key["task"];
                    addTask(task, "initial");
                }}
            
        }
    )
}

export {addTask, changeView, storage}