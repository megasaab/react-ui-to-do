import axios from "axios"
import { BASE_COVID19_API } from "../http/https"

export default class CovidService {

    static async getAll() {
        try {
            const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(BASE_COVID19_API);
            return { confirmed, recovered, deaths, lastUpdate };
        } catch (err) {
            console.log(err);
        }   
    }
}