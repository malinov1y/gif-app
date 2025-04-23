import { Link } from 'react-router-dom';
import './navigation.scss';

const Navigation = () => {
    return (
        <nav className="navigation-links">
            <Link className="navigation-link" to="/gif/generateGifs" >Поиск GIFs</Link>
            <Link className="navigation-link" to="/gif/generateStikers" >Поиск Stikers</Link>
            <Link className="navigation-link" to="/gif/favorites" >Избранное</Link>
        </nav>
    );
};

export default Navigation;