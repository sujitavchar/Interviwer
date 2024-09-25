class apiResponse {
    constructor(status, data, message = "Success"){
        this.status = status,
        this.data = data,
        this.message = message
    }
}

export default apiResponse;