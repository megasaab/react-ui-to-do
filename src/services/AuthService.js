import axios from "axios";
import $api from "../http/https";

export default class AuthService {
    static async login(email, password) {
        return $api.post('/login', { email, password });
    };

    static async registration(email, password) {
        return $api.post('/registration', { email, password });
    };
    //TODO CORS ERROR
    static async logout() {
        return  $api.post('/logout');
    }
};