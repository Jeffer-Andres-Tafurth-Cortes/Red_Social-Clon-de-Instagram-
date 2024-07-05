import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

// Para este proyecto se hizo uso de la libreria Chakra UI para el tema de los componentes
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

// Importamos mode de Chakra UI para poder configurar el theme en la aplicacion
import {mode} from '@chakra-ui/theme-tools'


// Configuracion del estilo para determinar como global el theme
const style = {
  global:(props) => ({
    body:{
      bg:mode('gray.100', '#000')(props),
      color:mode('gray.800', '#fff')(props)
    }
  })
}

// Esta configuracion proviene de Chakra UI para determinar el theme
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

// Se crea un theme para poder extender y usar el config y el style de arriba
const theme = extendTheme({ config, style })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Se crea un provider para poder usar el theme y por ende tambien poder usar Charkra UI */}
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
