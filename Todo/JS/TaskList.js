class TaskList {
    constructor(){
        this.tasks = [];
    }
    printTasks() {
        for (let i = 0; i < this.tasks.length; i++) {
            console.log(this.tasks[i].id + ": " + this.tasks[i].text + "\n ");
        }
        console.log('finished Printing');
    }
    addTask(text) {
        let newTask = new Task(text,this.tasks.length);
        newTask.displayTask();
        this.tasks.push(newTask);
        
    }
}