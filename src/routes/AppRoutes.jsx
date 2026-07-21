import { Route, Routes } from 'react-router'
import React from 'react'
import Register from './../pages/Register.jsx';
import Login from './../pages/Login';
import Home from './../pages/Home';
import Products from '../pages/Products.jsx';
import About from './../pages/About';
import ProductDetails from '../pages/ProductDetails.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import PublicRoute from './PublicRoute';

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path='/register'
                element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                } />
            <Route
                path='/'
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                } />
            <Route
                path="/home"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/products"
                element={
                    <ProtectedRoute>
                        <Products />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/products/:id"
                element={
                    <ProtectedRoute>
                        <ProductDetails />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/about"
                element={
                    <ProtectedRoute>
                        <About />
                    </ProtectedRoute>
                }
            />

        </Routes>


    )
}

export default AppRoutes
