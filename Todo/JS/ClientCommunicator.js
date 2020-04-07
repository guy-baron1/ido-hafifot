class ClientCommunicator {

    async getTasks() {
        let response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        let data = await response.json()
        if(response.status == 200)
        {
            return data;
        }
    }

    async addTask(newTask) {
        let response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask)
        });
        let data = await response.json()
        if(response.status == 200)
        {
            console.log("added succesfully")
        }
    } 
}