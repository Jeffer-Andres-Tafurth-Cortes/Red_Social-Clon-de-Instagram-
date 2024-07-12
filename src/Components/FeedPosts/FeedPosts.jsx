import { Box, Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from '@chakra-ui/react'
import FeedPost from './FeedPost'
import useGetFeedPost from '../../Hooks/useGetFeedPost'

// Este componente definira las publicaciones que se mostraran en el Inicio de la aplicacion al registrarse o
// al iniciar sesion
function FeedPosts() {

  // Se hace uso de useGetFeedPost para obtener las publicaciones del Inicio de la aplicacion
  const { isLoading, posts } = useGetFeedPost()

  return (
    <>
      <Container maxWidth={'container.sm'} paddingY={10} paddingX={2}>

        {/** Este es un efecto para cuando este cargando el contenido a mostrar de cada publicacion respectivamente */}
        {isLoading && [0,1,2,3].map((_,index) => (
          <VStack key={index} gap={4} alignItems={'flex-start'} marginBottom={10}>
            <Flex gap={2} >
              <SkeletonCircle size={10} />
              <VStack gap={2} alignItems={'flex-start'}>
                <Skeleton height={'10px'} width={'200px'} />
                <Skeleton height={'10px'} width={'200px'} />
              </VStack>
            </Flex>
            <Skeleton width={'full'}>
              <Box height={'400px'}>Elementos contenidos</Box>
            </Skeleton>
          </VStack>
        ))}

        {/* Se crea un componente llamado FeedPost para crear la logica de cada publicacion y despues
          * con props se pasa la informacion respectiva de cada publicacion que es lo que se va a ver 
          * en el inicio de la aplicacion 
        */}
        {!isLoading && posts.length > 0 && posts.map((post) => (
          <FeedPost key={post.id} post={post} />
        ))}

        {!isLoading && posts.length === 0 && (
          <>
            <Text fontSize={'md'} color={'red.400'}>
              Al parecer que no sigues a ninguna cuenta.
            </Text>
            <Text color={'red.400'}>Empieza a seguir alguna cuenta para que veas sus publicaciones</Text>
          </>
        )}

      </Container>
    </>
  )
}

export default FeedPosts