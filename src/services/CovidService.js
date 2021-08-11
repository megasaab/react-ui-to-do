import axios from "axios"
import { BASE_COVID19_API } from "../http/https"

export default class CovidService {

    static async getAll(country) {
        let changeUrl = BASE_COVID19_API;

        if (country) {
        changeUrl = `${BASE_COVID19_API}/countries/${country}`
        }

        try {
            const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeUrl);
            return { confirmed, recovered, deaths, lastUpdate };
        } catch (err) {
            console.log(err);
        }
    }

    static async fetchDailyDate() {
        try {
            const { data } = await axios.get(BASE_COVID19_API + '/daily');
            const modifiedData = data.map((dailyData) => ({
                confirmed: dailyData.confirmed.total,
                deaths: dailyData.deaths.total,
                date: dailyData.reportDate
            }))
            return modifiedData;
        } catch (error) {
            console.log(error);
        }
    }

    static async countries() {
        try {
            const { data: {countries}} = await axios.get(BASE_COVID19_API + '/countries');
            return countries.map((country) => country.name)
        } catch (error) {
            
        }
    }
}