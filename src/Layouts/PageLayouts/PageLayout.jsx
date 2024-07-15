import { Box, Flex, Spinner } from "@chakra-ui/react"
import Sidebar from "../../Components/Sidebar/Sidebar"
import { useLocation } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../Firebase/firebase"
import Navbar from "../../Components/Navbar/Navbar"

function PageLayout({ children }) {

  const {pathname} = useLocation()
  const [user, loading] = useAuthState(auth)

  // Estas constantes nos permite hacer que cuando se refresque la pagina de autenticacion, no se vea de fondo
  // los otros componentes de la aplicacion
  const canRenderSidebar = pathname !== '/auth' && user
  const canRenderNavbar = !user && !loading && pathname !== '/auth'

  const checkingUserIsAuth  = !user && loading
  if(checkingUserIsAuth ) return <PageLayoutSpinner />

  return (
    <>
      <Flex flexDirection={canRenderNavbar ? 'column' : 'row'}>

        {/** A continuacion va a estar la estructura de la barra lateral de la izquierda de toda
         * la aplicacion cuando accedemos a ella */}

          {/** Se hace una comprobacion de la ruta para ver si esta o no en '/auth' */}
          {canRenderSidebar 
            ? ( <Box width={{base:'70px', md:'240px'}}>

              {/** Barra lateral de la izquierda, la cual va a ser un componente creado aparte */}
              <Sidebar />
  
            </Box> ) 
            : null
          }

          {canRenderNavbar ? <Navbar /> : null}

        <Box flex={1} width={{base: 'calc(100% - 70px)', md: 'calc(100% - 240px)'}} marginX={'auto'}>
          {children}
        </Box>

      </Flex>
    </>
  )
}

export default PageLayout

// Este componente es para mostrar un spinner cuando se esta cargando la aplicacion
function PageLayoutSpinner () {
  return (
    <>
      <Flex flexDirection={'column'} height={'100vh'} alignItems={'center'} justifyContent={'center'}>
        <Spinner size={'xl'}/>
      </Flex>
    </>
  )
}