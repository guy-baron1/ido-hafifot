class ClientCommunicator {

    async getTasks() {
        console.log("hello2")
        let response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        let data = await response.json()
        if(response.status == 200)
        {
            console.log(data);
            return data;
        }
    }
}