import { Avatar, Button, Divider, Flex, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, VStack, useDisclosure } from "@chakra-ui/react"
import { AiFillHeart } from "react-icons/ai"
import { FaComment } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import Comment from "../Comment/Comment"
import PostFooter from '../FeedPosts/PostFooter'
import useUserProfileStore from "../../store/userProfileStore"
import useAuthStore from "../../store/authStore"
import useShowToast from "../../Hooks/useShowToast"
import { firestore, storage } from "../../Firebase/firebase"
import { deleteObject, ref } from "firebase/storage"
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore"
import usePostStore from "../../store/postStore"
import { useState } from "react"
import Caption from "../Comment/Caption"


// Este componente define la logica de cada publicacion que aparece en la seccion de Publicaciones en el 
// perfil de nuestra cuenta (Este componente es el hijo del componente ProfilePosts )
function ProfilePost ({ post }) {


  // Para agregar un modal se uso el hook useDisclosure de la libreria Chakra UI
  const { isOpen, onOpen, onClose } = useDisclosure();
	const userProfile = useUserProfileStore((state) => state.userProfile);
	const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();
	const [isDeleting, setIsDeleting] = useState(false);
	const deletePost = usePostStore((state) => state.deletePost);
	const decrementPostsCount = useUserProfileStore((state) => state.deletePost);

  // Esta funcion sera la encargada de eliminar un publicacion hecha por el usuario 
  const handleDeletePost = async () => {
    if(!window.confirm('¿Estas seguro de eliminar esta publicacion?')) return
    if(isDeleting) return

    try {
      // Va a tomar como referencia el id de la publicacion a eliminar
      const imageRef = ref(storage, `posts/${post.id}`)
      await deleteObject(imageRef)
      const userRef = doc(firestore, 'users', authUser.uid)
      await deleteDoc(doc(firestore, 'posts', post.id))

      await updateDoc(userRef, { 
        posts: arrayRemove(post.id)
      })

      deletePost(post.id)
      decrementPostsCount(post.id)
      showToast('Success','Se ha eliminado la publicación correctamente','success')

    } catch (error) {
      showToast('Error', error.message, 'error')

    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      {/** Este GridItem muestra la logica detras de cada publicacion dentro del componente ProfilePosts */}
      <GridItem cursor={'pointer'} borderRadius={4} overflow={'hidden'} border={'1px solid'} borderColor={'whiteAlpha.300'} position={'relative'}
        aspectRatio={1/1} onClick={onOpen}
      >

        {/** Esta pequeña seccion mostrara datos sobre likes y comentarios cuando se pasa el mouse por encima de alguna publicacion
         * esto es en base de cuando estamos mirando nuestra publicaciones en nuestro perfil
         */}
        <Flex opacity={0} _hover={{ opacity: 1 }} position={'absolute'} top={0} left={0} right={0} bottom={0} backgroundColor={'blackAlpha.700'}
          transition={'all 0.3s ease'} zIndex={1} justifyContent={'center'}
        >
          <Flex alignItems={'center'} justifyContent={'center'} gap={50}>

            {/** Este Flex mostrara la cantidad de Likes que se le han dado a la publicacion cuando se pasa el mouse por encima
             * de la misma
             */}
            <Flex>
              <AiFillHeart size={22} />
              <Text fontWeight={'bold'} marginLeft={1}>{post.likes.length}</Text>
            </Flex>

            {/** Este Flex mostrara la cantidad de comentarios que tiene una publicacion cuando se pasa el mouse por encima
             * de la misma
             */}
            <Flex>
              <FaComment size={22} />
              <Text fontWeight={'bold'} marginLeft={1}>{post.comments.length}</Text>
            </Flex>

          </Flex>

        </Flex>

        {/** Mientras no el mouse no este encima de alguna publicacion en nuestro perfil, por defecto mostrara la imagen respectiva
         * en cada publicacion en nuestro perfil
         */}
        <Image src={post.imageURL} alt='Publicacion en Instagram' width={'100%'} height={'100%'} objectFit={'cover'} />
      </GridItem>



      {/** A partir de aqui va a estar la logica de lo que seria el Modal cuando se hace click en alguna publicacion de nuestro perfil */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: '3xl', md: '5xl'}}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />

          {/** Aqui estara el cuerpo de lo que sera el Modal o lo que se va a mostrar del Modal */}
          <ModalBody backgroundColor={'black'} paddingBottom={5}>

            {/** Va a tener dos secciones */}
            <Flex gap={4} width={{ base: '90%', sm: '70%', md: 'full'}} marginX={'auto'} maxHeight={'90hv'} minHeight={'50vh'}>

              {/** La primer seccion sera nuevamente mostrar la publicacion a la cual se le dio click para mostrar el modal */}
              <Flex borderRadius={4} overflow={'hidden'} border={'1px solid'} borderColor={'whiteAlpha.300'} flex={1.5} justifyContent={'center'}
                alignItems={'center'}
              >
                <Image src={post.imageURL} alt='Publicacion en Instagram' style={{objectFit: 'cover'}} />
              </Flex>

              {/** La segunda seccion es mas para mostrar nuestro perfil y algunos detalles de la publicacion, ademas de mostrar comentarios
               * que posiblemente hayan hecho otras personas en nuestra publicacion y al mismo tiempo agregar un comentario
               */}
              <Flex flex={1} flexDirection={'column'} paddingX={10} display={{ base: 'none', md: 'flex'}}>

                {/** Este contenedor Flex esta la logica de informacion de nuestro perfil en el Modal de la publicacion */}
                <Flex alignItems={'center'} justifyContent={'space-between'}>

                  <Flex alignItems={'center'} gap={4}>
                    <Avatar src={userProfile.profilePicURL} size={'sm'} >
                    <Text fontWeight={'bold'} fontSize={12} textTransform={'lowercase'}>
                      {userProfile.userName}
                    </Text>
                    </Avatar>
                  </Flex>

                  {authUser?.uid === userProfile.uid && (
                    <Button size={'sm'} backgroundColor={'transparent'} _hover={{ backgroundColor: 'whiteAlpha.300', color: 'red.600'}} 
                    borderRadius={4} padding={1} onClick={handleDeletePost} isLoading={isDeleting} >
                      <MdDelete size={20} cursor={'pointer'} />
                    </Button>
                  )}

                </Flex>

                <Divider marginY={4} backgroundColor={'gray.500'} />

                {/** Este contenedor Flex esta la logica de los comentarios que podemos tener en nuestra publicacion, asi como tambiem
                 * la opcion de que otras personas comenten la publicacion
                 */}
                <VStack width={'full'} alignItems={'start'} maxHeight={'350px'} overflowY={'auto'}>

                  {/** El component comment es creado a parte y hace la referencia a todos los comentarios que pueden haber en una
                   * publicacion
                   */}
                  {post.caption && <Caption post={post} />}
                  {post.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment}/>
                  ))}

                </VStack>

                <Divider marginY={4} backgroundColor={'gray.500'} />

                {/** Debido a que se usa la misma logica de la parte de comentarios de las publicaciones en el Inicio de la aplicacion
                 * se reutiliza el componente PostFooter a diferente de que con ayuda de un Prop no se renderiza una seccion
                 */}
                <PostFooter isProfilePage={true} post={post} />

              </Flex>

            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfilePost