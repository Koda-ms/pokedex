import axios from "axios";

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
});
export default api;

export const listPokemons = async (limit, offset) => {
    try {
        //console.log('limit: ', limit, ' offset: ', offset);
        const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
       
        return await response.data; 
    } catch (error) {
        console.log('error listing: ', error);
    }
}
 
export const getPokemonsData = async (url) => {
    try {
        const response = await api.get(url);
        
        return await response.data; 
    } catch (error) {
        console.log('error on data: ', error);
    }
}

export const getPokemonsTypes = async () => {
    try {
        const res = await api.get('type');
        //console.log(res.data.results);
        return await res.data.results;
    } catch (error) {
        console.log('error on seraching types: ', error);
    }
}