var TodoApp = angular.module('todoApp', []);
let communicator = new ClientCommunicator()

TodoApp.controller('controller', function($scope,$window) {
    $scope.Todos = [];
    $scope.idCount = 0;
    
    $window.onload = async function() {
        data = await communicator.getTasks();
        $scope.addTodoFromServer(data);
    }
    $scope.addTodo = function() {
        let newTask = {text: $scope.todoText, isChecked: false, id: $scope.idCount}
        $scope.Todos.push(newTask);
        $scope.idCount += 1;
        communicator.addTask(newTask)
    }
    $scope.addTodoFromServer = function(data) {
        data.map(task => $scope.Todos.push(task));
        $scope.idCount = $scope.Todos[$scope.Todos.length - 1].id + 1
    }
    $scope.delete = function(id) {
        $scope.Todos = $scope.Todos.filter(task => task.id != id);
        communicator.removeTask(id);
    }

    $scope.checkTask = function(id) {
        let isChecked = $scope.Todos.find(task => task.id == id).isChecked;
        $scope.Todos.find(task => task.id == id).isChecked = !isChecked;
        communicator.checkTask(id,!isChecked)
    }

    $scope.deleteAllChecked = function(id) {
       $scope.Todos = $scope.Todos.filter(task => task.isChecked != true);
    }

});