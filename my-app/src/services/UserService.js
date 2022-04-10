const axios = require('axios');

export async function createUser(data) {
    const response = await axios.post(`/api/register`, data);
    return response.data;
}
export async function loginUser(data) {
    const response = await axios.post(`/api/login`, data);
    return response.data;
}