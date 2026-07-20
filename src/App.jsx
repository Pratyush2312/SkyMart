import React from 'react'
import Login from './pages/Login';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { MyStore } from './context/MyContext';
import Cart from './components/Cart';
const App = () => {
  const { isCartOpen } = useContext(MyStore);
  return (
    <div>
      <AppRoutes />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#101110",
            color: "#fff",
            border: "1px solid #333",
          },
        }}
      />
      {isCartOpen && <Cart />}
    </div>
  )
}

export default App
