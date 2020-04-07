class TaskList {
    constructor(){
        console.log("hello")
        this.communicator = new ClientCommunicator();
        this.tasks = [];
        this.taskCounter = 0;
        this.getAllTasks();
    }

    async getAllTasks() {
        let tasks = await this.communicator.getTasks()
        console.log(this.tasks);
        for (let i = 0; i < tasks.length; i++) {
            let newTask = tasks[i];
            this.addTask(newTask.text,newTask.id,newTask.isChecked);
        }
        this.taskCounter = this.tasks.length;
    }
    printTasks() {
        for (let i = 0; i < this.tasks.length; i++) {
            console.log(this.tasks[i].id + ": " + this.tasks[i].text + "\n ");
        }
        console.log('finished Printing');
    }
    addTask(text) {
        let newTask = new Task(text,this.taskCounter);
        this.taskCounter += 1;
        newTask.displayTask();
        this.tasks.push(newTask);
    }
    addTask(text,id,checked){
        let newTask = new Task(text,id,checked);
        newTask.displayTask();
        this.tasks.push(newTask);
    }
    removeTask(id) {
        var listElement = document.getElementById(id);
        listElement.parentNode.removeChild(listElement);
        for (let i = 0; i < this.tasks.length; i++) {
            if(this.tasks[i].id == id)
            {
                this.tasks.splice(i, 1);
            }
        }
        this.printTasks();
    }

    checkTask(id) {
        for (let i = 0; i < this.tasks.length; i++) {
            if(this.tasks[i].id == id)
            {
                this.tasks[i].checkTask();
            }
        }
    }
}