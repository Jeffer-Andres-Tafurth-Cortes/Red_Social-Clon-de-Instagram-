import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

// Este componente definira lo que es el Header de cada publicacion del Inicio
function PostHeader({ post, creatorProfile }) {

  return (
    <>
      {/** El header de cada publicacion va a estar compuesto de varios elementos */}
      <Flex justifyContent={'space-between'} alignItems={'center'} width={'full'} marginY={2}>
        <Flex alignItems={'center'} gap={2}>

          {/** Primero esta la foto del usuario que hizo la respectiva publicacion */}
          <Link to={`${creatorProfile.userName}`}>
            <Avatar src={creatorProfile.profilePicURL} alt={userName} size={'sm'} /> 
          </Link>

          {/** Segundo estara el nombre del usuario y las semanas desde que hizo la publicacion */}
            <Flex fontSize={12} fontWeight={'bold'} gap={1}>
              <Link to={`${creatorProfile.userName}`}>{creatorProfile.userName}</Link>
              <Box color={'gray.500'}>
                • { Math.floor(Math.random() * 50) + 1 }w
              </Box>
            </Flex>

        </Flex>

        {/** Tercero estara el seguir o dejar de seguir */}
        <Box cursor={'pointer'}>
            <Text fontSize={12} color={'blue.500'} fontWeight={'bold'} _hover={{color: 'white'}} transition={'0.2 ease-in-out'}>
              Seguir
            </Text>
          </Box>
      </Flex>
    </>
  )
}

export default PostHeader