import axios from 'axios';
export const BASE_API_URL = `https://backend.megasaab98.com/api`

const $api = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

    return config;
});

export default $api;