import { Container, Flex, Text, Link, SkeletonCircle, VStack, Skeleton } from '@chakra-ui/react'
import ProfileHeader from '../../Components/Profile/ProfileHeader'
import ProfileTabs from '../../Components/Profile/ProfileTabs'
import ProfilePosts from '../../Components/Profile/ProfilePosts'
import useGetUserProfileByUserName from '../../Hooks/useGetUserProfileByUserName'
import { useParams } from 'react-router-dom'
import { Link as RouterLink} from 'react-router-dom'

// Esta es la pagina de Perfil que se vera cuando un usuario haga click en su nombre en el menu lateral
function ProfilePage() {

  // Usamos el useParams para obtener el nombre de pila del usuario que estamos viendo su Perfil
  const { userName } = useParams()

  // Usamos el useGetUserProfileByUserName para obtener los datos del usuario que estamos viendo su Perfil
  const { isLoading, userProfile } = useGetUserProfileByUserName(userName)

  const userNotFound = !isLoading && !userProfile
  if(userNotFound) return <UserNotFound />

  return (
    <Container maxWidth={'container.lg'} paddingY={5}>

      {/** Dentro de la pagina del Perfil ya a estar el Header donde va a estar algunos datos de nuestra cuenta y algunas opciones
       * que se pueden realizar
       */}
      <Flex paddingY={10} paddingX={4} paddingLeft={{ base: 4, md: 10}} width={'full'} marginX={'auto'} flexDirection={'column'}> 
        {!isLoading && userProfile && <ProfileHeader />}
        {isLoading && <ProfileHeaderSkeleton />}
      </Flex>

      {/** Luego tendremos dos secciones la cual la primera corresponde a diferentes apartados que podemos acceder dentro de 
       * nuestro perfil y la segunda seccion es donde va a estar las publicaciones que nosotros hayamos hecho
       */}
      <Flex paddingX={{ base: 2, sm: 10}} maxWidth={'full'} marginX={'auto'} borderTop={'1px solid'} borderColor={'whiteAlpha.300'} 
        direction={'column'}>
        <ProfileTabs />
        <ProfilePosts />
      </Flex>
    </Container>
  )
}

export default ProfilePage

function ProfileHeaderSkeleton(){
  return(
    <>
      <Flex gap={{ base: 4, sm: 10}} paddingY={10} direction={{ base: 'column', sm: 'row'}} justifyContent={'center'} alignItems={'center'}>
        <SkeletonCircle size={24} />
        <VStack alignItems={{ base: 'center', sm: 'flex-star'}} gap={2} marginX={'auto'} flex={1}>
          <Skeleton height={'12px'} width={'150px'} />
          <Skeleton height={'12px'} width={'100px'} />
        </VStack>
      </Flex>
    </>
  )
}

// Este componente se mostrara cuando un usuario que intenta ver su Perfil no existe
function UserNotFound(){
  return (
    <>
      <Flex flexDirection={'column'} textAlign={'center'} marginX={'auto'}>
        <Text fontSize={'2xl'}>Usuario no encontrado</Text>
        <Link as={RouterLink} to={'/'} color={'blue.500'} width={'max-content'} marginX={'auto'}>
          Ir al Inicio
        </Link>
      </Flex>
    </>
  )  
}