import { Button, Container, Flex, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

// Esta es la componente que representa la barra de navegacion de la aplicacion cuando por ejemplo miramos algun perfil de un usuario
// pero no estamos ni logeados ni resgitrados en la aplicacion
function Navbar() {
  return (
    <>
      <Container maxWidth={'container.lg'} marginY={4}>
        <Flex width={'full'} justifyContent={{ base: 'none', sm: 'space-between'}} alignItems={'center'}>
          <Image src='/logo (1).png' height={20} display={{ base: 'none', sm: 'block'}} cursor={'pointer'} />
          <Flex gap={4}>
            <Link to={'/auth'}>
              <Button colorScheme={'blue'} size={'sm'}>Iniciar Sesion</Button>
            </Link>
            <Link to={'/auth'}>
              <Button variant={'outline'} size={'sm'}>Registrarme</Button>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </>
  )
}

export default Navbar