import { Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import Comment from "../Comment/Comment"

// Este es el componente que muestra los comentarios de una publicacion en el modal
function CommentsModal({ isOpen, onClose, post }) {

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
        <ModalOverlay />
        <ModalContent bg={'black'} border={'1px solid gray'} maxWidth={'400px'}>
          <ModalHeader>Commentarios</ModalHeader>
          <ModalCloseButton />
          <ModalBody paddingBottom={6}>
            <Flex marginBottom={4} gap={4} flexDirection={'column'} maxHeight={'250px'} overflowY={'auto'}>
              {post.comments.map((comment, idx) => (
                <Comment key={idx} comment={comment}  />
              ))}
            </Flex>
            <form style={{ marginTop: '2rem' }}>
              <Input placeholder='commentar esta publicacion' size={'sm'} />
              <Flex width={'full'} justifyContent={'flex-end'}>
                <Button type>
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