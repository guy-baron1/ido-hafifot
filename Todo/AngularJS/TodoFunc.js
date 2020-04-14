var TodoApp = angular.module('todoApp', []);

TodoApp.controller('controller', function($scope) {
    $scope.Todos = [];

    $scope.addTodo = function() {
        $scope.Todos.push({text: $scope.todoText, isChecked: false})
    }
});