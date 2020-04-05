document.addEventListener('DOMContentLoaded', function(event) {
    var button = document.getElementById("new-task-button");
    button.onclick = generateTask;
  }) 

function generateTask() {
    alert("How You Doin?");
}