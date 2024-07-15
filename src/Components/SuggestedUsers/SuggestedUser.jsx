import { Avatar, Box, Button, Flex, VStack } from '@chakra-ui/react'
import useAuthStore from '../../store/authStore'
import useFollowUser from '../../Hooks/useFollowUser'
import { Link } from 'react-router-dom' 

// Este componente define la logica que lleva cada usuario sugerido que aparece en el Inicio de la aplicacion
// en la parte derecha (hablando para vista desde PC)
function SuggestedUser({ user, setUser }) {

  // Se usa el custom hook useFollowUser para implementar la logica de seguir o dejar de seguir algun usuario
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid)
  const authUser = useAuthStore((state) => state.user)

  // Esta es la logica que se ejecuta cuando se hace click en el boton de seguir o dejar de seguir un usuario
  const onFollowUser = async () => {
    await handleFollowUser()
    setUser({
      ...user, 
      followers: isFollowing 
        ? user.followers.filter((follower) => follower.uid !== authUser.uid) 
        : [...user.followers, authUser]
    })
  }

  return (
    <>
      {/** Estara compuesta por algunos usuarios sugeridos y la opcion de seguir dichos usuarios */}
      <Flex justifyContent={'space-between'} alignItems={'center'} width={'full'}>
        <Flex alignItems={'center'} gap={2}>

          {/** Aqui se muestra la foto de un usuario sugerido */}
          <Link to={`/${user.userName}`}>
            <Avatar src={user.profilePicURL} size={'md'} />
          </Link>

          {/** Dentro de este VStack esta lo que es el nombre del usuario y la cantidad de seguidores que tiene dicho usuario */}
          <VStack spacing={2} alignItems={'flex-start'}>
            <Link to={`/${user.userName}`}>
              <Box fontSize={12} fontWeight={'bold'}>{user.fullName}</Box>
            </Link>
            <Box fontSize={11} color={'gray.500'}>{user.followers.length} seguidores</Box>
          </VStack>
        </Flex>

        {authUser.uid !== user.uid && (
          <>
            {/** Este Boton ejecuta la funcion handleFollowUser */}
            <Button onClick={onFollowUser} fontSize={13} backgroundColor={'transparent'} padding={0} height={'max-content'} fontWeight={'medium'}
              color={'blue.400'} cursor={'pointer'} _hover={{ color: 'white'}} isLoading={isUpdating}
            >
              {isFollowing ? 'Dejar de seguir' : 'Seguir'}
            </Button>
          </>
        )}
      </Flex>
    </>
  )
}

export default SuggestedUser