import React from 'react'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import { Box, Image } from '@chakra-ui/react'

// Esta es la componente que representa una publicacion (post)
function FeedPost({ userName, src, avatar, comment }) {
  return (
    <>
      {/** El primer componente es el Header de la publicacion  */}
      <PostHeader userName={userName} src={src} avatar={avatar} /> 

      {/** Sigue el contenido de la publicacion */}
      <Box marginY={2} borderRadius={4} overflow={'hidden'}>
        <Image src={src} alt={userName}/>
      </Box>

      {/** Por ultimo, el Footer de la publicacion */}
      <PostFooter userName={userName} comment={comment} />
    </>
  )
}

export default FeedPost