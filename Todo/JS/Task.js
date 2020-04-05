class Task {
    constructor(data,id){
        this.text = data;
        this.id = id;
        console.log(id);
        this.listElement = document.getElementById("tasks");
    }
    displayTask() {
        var taskdiv = document.createElement("div");
        taskdiv.className += 'task';
        taskdiv.id = this.id;

        var checkbox = document.createElement("INPUT");
        checkbox.setAttribute("type","checkbox");

        var textElement = document.createTextNode(this.text);

        var deleteButton = document.createElement("button");
        deleteButton.className = "removeTask"
        deleteButton.textContent = "Remove";
        taskdiv.appendChild(checkbox);
        taskdiv.appendChild(textElement);
        taskdiv.appendChild(deleteButton);

        this.listElement.appendChild(taskdiv);
    }
    
}
