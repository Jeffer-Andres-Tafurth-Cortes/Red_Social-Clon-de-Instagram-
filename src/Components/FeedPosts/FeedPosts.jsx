import { Box, Container, Flex, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import FeedPost from './FeedPost'

// Este componente definira las publicaciones que se mostraran en el Inicio de la aplicacion al registrarse o
// al iniciar sesion
function FeedPosts() {

  // Se hace uso de useState y useEffect para hacer un efecto de cuando cargue las publicacion del Inicio de la 
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

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
              <Box height={'500px'}>Elementos contenidos</Box>
            </Skeleton>
          </VStack>
        ))}

        {/* Se crea un componente llamado FeedPost para crear la logica de cada publicacion y despues
          * con props se pasa la informacion respectiva de cada publicacion que es lo que se va a ver 
          * en el inicio de la aplicacion 
        */}
        {!isLoading && (
          <>
            <FeedPost userName='burakor_mezz' src='/img1 (1).png' avatar='/img1 (1).png' comment='Maquillaje perfecto 🥰' />
            <FeedPost userName='juan-pablo-lopez' src='/img2 (1).png' avatar='/img2 (1).png' comment='Una foto antes de empezar la chamba 😎' />
            <FeedPost userName='martinaramirez15' src='/img3 (1).png' avatar='/img3 (1).png' comment='Hoy me siento bonita 😊🥰' />
            <FeedPost userName='alejandro_lopez' src='/img4 (1).png' avatar='/img4 (1).png' comment='Paisaje con el que me levanto el dia de hoy 😄😍' />
          </>
        )}

      </Container>
    </>
  )
}

export default FeedPosts