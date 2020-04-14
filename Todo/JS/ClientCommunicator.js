class ClientCommunicator {

    async getTasks() {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        let data = await response.json()
        if(response.status == 200) {
            return data;
        }
    }

    async addTask(newTask) {
        const response = await fetch(apiUrl +"/add", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newTask)
        });
        let data = await response.json()
        if(response.status == 200) {
            //Succesful
        }
    }
    
    async removeTask(id) {
        const response = await fetch(apiUrl +"/delete/?Id=" + id,  {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(id)
        });
        let data = await response.json()
        if(response.status == 200) {
            //Succcesful
        }
    }

    async checkTask(id,isChecked) {
        const response = await fetch(apiUrl +"/check/" + id + "?isChecked=" + isChecked,  {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
        let data = await response.json()
        if(response.status == 200) {
            //Succesful
        }
    }

}