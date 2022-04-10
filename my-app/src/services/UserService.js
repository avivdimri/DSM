const axios = require('axios');

export async function createUser(data) {
    const response = await axios.post(`/api/register`, data);
    return response.data;
}