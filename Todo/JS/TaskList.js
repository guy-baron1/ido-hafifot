class TaskList {
    constructor(){
        this.communicator = new ClientCommunicator();
        this.tasks = [];
        this.taskCounter = 0;
        this.getAllTasks();
    }

    async getAllTasks() {
        let tasks = await this.communicator.getTasks()
        Array.from(tasks).forEach(newTask => this.addTaskFromServer(newTask.text,newTask.id,newTask.isChecked))
        this.taskCounter = this.tasks.length;
    }
    addTask(text) {
        let newTask = new Task(text,this.taskCounter);
        this.taskCounter += 1;
        newTask.displayTask(this);
        this.tasks.push(newTask);
        this.communicator.addTask(newTask);
    }
    addTaskFromServer(text,id,checked){
        let newTask = new Task(text,id,checked);
        newTask.displayTask(this);
        this.tasks.push(newTask);
    }
    removeTask(id) {
        this.communicator.removeTask(id);
        let listElement = document.getElementById(id);
        listElement.parentNode.removeChild(listElement);
        this.tasks = this.tasks.filter(task => task.id != id)
    }

    checkTask(id) {
        let taskIndex = this.tasks.findIndex(task => task.id == id)
        let isChecked = this.tasks[taskIndex].checkTask();
        this.communicator.checkTask(id,isChecked);
    }
}