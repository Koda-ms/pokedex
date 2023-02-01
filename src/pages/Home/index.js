import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FiArrowRightCircle, FiArrowLeftCircle, FiSearch } from 'react-icons/fi';
import api, { getPokemonsData, listPokemons, getPokemonsTypes } from '../../services/api';
//import useTheme from "./use-theme";
import Modal from '../../components/Modal';
import './home.css';

function Home(){
    const[loading, setLoading] = useState(true);
    const[pokemonName, setPokemonName] = useState('');
    const[pokemonData, setPokemonData] = useState([]);
    const[pokemonDetail, setPokemonDetail] = useState([]);
    const[pokemonsTypes, setPokemonsTypes] = useState([]);
    const[postModal, setPostModal] = useState(false);
    const[page, setPage] = useState(0);
    const[totalPages, setTotalPages] = useState(0);

    const itensPerPage = 21;

    //useTheme(themes[themeIndex]);

    useEffect(() => {
        async function loadPokemons(){
      
           try {
            const data = await listPokemons(itensPerPage, itensPerPage*page);
            //console.log(data.results);
            const promises = data.results.map(async (pokemon) =>{
                return await getPokemonsData(pokemon.url);
            })
            
            const results = await Promise.all(promises);
            setPokemonData(results);

            const pokeTypes = await getPokemonsTypes();
            const typesResults = await Promise.all(pokeTypes.map(type => type.name));
            setPokemonsTypes(typesResults);

            setLoading(false);
            setTotalPages(Math.ceil (data.count / itensPerPage));
           } catch (error) {
            console.log('loading pokemons error: ', error);
           }
        }
        loadPokemons();
    }, [page]);

    async function showPokemon(){
        const toArray = [];

        await api.get(`pokemon/${pokemonName}`)
        .then((response) => {
            toArray.push(response.data);
            setPokemonData(toArray);
            const elem1 = document.getElementById('pages');
            const elem2 = document.getElementById('right-btn');
            elem1.style.display = 'none';
            elem2.style.display = 'none';
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

    function toggleModal(pokemon){
        setPostModal(!postModal);
        setPokemonDetail(pokemon);
    }

    function handlePage(action){
        setPage(action === 'next' ? page + 1 : page - 1);
    }

    // WORKING ON IT LATER
    function handleTypeFilter(type){
        alert("test")
    }
    
    return(
        <div className='container'>
            <div className='search-filter'>
                <form onSubmit={handleSearch}>
                    <label className='search-area'>
                        <input type='text' placeholder='Search pokemon'
                        onChange={(e) => setPokemonName(e.target.value.toLowerCase())}/>
                        <button type='submit'>
                            <FiSearch className='search-icon' size={18} color='#000'/>
                        </button>
                    </label>
                </form>

                <select className='slc-type'>
                    <option>Filter type</option>
                    {pokemonsTypes.map((type) => {
                        return(
                            <option onClick={handleTypeFilter(type)}>{type}</option>
                        )
                    })}
                </select>
            </div>

            {loading ? (<div>Loading info, hold on...</div>)
            : (
                <div className='content-area'>
                {pokemonData.map((pokemon) => {
                        return(
                            <div className={`content ${pokemon.types[0].type.name}`} key={pokemon.id}>
                                <div>
                                    <span>#{pokemon.id}</span>
                                    <h4 onClick={() => toggleModal(pokemon)}>{pokemon.name}</h4>
                                </div>
                                <img src={pokemon.sprites["front_default"]} alt=''/>
                                <table className='tb-pokemons'>
                                    <tbody>
                                        <tr>
                                            {pokemon.types.map((type) => {
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
            )}

            <label id='pages' className='page-num'>{page+1} of {totalPages}</label>
            
            <button id= 'right-btn' className='pagination-right' onClick={() => handlePage('next')}>
                <FiArrowRightCircle size={30} color='#121212'/>
            </button>

            {page !== 0 ? 
            (<button className='pagination-left' onClick={() => handlePage('back')}>
                <FiArrowLeftCircle size={30} color='#121212'/>
            </button>) : <></>}
            
            {postModal && (
                <Modal pokemon={pokemonDetail}
                close={toggleModal}/>
            )}
        </div>
    );

}

export default Home;