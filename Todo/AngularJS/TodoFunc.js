var TodoApp = angular.module('todoApp', ['ngMaterial', 'ngMessages'])
    .constant('UrlConfig', new config())
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


TodoApp.controller('controller', function ($scope, $http, $mdDialog, serverService) {
    $scope.Todos = [];
    $scope.idCount = 0;
    $scope.getFromServer = function () {
        let response = serverService.getFromServer();
        response.then(
            function (response) {
                $scope.Todos = angular.fromJson(response.data);
                $scope.idCount = $scope.Todos.length;
                console.log($scope.idCount);
            });

    }

    $scope.addTodo = function () {
        let newTask = new Task($scope.todoText, $scope.idCount, false)
        console.log(newTask);
        console.log(JSON.stringify(newTask));
        $scope.Todos.push(newTask);
        $scope.idCount += 1;
        serverService.addToServer(newTask);
    }
    $scope.delete = function (id) {
        $scope.Todos = $scope.Todos.filter(task => task.id != id);
        serverService.deleteFromServer(id);

    }
    $scope.checkTask = function (id) {
        let isChecked = $scope.Todos.find(task => task.id == id).isChecked;
        $scope.Todos.find(task => task.id == id).isChecked = !isChecked;
        serverService.checkTaskToServer(id, isChecked);
    }

    $scope.showPrompt = function (ev, id) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .title('Edit Your Task')
            .initialValue($scope.Todos.find(task => task.id == id).text)
            .targetEvent(ev)
            .required(true)
            .ok('Edit')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function (result) { $scope.editTask(id, result) });
    };

    $scope.editTask = function (id, editResult) {
        $scope.Todos.find(task => task.id == id).text = editResult;
        serverService.editTextToServer(id, editResult)
    }

    $scope.deleteAllChecked = function (id) {
        $scope.Todos = $scope.Todos.filter(task => task.isChecked != true);
        serverService.updateListToServer($,$scope.Todos);
    }

    $scope.switch = function (id, direction) {
        let index = $scope.Todos.findIndex(task => task.id == id)
        if (!((index === 0 && direction === -1) || (index === ($scope.Todos.length - 1) && direction === 1))) {
            let temp = $scope.Todos[index];
            $scope.Todos[index] = $scope.Todos[index + direction];
            $scope.Todos[index + direction] = temp;
            serverService.updateListToServer($scope.Todos);
        }
    }

});