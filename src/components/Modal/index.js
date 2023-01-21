import { useState } from 'react';
import './modal.css';
import { FiX } from 'react-icons/fi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { toast } from 'react-toastify';

function Modal({ pokemon, close }){
    const[favList, setFavList] = useState([]);

    function handleAddFavorite(){
        const myList = localStorage.getItem("@pokedex");

        setFavList(JSON.parse(myList) || []);
        
        const hasPokemon = favList.some((savedPokemon) => savedPokemon.id === pokemon.id)
    
        if(hasPokemon){
            toast.warn("This pokemon already exists in the list");
            return;
        }

        favList.push(pokemon);
        localStorage.setItem("@pokedex", JSON.stringify(favList));

        toast.success("Pokemon added successfully");
    }

    return(
        <div className='modal'>
            <div className='modal-container'>

                <button className='close' onClick={close}>
                    <FiX size={23} color='#FFF'/> 
                    Back
                </button>

                <div className='first-info'>
                    <img src={pokemon.sprites["front_default"]} alt='pokemon-img'/> 
                    
                    <label>
                        <span>#{pokemon.id}</span>

                        <div className='title'>
                            <h1>{pokemon.name}</h1> 
                            {/* TO CHECK LATER */}
                            <button onClick={handleAddFavorite}> 
                                {favList.findIndex((poke) => poke.id === pokemon.id) ? (<AiFillHeart size={18} color='#000'/>)
                                : (<AiOutlineHeart size={18} color='#000'/>)
                                }
                            </button>
                        </div>

                        <span>Height: {pokemon.height} | </span>
                        <span>Weight: {pokemon.weight}</span>
                    </label> 
                </div>

                <table className='details'>
                    <tbody>
                        <tr>
                            <td><h3>Base States</h3></td>
                        </tr>
                        {pokemon.stats.map((stat) => {
                            return(
                            <tr key={stat.stat.name}>
                                <td>{stat.stat.name}</td>
                                <td>
                                    {stat.base_stat}
                                    <progress max='100' value={stat.base_stat}/>
                                </td>
                            </tr>
                            );
                        })}
                        <tr>
                            <td><h3>Abilities</h3></td>
                        </tr>
                        {pokemon.abilities.map((ability) => {
                            return(
                            <tr key={ability.ability.name}>
                                <td>{ability.ability.name}</td>
                            </tr>
                            );
                        })}
                        
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default Modal;