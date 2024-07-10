import { Box, Container, Flex } from '@chakra-ui/react'
import FeedPosts from '../../Components/FeedPosts/FeedPosts'
import SuggestedUsers from '../../Components/SuggestedUsers/SuggestedUsers'

function HomePage() {
  return (
    <>
      {/** En este contendedor habra el Inicio de la aplicacion, en este caso serian publicaciones de fotos */}
      <Container maxWidth={'container.lg'}>

        {/** Va a estar dividido en dos secciones, la primera consta de las publicaciones del Inicio de la aplicacion
         * la segunda seccion sera de sugerencias de usuarios a seguir en la aplicacion
         */}

        <Flex gap={20}>

          {/** Primer seccion del Inicio de la aplicacion */}
          <Box flex={2} paddingY={10}>

            {/** Para mostrar las publicaciones de crea un componente aparte con la logica */}
            <FeedPosts />
          </Box>

          {/** La segunda seccion sera las sugerencias de usuarios a seguir */}
          <Box flex={3} marginRight={20} display={{base: 'none', lg: 'block'}} maxWidth={'300px'}> 
            <SuggestedUsers />
          </Box>
        </Flex>
      </Container>
    </>
  )
}

export default HomePage