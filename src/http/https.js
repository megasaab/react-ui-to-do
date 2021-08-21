import axios from 'axios';
export const BASE_API_URL = `https://backend.megasaab98.com/api`;
export const BASE_COVID19_API= `https://covid19.mathdro.id/api`;
export const GITHUB_URL = `https://api.github.com`;

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