import { Link } from 'react-router-dom';
import './navigation.scss';

const Navigation = () => {
    return (
        <nav className="navigation-links">
            <Link className="navigation-link" to="/gif-app/generateGifs" >Поиск GIFs</Link>
            <Link className="navigation-link" to="/gif-app/generateStickers" >Поиск Stickers</Link>
            <Link className="navigation-link" to="/gif-app/favorites" >Избранное</Link>
        </nav>
    );
};

export default Navigation;