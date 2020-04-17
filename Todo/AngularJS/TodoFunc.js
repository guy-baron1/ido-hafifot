var TodoApp = angular.module('todoApp', []);

TodoApp.controller('controller', function($scope,$http) {
    $scope.Todos = [];
    $scope.idCount = 0;
    
    $scope.getFromServer = function() {
        $http.get(apiUrl).then(
            function(response) {
                $scope.Todos = angular.fromJson(response.data);
                $scope.idCount = $scope.Todos.length;
                console.log($scope.idCount);
            }
        );

    }
    $scope.addTodo = function() {
        let newTask = {text: $scope.todoText, isChecked: false, id: $scope.idCount};
        $scope.Todos.push(newTask);
        $scope.idCount += 1;
        $http.put(addTaskUrl, JSON.stringify(newTask), configHeader);
    }
    $scope.delete = function(id) {
        $scope.Todos = $scope.Todos.filter(task => task.id != id);
        $http.delete(deleteTaskUrl + id, configHeader);
    }
    $scope.checkTask = function(id) {
        let isChecked = $scope.Todos.find(task => task.id == id).isChecked;
        $scope.Todos.find(task => task.id == id).isChecked = !isChecked;
        $http.put(checkTaskUrl + id + "?isChecked=" + !isChecked, configHeader);
    }

    $scope.deleteAllChecked = function(id) {
       $scope.Todos = $scope.Todos.filter(task => task.isChecked != true);
       let data = $scope.Todos;
       console.log(angular.toJson(data))
       console.log(configHeader)
       $http.put(deleteCheckedUrl, angular.toJson(data), configHeader).catch(function onError(error) {
        console.log(error);         
    });
    }

});