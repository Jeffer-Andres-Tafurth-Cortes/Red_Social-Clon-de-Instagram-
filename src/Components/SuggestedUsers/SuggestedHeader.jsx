import { Avatar, Flex, Text, Button } from '@chakra-ui/react'
import useLogOut from '../../Hooks/useLogOut'
import useAuthStore from '../../store/authStore'
import { Link } from 'react-router-dom'

// Este componente es el que define el Header del componente de usuarios sugeridos
function SuggestedHeader() {

  // En esta seccion utilizamos el Hook de React para manejar la logica de cerrar sesion de la aplicacion
  const {handleLogOut, isLogingOut} = useLogOut()

  const authUser = useAuthStore((state) => state.user)

  if(!authUser) return null

  return (
    <>
      <Flex justifyContent={'space-between'} alignItems={'center'} width={'full'}>
        <Flex alignItems={'center'} gap={2}>

          {/** En el Header tendremos foto y nombre de nuestra cuenta; ademas de un link extra para salir de la cuenta */}
          <Link to={`/:${authUser.userName}`}>
            <Avatar size={'md'} src={authUser.profilePicURL} />
          </Link>
          <Link to={`/:${authUser.userName}`}>
            <Text fontSize={13} fontWeight={'bold'}>{authUser.userName}</Text>
          </Link>
        </Flex>

        {/** Este link nos dirige a la pagina ya sea para Iniciar Seccion o Registrarnos  */}
        <Button size={ 'xs' } color={ 'blue.400' } backgroundColor={ 'transparent' } _hover={{ backgroundColor: 'transparent' }} fontSize={14}
          fontWeight={'medium'} cursor={'pointer'} onClick={handleLogOut} isLoading={isLogingOut}
        >
          Cerrar Sesion
        </Button>
      </Flex>
    </>
  )
}

export default SuggestedHeader