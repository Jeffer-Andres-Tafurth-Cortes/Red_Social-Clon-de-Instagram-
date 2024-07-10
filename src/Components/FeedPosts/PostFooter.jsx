import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../assets/Constants'
import usePostComment from '../../Hooks/usePostComment';

// Este componente definira el Footer perteneciente a las publicaciones del Inicio
function PostFooter({ post, username, comment, isProfilePage }) {

  // Este useState es usando para cambiar el estado de cual se da like a una publicacion
  const [liked, setLiked] = useState(false);

  // Este otro useState se usa para definir el numero inicial de likes que hay en cada publicacion
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100))

  const { handlePostComment, isCommenting } = usePostComment()
  const [comment, setComment] = useState('')

  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment)
    setComment('')
  }

  // Esta funcion de onClick esta asociado a lo que se hace al darle like o quitarle el like a una publicacion
  const handleClickLikes = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1); // Se actualiza el numero de likes segun si se dio like o no
  }

  return (
    <>
      <Box marginBottom={10} marginTop={'auto'}>
        {/** El footer de cada publicacion va a estar compuesto de varios elementos */}
        <Flex alignItems={'center'} gap={4} width={'full'} paddingTop={0} marginBottom={2} marginTop={4}>

          {/** El primer elemento consta de el icono de darle like en cada publicacion del Inicio de la aplicacion */}
          <Box onClick={handleClickLikes} cursor={'pointer'} fontSize={18}>
            {!liked ? <NotificationsLogo /> : <UnlikeLogo />}
          </Box>

          {/** El segundo elemento se trata de la parte en donde estara el icono de los comentarios de cada publicacion */}
          <Box cursor={'pointer'} fontSize={18}>
            <CommentLogo />
          </Box>
        </Flex>

        {/** El tercer elemento muestra el numero de likes que hay en cada publicacion */}
        <Text>
          {likes} likes
        </Text>

        {/** El cuarto elemento se trata de la cantidad de comentarios que tiene cada publicacion */}
        {!isProfilePage && (
          <>
            <Text fontSize='sm' fontWeight={700}>
              {username}{' '}
              <Text as='span' fontWeight={400}>
                {comment}
              </Text>
            </Text>
            <Text fontSize='sm' color={'gray'}>
              Ver los {Math.floor(Math.random() * 100)} comentarios
            </Text>
          </>
        )}

        {/** El quinto elemento consta de la seccion para escribir un comentario en cada publicacion */}
        <Flex alignItems={'center'} gap={2} justifyContent={'space-between'} width={'full'}>

          {/** La seccion de comentar estara dividida en dos partes */}
          <InputGroup>

            {/** La primer seccion consta del input para escribir el respectivo comentario en la publicacion */}
            <Input variant={'flushed'} placeholder={'Agrega un comentario ...'} fontSize={14} onChange={(e) => setComment(e.target.value)} />

            {/** La segunda seccion consta del boton a clickear para compartir el comentario escrito en el Input anterior */}
            <InputRightElement>
              <Button fontSize={14} color={'blue.500'} fontWeight={600} cursor={'pointer'} _hover={{color: 'white'}} 
                backgroundColor={'transparent'} onClick={handleSubmitComment}
              >
                Enviar
              </Button>
            </InputRightElement>

          </InputGroup>
        </Flex>
      </Box>
    </>
  )
}

export default PostFooter