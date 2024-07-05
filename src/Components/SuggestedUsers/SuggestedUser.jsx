import { Avatar, Box, Button, Flex, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react';

// Este componente define la logica que lleva cada usuario sugerido que aparece en el Inicio de la aplicacion
// en la parte derecha (hablando para vista desde PC)
function SuggestedUser({name, avatar, followers}) {

  // Se usa un useState para determinar si sigue o no a una cuenta dentro de los usuarios sugeridos
  const [isFollowed, setIsFollowed] = useState(false);

  // La funcion handleClickFollow determina cuando se sigue o se dejar de seguir un usuario dentro de los usuarios sugerido
  const handleClickFollow = () => {
    setIsFollowed(!isFollowed) // Se cambia el estado de isFollowed al valor opuesto
  }

  return (
    <>
      {/** Estara compuesta por algunos usuarios sugeridos y la opcion de seguir dichos usuarios */}
      <Flex justifyContent={'space-between'} alignItems={'center'} width={'full'}>
        <Flex alignItems={'center'} gap={2}>

          {/** Aqui se muestra la foto de un usuario sugerido */}
          <Avatar src={avatar} alt={name} size={'md'} />

          {/** Dentro de este VStack esta lo que es el nombre del usuario y la cantidad de seguidores que tiene dicho usuario */}
          <VStack spacing={2} alignItems={'flex-start'}>
            <Box fontSize={12} fontWeight={'bold'}>{name}</Box>
            <Box fontSize={11} color={'gray.500'}>{followers} seguidores</Box>
          </VStack>
        </Flex>

        {/** Este Boton ejecuta la funcion handleClickFollow */}
        <Button onClick={handleClickFollow} fontSize={13} backgroundColor={'transparent'} padding={0} height={'max-content'} 
          fontWeight={'medium'} color={'blue.400'} cursor={'pointer'} _hover={{ color: 'white'}}
        >
          {isFollowed ? 'Dejar de seguir' : 'Seguir'}
          </Button>

      </Flex>
    </>
  )
}

export default SuggestedUser