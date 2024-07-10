import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../assets/Constants'
import usePostComment from '../../Hooks/usePostComment';
import useAuthStore from '../../store/authStore';
import useLikePost from '../../Hooks/useLikePost';

// Este componente definira el Footer perteneciente a las publicaciones del Inicio
function PostFooter({ post, username, isProfilePage }) {

  // Se trae la logica del custom hoom 'usePostComment' para poder actualizar los comentarios en alguna publicacion
  const { handlePostComment, isCommenting } = usePostComment()

  // Este useState se usa para controlar el estado de la seccion de comentarios en cada publicacion
  const [comment, setComment] = useState('')

  const authUser = useAuthStore((state) => state.user)

  const commentRef = useRef(null)

  const {isLiked, likes, handleLikePost} = useLikePost(post)

  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment)
    setComment('')
  }

  return (
    <>
      <Box marginBottom={10} marginTop={'auto'}>
        {/** El footer de cada publicacion va a estar compuesto de varios elementos */}
        <Flex alignItems={'center'} gap={4} width={'full'} paddingTop={0} marginBottom={2} marginTop={4}>

          {/** El primer elemento consta de el icono de darle like en cada publicacion del Inicio de la aplicacion */}
          <Box onClick={handleLikePost} cursor={'pointer'} fontSize={18}>
            {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
          </Box>

          {/** El segundo elemento se trata de la parte en donde estara el icono de los comentarios de cada publicacion */}
          <Box cursor={'pointer'} fontSize={18} onClick={() => commentRef.current.focus()}>
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

        {authUser &&
          (
            <>
              {/** El quinto elemento consta de la seccion para escribir un comentario en cada publicacion */}
              <Flex alignItems={'center'} gap={2} justifyContent={'space-between'} width={'full'}>

                {/** La seccion de comentar estara dividida en dos partes */}
                <InputGroup>
            
                  {/** La primer seccion consta del input para escribir el respectivo comentario en la publicacion */}
                  <Input variant={'flushed'} placeholder={'Agrega un comentario ...'} fontSize={14} onChange={(e) => setComment(e.target.value)}
                    value={comment} ref={commentRef}
                  />
            
                  {/** La segunda seccion consta del boton a clickear para compartir el comentario escrito en el Input anterior */}
                  <InputRightElement>
                    <Button fontSize={14} color={'blue.500'} fontWeight={600} cursor={'pointer'} _hover={{color: 'white'}} 
                      backgroundColor={'transparent'} onClick={handleSubmitComment} isLoading={isCommenting}
                    >
                      Enviar
                    </Button>
                  </InputRightElement>
            
                </InputGroup>
              </Flex>
            
            </>
        )}

      </Box>
    </>
  )
}

export default PostFooter