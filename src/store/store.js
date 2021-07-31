import axios from "axios";
import { makeAutoObservable } from "mobx";
import { BASE_API_URL } from "../http/https";
import AuthService from "../services/AuthService";

export default class Store {
    user = {};
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    async login(email, password) {
        try {
            const res = await AuthService.login(email.toLowerCase(), password);
            localStorage.setItem('token', res.data.accessToken);
            document.cookie = `refreshToken=${res.data.refreshToken}`;
            this.setAuth(true);
            this.setUser(res.data.user);
            return res;
        } catch (error) {
            return error;
        } 
    }

    async registration(email, password) {
        try {
            const res = await AuthService.registration(email.toLowerCase(), password);
            localStorage.setItem('token', res.data.accessToken);
            document.cookie = `refreshToken=${res.data.refreshToken}`;
            this.setAuth(true);
            this.setUser(res.data.user);
            return res;
        } catch (error) {
            return error;
        }
    }

    async logout() {
        
        try {
            const refreshTokenFromCookie = this.getCookie('refreshToken');
            await AuthService.logout(refreshTokenFromCookie );
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const refreshTokenFromCookie = this.getCookie('refreshToken');
            const res = await axios.post(`${BASE_API_URL}/refresh`, {refreshToken: refreshTokenFromCookie});
            localStorage.setItem('token', res.data.accessToken);
            this.setAuth(true);
            this.setUser(res.data.user);
        } catch (error) {
            console.log(error?.response?.data?.message);
        } finally {
            this.setLoading(false)
        }
    }


    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }


}