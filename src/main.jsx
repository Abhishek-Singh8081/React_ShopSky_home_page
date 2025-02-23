import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProductContextWrapper from './components/context/ProductContextWrapper.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductContextWrapper>

    <App />
    </ProductContextWrapper>
  </StrictMode>,
)
