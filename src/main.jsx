import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import MovieList from "./components/MovieList.jsx";
import MovieInfo from "./components/MovieInfo.jsx";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:title" element={<MovieInfo />} />
        </Routes>
    </BrowserRouter>
)
