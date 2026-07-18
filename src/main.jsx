import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { MyStoreProvider } from './context/MyContext';

createRoot(document.getElementById('root')).render(
  <MyStoreProvider> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MyStoreProvider>
)
