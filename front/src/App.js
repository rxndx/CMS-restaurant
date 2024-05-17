import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import MenuView from './features/MENU/MenuView';
import DishesView from './features/MENU/DishesView';
import BrandView from './features/BRAND/BrandView';
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Navigation />
                <Routes>
                    <Route path="/brand/:brandName" element={<BrandView />} />
                    <Route path="/menu" element={<MenuView />} />
                    <Route path="/menu/:menuId/:dishId/:menuName" element={<DishesView />} />
                </Routes>
                <Footer />
            </Router>
        </Provider>
    );
}

export default App;