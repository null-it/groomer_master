class ApiResponse {
    static prepareFromError(val) {
        let body = ""
        for (const id in val.body.errors) {
            if (val.body.errors[id]){
                let error = val.body.errors[id]
                body += error + ",\r\n"
            }
        }
        return body
    }

    static postCallback(error, data, response, component) {
        console.log(error, data, response, component)
    }
}

export default ApiResponse
