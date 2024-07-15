import { Box, Button, Flex, Link, Tooltip } from '@chakra-ui/react'
import { Link as RouterLink} from 'react-router-dom'
import { InstagramLogo, InstagramMobileLogo} from '../../assets/Constants'
import { BiLogOut } from 'react-icons/bi'
import useLogOut from '../../Hooks/useLogOut'
import SidebarItems from './SidebarItems'

// Este es el componente de la Barra lateral de la izquierda de toda la aplicacion
function Sidebar() {

  const { handleLogout, isLoggingOut } = useLogOut()

  return (
    <>
      {/** El Box del componente sidebar definira las medidas de la barra lateral de la izquierda */}
      <Box 
        height={'100vh'} borderRight={'1px solid'} borderColor={'whiteAlpha.300'} paddingY={8} position={'sticky'} top={0} left={0} 
        paddingX={{base: '2', md: '4'}}
      >

        { /** El titulo de la barra lateral */}
        <Flex direction={'column'} gap={10} width={'full'} height={'full'}>

          {/** La version de este primer link es de mostrar el titulo de la aplicacion */}
          <Link to={'/'} as={RouterLink} paddingLeft={2} display={{base: 'none', md: 'block'}} cursor={'pointer'}>
            <InstagramLogo />
          </Link>

          {/** La segunda version ya mostrara el icono de la aplicacion, esto es porque es cuando se vea en moviles */}
          <Link to={'/'} as={RouterLink} paddingLeft={2} display={{base: 'block', md: 'none'}} cursor={'pointer'} borderRadius={6} 
            _hover={{bg: 'whiteAlpha.200'}} width={10}
          >
            <InstagramMobileLogo />
          </Link>

          {/** En este cuadro Flex se mapea todos los iconos del array sidebarItems para mostrarlos */}
          <Flex direction={'column'} gap={5} cursor={'pointer'}>
            <SidebarItems />
          </Flex>

          {/** Esta ultima parte de la barra lateral de la izquierda corresponde al icono para cerrar sesion */}
          <Tooltip hasArrow label={'Cerrar Sesion'} placement='right' marginLeft={1} openDelay={500} display={{base: 'block', md: 'none'}}>
            <Flex onClick={handleLogout} alignItems={'center'} gap={4} _hover={{backgroundColor: 'whiteAlpha.400'}} borderRadius={6} 
              padding={2} width={{base: '10', md: 'full'}} marginTop={'auto'} justifyContent={{ base: 'center', md: 'flex-start' }}
            >
              <BiLogOut size={25} />
              <Button display={{base: 'none', md: 'block'}} variant={'ghost'} _hover={{ backgroundColor: 'transparent'}} isLoading={isLoggingOut}>
                Cerrar Sesion
              </Button>
            </Flex>
          </Tooltip>

        </Flex>
      </Box>
    </>
  )
}

export default Sidebar