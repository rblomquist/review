// ------------------------------------------
// object to help work with the local storage
// ------------------------------------------

class TheLocaleStorage {
    constructor(){
        // list to help extract information
        this.toDoList = [];
    }

    // get item
    getItem(key) {
        const item = localStorage.getItem(key);
        return item;
    }
    // set item 
    setItem(task, complete) {
        const time = new Date();
        const month = time.getMonth() + 1;
        const day = time.getDate();
        const year = time.getFullYear()
        
        const timestamp = `${month}-${day}-${year}`;
        const sorting = time.getTime();

        // saves the item in specific format based on information being stored
        const item = {"timestamp": timestamp, "task": task, "complete": complete, "sort": sorting};
        this.toDoList.push(item);

        // converts objet to string to be able to be saved in local storage
        const json = JSON.stringify(item);
        localStorage.setItem(task, json);
    }
    // Remove items
    removeItems(task) {
        localStorage.removeItem(task);
        const updateList = JSON.parse(this.getItem(task))
        this.toDoList.pop(updateList)
    }
    // filter items
    filterItems(bool) {
                
        // filters item based on whether it has been completed or not
        let filteredToDo = this.toDoList.filter( (task) => task["complete"] === bool)

        return filteredToDo
    }

    refreshList() {
        this.toDoList = []

        for (let i = 0; i < localStorage.length; i++){
            let key = localStorage.key(i);
            // parses the data into an array to extract specific information
            let item = JSON.parse(this.getItem(key))
            // stores item in list to be used rather than local storage
            this.toDoList.push(item)
        }

    }
}

// exports to be used by event listeners
export default TheLocaleStorage;

