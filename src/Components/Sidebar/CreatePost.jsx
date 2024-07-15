import { Box, Button, CloseButton, Flex, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, Tooltip, useDisclosure } from "@chakra-ui/react"
import { CreatePostLogo } from "../../assets/Constants"
import { BsFillImageFill } from "react-icons/bs"
import { useRef, useState } from "react"
import usePreviousImage from '../../Hooks/usePreviousImage'
import useShowToast from "../../Hooks/useShowToast"
import usePostStore from "../../store/postStore"
import useUserProfileStore from "../../store/userProfileStore"
import useAuthStore from '../../store/authStore'
import { useLocation } from "react-router-dom"
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore'
import { firestore, storage } from '../../Firebase/firebase'
import { getDownloadURL, ref, uploadString } from "firebase/storage"

// Este es el componente define en la barra lateral izquierda la opcion de crear publicacion en la aplicacion
function CreatePost() {

  // Utilizamos el useDisclosure para controlar el estado de la modal de crear publicaciones
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Usamos un useState para manejar el estado del texto que se puede agregar 
  const [caption, setCaption] = useState('')

  // Usamos un useRef para manejar el estado del input file que se utiliza para seleccionar la imagen
  const imageRef = useRef(null)
  
  // Importamos el store de post y el store de usuario para poder usarlos
  const { selectedFile, handleImageChange, setSelectedFile } = usePreviousImage()

  const showToast = useShowToast();

  const { isLoading, handleCreatePost } = useCreatePost()

  // Esta funcion estara acompañada de cuando se le de click en el boton de crear publicacion 
  const handlePostCreation = async () => {
    try {
      await handleCreatePost(selectedFile, caption)
      onClose()
      setCaption('')
      setSelectedFile(null)
    } catch (error) {
      showToast('Error', error.message, 'error')
    }
  }

  return (
    <>
      {/** Este 'Tooltip' define la opcion de crear publicaciones */}
      <Tooltip hasArrow label={'Create'} placement='right' marginLeft={1} openDelay={500} display={{ base: 'block', md: 'none' }}>
        <Flex alignItems={'center'} gap={4} _hover={{ backgroundColor: 'whiteAlpha.400' }} onClick={onOpen}
          borderRadius={6} padding={2} width={{ base: '10', md: 'full' }} justifyContent={{ base: 'center', md: 'flex-start' }}
        >
          <CreatePostLogo size={25} />
          <Box display={{base: 'none', md: 'block'}}>
            Crear
          </Box>
        </Flex>
      </Tooltip>

      {/** Este 'Modal' define la ventana de crear publicaciones cuando se da click en la opcion de 'Crear' */}
      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent backgroundColor={'black'} border={'1px solid gray'}>
          <ModalHeader>Crear una nueva publicacion</ModalHeader>
          <ModalCloseButton />
          <ModalBody paddingBottom={6}>
            <Textarea placeholder='Escribe algo relacionado a la publicacion' value={caption} onChange={(e) => setCaption(e.target.value)} />
            <Input type='file' hidden ref={imageRef} onChange={handleImageChange} />
            <BsFillImageFill style={{ marginTop: '15px', marginLeft: '5px', cursor: 'pointer'}} size={16} onClick={() => imageRef.current.click()}/>
            
            {selectedFile && (
              <Flex marginTop={5} width={'full'} position={'relative'} justifyContent={'center'} >
                <Image src={selectedFile} alt='Imagen seleccionada' />
                <CloseButton position={'absolute'} top={2} right={2} onClick={() => {setSelectedFile(null)}} />
              </Flex>
            )}
            
          </ModalBody>
          <ModalFooter>
            <Button marginRight={3} onClick={handlePostCreation} isLoading={isLoading}>Publicar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePost

// Esta función se encarga de manejar el estado del texto y la imagen seleccionada para crear la publicación
function useCreatePost(){

  const showToast = useShowToast()
  const [isLoading, setIsLoading] = useState(false)
  const authUser = useAuthStore((state) => state.user)
  const createPost = usePostStore((state) => state.createPost)
  const addPost = useUserProfileStore((state) => state.addPost)
  const userProfile = useUserProfileStore((state) => state.userProfile)
  const { pathname } = useLocation()

  // Esta función se ejecuta cuando el usuario desee publicar una nueva publicación
  const handleCreatePost = async (selectedFile, caption) => {

    if (isLoading) return;

    // primero sacamos un error si no se selecciona algun archivo a publicar
    if(!selectedFile) throw new Error('Por favor seleccione una imagen')

    // Si el archivo si esta seleccionado, pues prosigue a cargar y luego a crear unos datos respecto a la publicacion
    setIsLoading(true)

    const newPost = {
      caption: caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uid,
    }

    try {
      // Agregamos la nueva publicacion a la coleccion de posts y al usuario que la creo
      const postDocRef = await addDoc(collection(firestore, 'posts'), newPost)
      const userDocRef = doc(firestore, 'users', authUser.uid)
      const imageRef = ref(storage, `posts/${postDocRef.id}`)

      // Actualizamos la caperta posts describa en la linea anterior con informacion URL de la imagen
      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) })
      await uploadString(imageRef, selectedFile, 'data_url')
      const downloadURL = await getDownloadURL(imageRef)

      await updateDoc(postDocRef, {imageURL: downloadURL})

      newPost.imageURL = downloadURL


      // Actualizamos el store de posts con la nueva publicacion
      if(userProfile.uid === authUser.uid) createPost({ ...newPost, id: postDocRef.id })
      if(pathname !== '/' && userProfile.uid === authUser.uid) addPost({...newPost, id:postDocRef.id})

      showToast('Success', 'Se ha realizado la publicacion correctamente', 'success')

    } catch (error) {
      showToast('Error', error.message, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return {isLoading, handleCreatePost}
}