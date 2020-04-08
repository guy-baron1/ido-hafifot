class Task {
    constructor(data,id,checked){
        this.text = data;
        this.id = id;
        this.listElement = document.getElementById("tasks");
        this.divObject = undefined;
        this.checked = false;
        if(checked !== undefined) {
            this.checked = checked;
        }
    }
    displayTask(list) {
        let taskdiv = document.createElement("div");
        taskdiv.className += 'task';
        taskdiv.id = this.id;
        this.divObject = taskdiv;
        let listnerId = this.id;
        let listnerIsChecked = this.checked;

        let checkbox = document.createElement("INPUT");
        checkbox.setAttribute("type","checkbox");
        checkbox.className = "checkTask"
        checkbox.checked = this.checked;
        checkbox.addEventListener('click', function(){
            list.checkTask(listnerId,listnerIsChecked)})
 
        this.taskLineThrough(this.checked);

        let textElement = document.createTextNode(this.text);

        let deleteButton = document.createElement("button");
        deleteButton.className = "removeTask"
        deleteButton.textContent = "Remove";
        deleteButton.addEventListener('click', function(){
           list.removeTask(listnerId)})

        taskdiv.appendChild(checkbox);
        taskdiv.appendChild(textElement);
        taskdiv.appendChild(deleteButton);

        this.listElement.appendChild(taskdiv);
    }


    checkTask() {
        this.checked = !this.checked;
        this.taskLineThrough(this.checked);
        return(this.checked);
    }
    
    taskLineThrough(checked) {
        if(this.checked) {
            this.divObject.className += " checked";
        }
        else {
            this.divObject.className = "checkTask";
        }
    }
    
}
