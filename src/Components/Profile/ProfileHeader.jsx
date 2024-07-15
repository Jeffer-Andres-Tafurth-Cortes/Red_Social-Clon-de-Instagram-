import { Avatar, AvatarGroup, Button, Flex, Text, VStack, useDisclosure } from "@chakra-ui/react"
import useUserProfileStore from "../../store/userProfileStore"
import useAuthStore from '../../store/authStore'
import EditProfile from "./EditProfile"
import useFollowUser from "../../Hooks/useFollowUser"

// Este componente define el Header que vemos cuando accedemos a nuestro perfil en la aplicacion
function ProfileHeader() {

  // Utilizamos el custom Hook useUserProfileStore para acceder a la informacion de nuestro perfil
  const { userProfile } = useUserProfileStore() 

  // Este es un modal que se abre cuando vamos a editar nuestros datos de nuestro perfil
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { isFollowing, isUpdating, handleFollowUser} = useFollowUser(userProfile?.uid)

  const authUser = useAuthStore((state) => state.user)
  // Este es un booleano que indica si estamos viendo nuestro propio perfil o no
  const visitingOwnProfileAndAuth = authUser && authUser.userName === userProfile.userName
  const visitingAnotherUserProfileAndAuth = authUser && authUser.userName !== userProfile.userName

  return (
    <>
      <Flex gap={{base: 4, sm: 10}} paddingY={10} direction={{ base: 'column', sm: 'row'}}>

        {/** Aqui esta definido la imagen que tenemos asociada a nuestro perfil */}
        <AvatarGroup size={{ base: 'xl', md: '2xl'}} justifySelf={'center'} alignSelf={'flex-start'} marginX={'auto'}>
          <Avatar src={userProfile.profilePicURL} name={userProfile.fullName} />
        </AvatarGroup>

        {/** Esta VStack seccion va a contener informacion de nuestra cuenta y algunas opciones que podemos hacer en funcion
         * de nuestro perfil  
           */}
        <VStack alignItems={'start'} gap={2} marginX={'auto'} flex={1}>
          <Flex gap={4}  direction={{ base: 'column', sm: 'row' }} justifyContent={{ base: 'center', sm: 'flex-start'}} alignItems={'center'} 
            width={'full'}
          >
            <Text fontSize={{base: 'sm', md: 'lg'}}>{userProfile.userName}</Text>

            {/** Se exporta esta parte si el usuario esta mirando su propio perfil en la aplicacion */}
            {visitingOwnProfileAndAuth && (
              <>
                <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
                  <Button backgroundColor={'white'} color={'black'} _hover={{backgroundColor: 'whiteAlpha.800'}} size={{ base: 'sx', md: 'sm'}}
                    onClick={onOpen}
                  >
                    Editar Perfil
                  </Button>
                </Flex>
              </>
            )}

            {/** Se exporta esta parte si el usuario esta mirando otro perfil de otro usuario en la aplicacion */}
            {visitingAnotherUserProfileAndAuth && (
              <>
                <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
                  <Button backgroundColor={'blue.500'} color={'white'} _hover={{backgroundColor: 'blue.600'}} size={{ base: 'sx', md: 'sm'}}
                    onClick={handleFollowUser} isLoading={isUpdating}
                  >
                    {isFollowing ? 'Dejar de seguir': 'Seguir'}
                  </Button>
                </Flex>
              </>
            )}

          </Flex>

          {/** Aqui estara la informacion respecto a publicaciones, seguidores y seguidos */}
          <Flex alignItems={'center'} gap={{ base: 2, sm: 4 }}>

            {/** Esta parte pertenece en cuanto a las publicacion */}
            <Text fontSize={{ base: 'xs', md: 'sm' }}> 
              <Text as={'span'} fontWeight={'bold'} marginRight={1}>{userProfile.posts.length}</Text>
              Publicaciones
            </Text>

            {/** Esta parte pertenece en cuanto a los seguidores */}
            <Text fontSize={{ base: 'xs', md: 'sm' }}>
              <Text as={'span'} fontWeight={'bold'} marginRight={1}>{userProfile.followers.length}</Text>
              Seguidores
            </Text>

            {/** Esta parte pertenece en cuanto a los seguidos */}
            <Text fontSize={{ base: 'xs', md: 'sm' }}>
              <Text as={'span'} fontWeight={'bold'} marginRight={1}>{userProfile.following.length}</Text>
              Seguidos
            </Text>

          </Flex>

          <Flex alignItems={'center'} gap={4}>
            <Text fontSize={'sm'} fontWeight={'bold'}>{userProfile.fullName}</Text>
          </Flex>
          <Text fontSize={'sm'}>{userProfile.bio}</Text>
        </VStack>

      </Flex>

      {isOpen && <EditProfile isOpen={isOpen} onClose={onClose}/>}

    </>
  )
}

export default ProfileHeader