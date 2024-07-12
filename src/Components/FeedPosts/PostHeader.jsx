import { Avatar, Box, Button, Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import useFollowUser from '../../Hooks/useFollowUser'

// Este componente definira lo que es el Header de cada publicacion del Inicio
function PostHeader({ post, creatorProfile }) {

  // importamos el custo hook 'useFollowUser' para obtener los datos de un usuario con respecto a una publicacion
  const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(post.createdBy)

  return (
    <>
      {/** El header de cada publicacion va a estar compuesto de varios elementos */}
      <Flex justifyContent={'space-between'} alignItems={'center'} width={'full'} marginY={2}>
        <Flex alignItems={'center'} gap={2}>

          {/** Primero esta la foto del usuario que hizo la respectiva publicacion */}
          {creatorProfile ? (
            <Link to={`${creatorProfile.userName}`}>
              <Avatar src={creatorProfile.profilePicURL} alt={creatorProfile.userName} size={'sm'} /> 
            </Link>
          ) : (
            <SkeletonCircle size={10} />
          )}

          {/** Segundo estara el nombre del usuario y las semanas desde que hizo la publicacion */}
            <Flex fontSize={12} fontWeight={'bold'} gap={2}>
              {creatorProfile ? (
                <Link to={`${creatorProfile.userName}`}>{creatorProfile.userName}</Link>
              ) : (
                <Skeleton width={'100px'} size={'10px'} />
              )}
              <Box color={'gray.500'}>
                • { Math.floor(Math.random() * 50) + 1 }w
              </Box>
            </Flex>
        </Flex>

          {/** Tercero estara el seguir o dejar de seguir */}
          <Box cursor={'pointer'}>
            <Button size={'xs'} backgroundColor={'transparent'} fontSize={12} color={'blue.500'} fontWeight={'bold'} _hover={{color: 'white'}} 
              transition={'0.2 ease-in-out'} onClick={handleFollowUser} isLoading={isUpdating}
            >
              {isFollowing ? 'Dejar de seguir' : 'Seguir'}
            </Button>
          </Box>
      </Flex>
    </>
  )
}

export default PostHeader