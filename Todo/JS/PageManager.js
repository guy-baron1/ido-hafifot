document.addEventListener('DOMContentLoaded', function(event) {
    var button = document.getElementById("new-task-button");
    button.onclick = generateTask;
  }) 

function generateTask() {
    var todoText = document.getElementById("new-task-text");
    var listElement = document.getElementById("tasks");
    var taskdiv = document.createElement("div");
    var textElement = document.createTextNode(todoText.value);
    taskdiv.className += 'task';
    taskdiv.appendChild(textElement);
    listElement.appendChild(taskdiv);
}
