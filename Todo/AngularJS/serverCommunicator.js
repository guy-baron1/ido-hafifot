
class serverService{
    constructor(config)
    {
        this.config = config;
    }
    getFromServer($http) {
        return ($http.get(this.config.apiUrl));
    }

    addToServer($http , newTask) {
        $http.put(this.config.addTaskUrl, JSON.stringify(newTask), this.config.configHeader);
    }

    deleteFromServer($http, id) {
        $http.delete(this.config.deleteTaskUrl + id, this.config.configHeader);
    }

    checkTaskToServer($http, id, isChecked) {
        $http.put(this.config.checkTaskUrl + id + "?isChecked=" + !isChecked, this.config.configHeader);
    }

    editTextToServer($http, id, editResult) {
        $http.put(this.config.EditUrl + id + "?newText=" + editResult, this.config.configHeader).catch(function onError(error) {
            console.log(error);
        });
    }

    updateListToServer($http, data) {
        $http.put(this.config.deleteCheckedUrl, angular.toJson(data), this.config.configHeader).catch(function onError(error) {
            console.log(error);
        });
    }
}
