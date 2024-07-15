import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react"
import useGetUserProfileById from "../../Hooks/useGetUserProfileById"
import { Link } from "react-router-dom"
import { timeAgo } from '../../Utils/timeAgo'

// Este componente define los comentarios que se ven cuando se da click en una publicacion de nuestro perfil
// (los comentarios se ven cuando a abre el Modal)
function Comment({ comment }) {

  const { userProfile, isLoading } = useGetUserProfileById(comment.createdBy)
  if (isLoading) return <CommentSkeleton />

  return (
    <>
      {/** Aqui va a estar la logica de  */}
      <Flex gap={4}>
        <Link to={`/${userProfile.userName}`}>
          <Avatar src={userProfile.profilePicURL} size={'sm'} />
        </Link>
        <Flex direction={'column'}>

          <Flex gap={2}>
          <Link to={`/${userProfile.userName}`}>
          <Text fontWeight={'bold'} fontSize={12}>
              {userProfile.userName}
            </Text>
          </Link>
          <Text fontSize={14} color={'gray.500'}>
            {comment.comment}
          </Text>
          </Flex>

          <Text fontSize={12} color={'gray'}>
            {timeAgo(comment.createdAt)}
          </Text>
          
        </Flex>
      </Flex>
    </>
  )
}

export default Comment

// Este componente es un skeleton para cuando se carga la informacion de un usuario
function CommentSkeleton(){
  return(
    <>
      <Flex gap={4} width={'full'} alignItems={'center'}>
        <SkeletonCircle height={10} width={10} />
        <Flex gap={1} flexDirection={'column'}>
          <Skeleton height={2} width={100} />
          <Skeleton height={2} width={50} />
        </Flex>
      </Flex>
    </>
  )
}