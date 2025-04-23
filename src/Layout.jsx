import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import GenerateGifs from './components/GenerateGifs/GenerateGifs'
import Favorites from './components/Favorites/Favorites';

const Layout = () => {
    return (
        <div>
            <Navigation />

            <Routes>
                <Route path="/gif-app/generateGifs" element={<GenerateGifs />} />
                <Route path="/gif-app/favorites" element={<Favorites />} />
            </Routes>
        </div>
    );
};

export default Layout;