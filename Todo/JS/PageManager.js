var list = new TaskList();
document.addEventListener('DOMContentLoaded', function(event) {
    var button = document.getElementById("new-task-button");
    button.onclick = generateTask;
  }) 

  document.addEventListener('click', event => {
    if (event.target.classList.contains('removeTask')) {
        const id = event.target.parentElement.id;
        console.log("sending" + id)
        list.removeTask(id);
    }
})
function generateTask() {
    var todoText = document.getElementById("new-task-text");
    list.addTask(todoText.value);
    list.printTasks();
  //  console.log(list.Tasks[0])
    
}
