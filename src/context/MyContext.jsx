import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const MyStore = createContext();


export const MyStoreProvider = ({ children }) => {
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('sm_users')) || []);
    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        try {
            const response = await axios("https://fakestoreapi.com/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }

    }

    useEffect(() => {
        fetchProducts();
    }, [])
    return <MyStore.Provider value={{ users, setUsers, products, setProducts, fetchProducts }}>
        {children}
    </MyStore.Provider>
}