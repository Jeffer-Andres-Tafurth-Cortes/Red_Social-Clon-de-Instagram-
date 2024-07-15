import { Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import Comment from "../Comment/Comment"
import usePostComment from '../../Hooks/usePostComment'
import { useEffect, useRef } from "react"

// Este es el componente que muestra los comentarios de una publicacion en el modal
function CommentsModal({ isOpen, onClose, post }) {

  // Se trae la logica del custom hoom 'usePostComment' para poder actualizar los comentarios en alguna publicacion
  const { handlePostComment, isCommeting } = usePostComment()

  // Este useRef se usa para controlar el valor actual de comentarios en cada publicacion
  const commentRef = useRef(null)

  // Este useRef se usa para controlar el contenedor de los comentarios en cada publicacion (barra de desplazamiento)
  const commentsContainerRef = useRef(null)

  // Se crea una funcion para tomar los respetivos valores del comentario para guardarlos
  const handleSubmitComment = async (e) => {
    e.preventDefault()
    await handlePostComment(post.id, commentRef.current.value)
    commentRef.current.value = ''
  }

  // Se crea un evento para mantener el scroll en la barra de desplazamiento de los comentarios
  useEffect(() => {
    const scrollToBottom = () => {
      commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight
    }
    if (isOpen) {
      setTimeout(() => {
        scrollToBottom()
      }, 100)
    }
  }, [isOpen, post.comments.length]);
 
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
        <ModalOverlay />
        <ModalContent bg={'black'} border={'1px solid gray'} maxWidth={'400px'}>
          <ModalHeader>Commentarios</ModalHeader>
          <ModalCloseButton />
          <ModalBody paddingBottom={6}>
            <Flex marginBottom={4} gap={4} flexDirection={'column'} maxHeight={'250px'} overflowY={'auto'} ref={commentsContainerRef}>
              {post.comments.map((comment, idx) => (
                <Comment key={idx} comment={comment}  />
              ))}
            </Flex>
            <form onSubmit={handleSubmitComment} style={{ marginTop: '2rem' }}>
              <Input placeholder='commentar esta publicacion' size={'sm'} ref={commentRef}/>
              <Flex width={'full'} justifyContent={'flex-end'}>
                <Button type='submit' marginLeft={'auto'} size={'sm'} isLoading={isCommeting}>
                  Publicar
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CommentsModal