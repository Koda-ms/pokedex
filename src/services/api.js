import axios from "axios";

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
});
export default api;

export const listPokemons = async (limit = 50, offset = 0) => {
    try {
        const response = await api.get(`/pokemon?limit=${limit}&offset${offset}`);
        //console.log(response.data.results);
        return await response.data.results; 
    } catch (error) {
        console.log('error listing: ', error);
    }
}
 
export const getPokemonsData = async (url) => {
    try {
        const response = await api.get(url);
        //console.log(response.data);
        return await response.data; 
    } catch (error) {
        console.log('error on data: ', error);
    }
}