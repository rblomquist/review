// --------------------------------
// Control that drives the program
// --------------------------------

// imports needed functions
import { addTask, changeView, storage} from "./to-do.js";

// initial code that runs when the page is loaded
window.addEventListener('load', () => {
        storage.refreshList()
        // extracts data from list
        for (let i = 0; i < storage.toDoList.length; i++){
            let newTask = storage.toDoList[i];
            // gets the name of the task
            let taskName = newTask["task"]
            // calls function to display the task name
            // initial runs first load checks from function
            addTask(taskName, "initial");
    }})
    
// adds event listener to the plus button to add new event and update task #
const plus = document.querySelector("#plus");

plus.addEventListener("click", addTask);

// changes the view based on the filter being used
const all = document.querySelector("#all");
const unfinished = document.querySelector("#unfinished");
const finished = document.querySelector("#finished");

changeView(all, 1);
changeView(unfinished, 2);
changeView(finished, 3);