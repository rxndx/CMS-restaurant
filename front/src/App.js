import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import MenuView from './features/MENU/MenuView';
import DishesView from './features/MENU/DishesView';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/menu" element={<MenuView />} />
                    <Route path="/menu/:menuId/:dishId/:menuName" element={<DishesView />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;