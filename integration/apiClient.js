class ApiClient {
    async postUser(request, endpoint, headers, body) {
        return await request.post(`${endpoint}`, {
            headers: headers,
            data: body
        })
    };

    async getUser(request, endpoint, headers) {
        return await request.get(`${endpoint}`, {
            headers: headers
        })
    };
}

module.exports = ApiClient;