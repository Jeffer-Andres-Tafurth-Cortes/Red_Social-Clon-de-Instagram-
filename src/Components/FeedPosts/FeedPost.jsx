import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import { Box, Image } from '@chakra-ui/react'
import useGetUserProfileById from '../../Hooks/useGetUserProfileById'

// Esta es la componente que representa una publicacion (post)
function FeedPost({ post }) {

  const { userProfile } = useGetUserProfileById(post.createdBy)

  return (
    <>
      {/** El primer componente es el Header de la publicacion  */}
      <PostHeader post={post} creatorProfile={userProfile} /> 

      {/** Sigue el contenido de la publicacion */}
      <Box marginY={2} borderRadius={4} overflow={'hidden'}>
        <Image src={post.imageURL} alt={'Image de una publicaicon'}/>
      </Box>

      {/** Por ultimo, el Footer de la publicacion */}
      <PostFooter post={post} creatorProfile={userProfile} />
    </>
  )
}

export default FeedPost