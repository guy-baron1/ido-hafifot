let apiUrl = "http://localhost:51875/api/todo";
let addTaskUrl = "http://localhost:51875/api/todo/add";
let deleteTaskUrl = "http://localhost:51875/api/todo/delete/?Id=";
let checkTaskUrl = "http://localhost:51875/api/todo/check/";
let deleteCheckedUrl = "http://localhost:51875/api/todo/DeleteChecked";
let EditUrl = "http://localhost:51875/api/todo/Edit/";

let configHeader = {headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}}