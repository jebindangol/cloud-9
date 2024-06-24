
import axios from "axios";
import baseUrl from '../utils/baseUrl';

export async function getShopsFromMongo() {
    try {
        const response = await axios.get(
            `/api/shop`
        );
        return response.data;
    } catch (error) {
        return { "error": error }
    }
}
