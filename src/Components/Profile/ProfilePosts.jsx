import { Box, Flex, Grid, Skeleton, Text, VStack } from '@chakra-ui/react';
import ProfilePost from './ProfilePost';
import useGetUserPosts from '../../Hooks/useGetUserPosts';

// Este componente es el que define las publicaciones que hayamos hecho, que se mostraran en el perfil de nuestra cuenta
function ProfilePosts() {

  // Utilizamos el custom Hook useGetUserPosts para acceder a las publicaciones del usuario
  const { isLoading, posts } = useGetUserPosts()

  // Este es un mensaje que se muestra cuando no hay publicaciones en el perfil de nuestro usuario
  const noPostsFound = !isLoading && posts.length === 0
  if(noPostsFound) return <NoPostsFound />

  return (
    <>
      {/** Este Grid definira el efecto que se esta aplicando cuando este cargando el contenido */}
      <Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={1} columnGap={1}>

        {isLoading && [0, 1, 2].map((_,index) => (
          <VStack key={index} alignItems={'flex-start'} gap={4}>
            <Skeleton w={'full'}>
              <Box height={'300px'}>contenido</Box>
            </Skeleton>
          </VStack>  
        ))}

        {!isLoading && (
          <>
            {posts.map((post) => (
              <ProfilePost post={post} key={post.id} />
            ))}  
          </>
        )}

      </Grid>
    </>
  )
}

export default ProfilePosts

// Este es un componente que se muestra cuando no hay publicaciones en el perfil de nuestro usuario
function NoPostsFound(){
  return(
    <>
      <Flex flexDirection={'column'} textAlign={'center'} marginX={'auto'} marginTop={10}>
        <Text fontSize={'2xl'}>No se encontraron publicaciones</Text>
      </Flex>
    </>
  )
}