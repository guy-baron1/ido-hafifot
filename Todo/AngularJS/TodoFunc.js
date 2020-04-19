var TodoApp = angular.module('todoApp', ['ngMaterial', 'ngMessages'])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('IdoTheme')
            .primaryPalette('pink', {
                'default': '900'
            })
            .accentPalette('light-blue', {
                'default': 'A700'
            })
            .warnPalette('amber').dark();
    });

    

TodoApp.controller('controller', function ($scope, $http,$mdDialog) {
    $scope.Todos = [];
    $scope.idCount = 0;
 
    $scope.getFromServer = function () {
        $http.get(apiUrl).then(
            function (response) {
                $scope.Todos = angular.fromJson(response.data);
                $scope.idCount = $scope.Todos.length;
                console.log($scope.idCount);
            }
        );

    }

    $scope.querySearch = function(query) {
        var results = query.toLowerCase() ? $scope.Todos.filter(query.toLowerCase()) : $scope.Todos
          return results;
      }

    $scope.addTodo = function () {
        let newTask = { text: $scope.todoText, isChecked: false, id: $scope.idCount };
        $scope.Todos.push(newTask);
        $scope.idCount += 1;
        $http.put(addTaskUrl, JSON.stringify(newTask), configHeader);
    }
    $scope.delete = function (id) {
        $scope.Todos = $scope.Todos.filter(task => task.id != id);
        $http.delete(deleteTaskUrl + id, configHeader);
    }
    $scope.checkTask = function (id) {
        let isChecked = $scope.Todos.find(task => task.id == id).isChecked;
        $scope.Todos.find(task => task.id == id).isChecked = !isChecked;
        $http.put(checkTaskUrl + id + "?isChecked=" + !isChecked, configHeader);
    }

    $scope.showPrompt = function (ev,id) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .title('Edit Your Task')
            .initialValue($scope.Todos.find(task => task.id == id).text)
            .targetEvent(ev)
            .required(true)
            .ok('Edit')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function(result) {$scope.editTask(id,result)});
    };

     $scope.editTask = function(id, editResult) {
         console.log(id);
         console.log(editResult);
        $scope.Todos.find(task => task.id == id).text = editResult;
     }

    $scope.deleteAllChecked = function (id) {
        $scope.Todos = $scope.Todos.filter(task => task.isChecked != true);
        let data = $scope.Todos;
        console.log(angular.toJson(data))
        console.log(configHeader)
        $http.put(deleteCheckedUrl, angular.toJson(data), configHeader).catch(function onError(error) {
            console.log(error);
        });
    }

});