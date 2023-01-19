import { Link } from 'react-router-dom';
import { FiHome, FiHeart } from 'react-icons/fi';
import './header.css';

function Header(){

    return(
        <div className='nav-bar'>
            <div className='logo'>
                <Link to='/'>
                    <img src='https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png' alt='pokedex-logo'/>
                </Link>
            </div>
            <div className='actions'>
                <button>
                    <Link to='/'>
                        <FiHome size={17} color='#fff'/>
                        Home
                    </Link>
                </button>
                <button>
                    <Link to='/favorite'>
                        <FiHeart size={17} color='#fff'/>
                        Favorite
                    </Link> 
                </button> 
            </div>
            
        </div>
    );

}

export default Header;