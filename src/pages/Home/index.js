import { useState } from 'react';
import { toast } from 'react-toastify';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';
import './home.css';

function Home(){
    const[pokemon, setPokemon] = useState('');
    const[pokemonData, setPokemonData] = useState([]);
    const[pokemonType, setPokemonType] = useState('');

    async function getPokemon(){
        const toArray = [];

        await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((response) => {
            console.log(response.data);
            setPokemonType(response.data.types[0].type.name);
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
        getPokemon();
    }

    return(
        <div className='container'>
            <form onSubmit={handleSearch}>
                <label>
                    <input type='text' placeholder='Enter the pokemon name'
                    onChange={(e) => setPokemon(e.target.value.toLowerCase())}/>
                    {/* <FiSearch className='search-icon' size={18} color='#000'/> */}
                </label>
            </form>
 
            {pokemonData.map((pokemon) => {
                return(
                    <div className='content' key={pokemon.id}>
                        <img src={pokemon.sprites["front_default"]} alt=''/>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Type</td>
                                    <td>{pokemonType}</td>
                                </tr>
                                <tr>
                                    <td>Height</td>
                                    <td>{pokemon.height}</td>
                                </tr>
                                <tr>
                                    <td>Weight</td>
                                    <td>{pokemon.weight}</td>
                                </tr>
                                <tr>
                                    <td>Number of matches</td>
                                    <td>{pokemon.game_indices.length}</td>
                                </tr>
                            </tbody>
                        </table>  
                    </div>
                );
            })}
        </div>
    );

}

export default Home;