import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FiSearch } from 'react-icons/fi';
import './home.css';
import api, { getPokemonsData, listPokemons } from '../../services/api';

function Home(){
    const[loading, setLoading] = useState(true);
    const[pokemonName, setPokemonName] = useState('');
    const[pokemonData, setPokemonData] = useState([]);

    useEffect(() => {
        async function loadPokemons(){

           try {
            const data = await listPokemons();
            const promises = data.map(async (pokemon) =>{
                return await getPokemonsData(pokemon.url);
            })

            const results = await Promise.all(promises);
            console.log(results)
            setPokemonData(results);

            setLoading(false);
           } catch (error) {
            console.log('loading pokemons error: ', error);
           }
        }
        loadPokemons();
    }, []);

    async function showPokemon(){
        const toArray = [];

        await api.get(`pokemon/${pokemonName}`)
        .then((response) => {
            toArray.push(response.data);
            setPokemonData(toArray);
        })
        .catch((error) => {
            toast.error('This pokemon does not exist. Please, try again.');
            console.log(error);
        })
    }

    function handleSearch(e){
        e.preventDefault();
        showPokemon();
    }

    return(
        <div className='container'>
            <form onSubmit={handleSearch}>
                <label className='search-area'>
                    <input type='text' placeholder='Enter the pokemon name'
                    onChange={(e) => setPokemonName(e.target.value.toLowerCase())}/>
                    <button type='submit'>
                        <FiSearch className='search-icon' size={18} color='#000'/>
                    </button>
                </label>
            </form>

            {loading ? (<div>Loading info, hold on...</div>)
            : (
                <div className='content-area'>
                    {pokemonData.map((pokemon) => {
                        return(
                            <div className='content' key={pokemon.id}>
                                <h4>{pokemon.name}</h4>
                                <img src={pokemon.sprites["front_default"]} alt=''/>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>{pokemon.types[0].type.name}</td>
                                            {pokemon.types.length > 1 ? 
                                            (<td>{pokemon.types[1].type.name}</td>)
                                            : <></>
                                            }
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );

}

export default Home;