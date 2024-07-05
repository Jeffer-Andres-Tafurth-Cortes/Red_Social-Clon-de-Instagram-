import { Box, Grid, Skeleton, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react'
import ProfilePost from './ProfilePost';

// Este componente es el que define las publicaciones que hayamos hecho, que se mostraran en el perfil de nuestra cuenta
function ProfilePosts() {

  // Agregamos un useState para poder agregar un efecto de que el contenido esta cargando
  const [isLoading, setIsLoading] = useState(true);

  // Agregamos un useEffect para que se ejecute una vez que se cargue el componente
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }, []);

  return (
    <>
      {/** Este Grid definira el efecto que se esta aplicando cuando este cargando el contenido */}
      <Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={1} columnGap={1}>
        {isLoading && [0, 1, 2, 3, 4, 5].map((_,index) =>  
          <VStack key={index} alignItems={'flex-start'} gap={4}>
            <Skeleton w={'full'}>
              <Box height={'300px'}>contenido</Box>
            </Skeleton>
          </VStack>  
        )}

        {!isLoading &&
          <>
            <ProfilePost src='/profilepic.png'  />
            <ProfilePost src='/Personal-Logo.png'  />
          </>
        }
      </Grid>
    </>
  )
}

export default ProfilePosts