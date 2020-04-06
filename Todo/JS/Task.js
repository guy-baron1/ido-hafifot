class Task {
    constructor(data,id){
        this.text = data;
        this.id = id;
        this.listElement = document.getElementById("tasks");
        this.divObject = undefined;
        this.checked = false
    }
    displayTask() {
        var taskdiv = document.createElement("div");
        taskdiv.className += 'task';
        taskdiv.id = this.id;
        this.divObject = taskdiv;

        var checkbox = document.createElement("INPUT");
        checkbox.setAttribute("type","checkbox");
        checkbox.className = "checkTask"

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
        this.checked = !this.checked;
        if(this.checked) {
            this.divObject.className += " checked";
            console.log("checked");
        }
        else {
            this.divObject.className -= " checked";
            console.log("unchecked");
        }
    }
    
}
