import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { AppContextProvider } from './context/AppContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>,
)
