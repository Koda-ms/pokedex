import { useEffect, useState } from "react";
import './fav.css';

function Favorite(){
    const[favoritesList, setFavoritesList] = useState([]);

    useEffect(() => {
        function loadFavoritePokemons(){
            const favoriteList = localStorage.getItem("@pokedex");
            setFavoritesList(JSON.parse(favoriteList) || []);
        }
        loadFavoritePokemons();
    }, []);

    return(
        <div className='container-cont'>
            <div className='content-area'>
                {favoritesList.map((poke) => {
                    return(
                        <div className={`content ${poke.types[0].type.name}`} key={poke.id}>
                            <div>
                                <span>#{poke.id}</span>
                                <h4>{poke.name}</h4>
                            </div>
                            <img src={poke.sprites["front_default"]} alt=''/>
                            <table className='tb-pokemons'>
                                <tbody>
                                    <tr>
                                        {poke.types.map((type) => {
                                            return (
                                                <td key={type.type.name}>{type.type.name}</td>
                                            )
                                        })}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Favorite;