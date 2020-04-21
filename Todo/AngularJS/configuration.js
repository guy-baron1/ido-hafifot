class config {
    constructor() {
        this.apiUrl = "http://localhost:51875/api/todo";
        this.addTaskUrl = "http://localhost:51875/api/todo/add";
        this.deleteTaskUrl = "http://localhost:51875/api/todo/delete/?Id=";
        this.checkTaskUrl = "http://localhost:51875/api/todo/check/";
        this.deleteCheckedUrl = "http://localhost:51875/api/todo/DeleteChecked";
        this.EditUrl = "http://localhost:51875/api/todo/Edit/";

        this.configHeader = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
    }
}