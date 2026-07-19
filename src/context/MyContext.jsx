import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
export const MyStore = createContext();
import toast from "react-hot-toast";


export const MyStoreProvider = ({ children }) => {
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('sm_users')) || []);
    const [products, setProducts] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("sm_cart")) || []);
    const fetchProducts = async () => {
        try {
            const response = await axios("https://fakestoreapi.com/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }

    }

    const addToCart = (product) => {
        let cartItem = cart.find(item => item.id === product.id);
        if (cartItem) {
            let updatedCart = cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            localStorage.setItem("sm_cart", JSON.stringify(updatedCart));
            setCart(updatedCart);
            toast.success("Quantity updated");
            return;
        }
        let updatedCart = [...cart, { ...product, quantity: 1 }];
        setCart(updatedCart);
        localStorage.setItem("sm_cart", JSON.stringify(updatedCart));
        toast.success("Added to cart");
    }

    useEffect(() => {
        fetchProducts();
    }, [])
    return <MyStore.Provider value={{ users, setUsers, products, setProducts, fetchProducts, isCartOpen, setIsCartOpen, addToCart, cart, setCart }}>
        {children}
    </MyStore.Provider>
}