const list = new TaskList();
document.addEventListener('DOMContentLoaded', function(event) {
    const button = document.getElementById("new-task-button");
    button.onclick = generateTask;
}) 

function generateTask() {
    let todoText = document.getElementById("new-task-text");
    list.addTask(todoText.value);
}
