class Task {
    constructor(data,id){
        this.text = data;
        this.id = id;
        this.listElement = document.getElementById("tasks");

    }
    displayTask() {
        var taskdiv = document.createElement("div");

        var checkbox = document.createElement("INPUT")
        checkbox.setAttribute("type","checkbox");

        var textElement = document.createTextNode(this.text);
        taskdiv.className += 'task';

        taskdiv.appendChild(checkbox);
        taskdiv.appendChild(textElement);
        this.listElement.appendChild(taskdiv);
    }
}
