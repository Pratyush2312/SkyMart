import React from 'react'
import Login from './pages/Login';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';
const App = () => {
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
    </div>
  )
}

export default App
