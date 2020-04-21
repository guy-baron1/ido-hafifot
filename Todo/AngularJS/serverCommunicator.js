
TodoApp.service('serverService',["UrlConfig","$http", function(UrlConfig,$http){
    this.getFromServer = function() {
        return ($http.get(UrlConfig.apiUrl));
    }
    this.addToServer = function(newTask) {
        $http.put(UrlConfig.addTaskUrl, JSON.stringify(newTask), UrlConfig.configHeader);
    }

    deleteFromServer = function(id) {
        $http.delete(UrlConfig.deleteTaskUrl + id, UrlConfig.configHeader);
    }

    checkTaskToServer = function(id, isChecked) {
        $http.put(UrlConfig.checkTaskUrl + id + "?isChecked=" + !isChecked, UrlConfig.configHeader);
    }

    editTextToServer = function(id, editResult) {
        $http.put(UrlConfig.EditUrl + id + "?newText=" + editResult, UrlConfig.configHeader).catch(function onError(error) {
            console.log(error);
        });
    }

    updateListToServer = function(data) {
        $http.put(UrlConfig.deleteCheckedUrl, angular.toJson(data), UrlConfig.configHeader).catch(function onError(error) {
            console.log(error);
        });
    }
}]);
