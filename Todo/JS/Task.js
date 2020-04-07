class Task {
    constructor(data,id,checked){
        this.text = data;
        this.id = id;
        this.listElement = document.getElementById("tasks");
        this.divObject = undefined;
        this.checked = false;
        if(checked !== undefined)
        {
            this.checked = checked;
        }
    }
    displayTask() {
        var taskdiv = document.createElement("div");
        taskdiv.className += 'task';
        taskdiv.id = this.id;
        this.divObject = taskdiv;

        var checkbox = document.createElement("INPUT");
        checkbox.setAttribute("type","checkbox");
        checkbox.className = "checkTask"
        checkbox.checked = this.checked;
        this.taskLineThrough(this.checked);

        var textElement = document.createTextNode(this.text);

        var deleteButton = document.createElement("button");
        deleteButton.className = "removeTask"
        deleteButton.textContent = "Remove";
        taskdiv.appendChild(checkbox);
        taskdiv.appendChild(textElement);
        taskdiv.appendChild(deleteButton);

        this.listElement.appendChild(taskdiv);
    }


    checkTask() {
        console.log(this.checked);
        this.checked = !this.checked;
        this.taskLineThrough(this.checked);
        console.log(this.checked);
        return(this.checked);
    }
    
    taskLineThrough(checked) {
        if(this.checked) {
            this.divObject.className += " checked";
            console.log("checked");
        }
        else {
            this.divObject.className = "checkTask";
            console.log("unchecked");
        }
    }
    
}
