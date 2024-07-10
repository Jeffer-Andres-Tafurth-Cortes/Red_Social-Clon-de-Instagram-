import { Avatar, Flex, Text } from "@chakra-ui/react"

// Este componente define los comentarios que se ven cuando se da click en una publicacion de nuestro perfil
// (los comentarios se ven cuando a abre el Modal)
function Comment({ comment }) {
  return (
    <>
      {/** Aqui va a estar la logica de  */}
      <Flex gap={4}>
        <Avatar src={profilePic} name={userName} size={'sm'} />
        <Flex direction={'column'}>

          <Flex gap={2}>
            <Text fontWeight={'bold'} fontSize={12}>
              {userName}
            </Text>
            <Text fontSize={14} color={'gray.500'}>
              {comment.comment}
            </Text>
          </Flex>

          <Text fontSize={12} color={'gray'}>
            {createdAt}
          </Text>
          
        </Flex>
      </Flex>
    </>
  )
}

export default Comment