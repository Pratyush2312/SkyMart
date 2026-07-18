import { Route, Routes } from 'react-router'
import React from 'react'
import Register from './../pages/Register.jsx';
import Login from './../pages/Login';
import Home from './../pages/Home';
import Shop from '../pages/Products.jsx';
import About from './../pages/About';
import ProductDetails from '../pages/ProductDetails.jsx';

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/home' element={<Home />} />
                <Route path='/products' element={<Shop />} />
                <Route path='/about' element={<About />} />
                <Route path='/products/:id' element={<ProductDetails />} />
            </Routes>
        </div>
    )
}

export default AppRoutes
