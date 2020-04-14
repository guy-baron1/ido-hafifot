var TodoApp = angular.module('todoApp', []);

TodoApp.controller('controller', function($scope) {
    $scope.Todos = [];
    $scope.idCount = 0;
    $scope.addTodo = function() {
        $scope.Todos.push({text: $scope.todoText, isChecked: false, id: $scope.idCount});
        $scope.idCount += 1;
    }
    $scope.delete = function(id) {
        $scope.Todos = $scope.Todos.filter(task => task.id != id);
    }
});