import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import GenerateGifs from './components/GenerateGifs/GenerateGifs'
import GenerateStickers from './components/GenerateStickers/GenerateStickers';
import Favorites from './components/Favorites/Favorites';

const Layout = () => {
    return (
        <div>
            <Navigation />

            <Routes>
                <Route path="/gif-app/generateGifs" element={<GenerateGifs />} />
                <Route path="/gif-app/generateStickers" element={<GenerateStickers />} />
                <Route path="/gif-app/favorites" element={<Favorites />} />
            </Routes>
        </div>
    );
};

export default Layout;