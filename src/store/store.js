import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";

export default class Store {
    user = {};
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    async login(email, password) {
        try {
            const res = await AuthService.login(email, password);
            console.log(res);
            localStorage.setItem('token', res.data.accessToken);
            this.setAuth(true);
            this.setUser(res.data.user);
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    }

    async registration(email, password) {
        try {
            const res = await AuthService.registration(email, password);
            localStorage.setItem('token', res.data.accessToken);
            this.setAuth(true);
            this.setUser(res.data.user);
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    }

    
}