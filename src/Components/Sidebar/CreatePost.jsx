import { Box, Button, CloseButton, Flex, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, Tooltip, useDisclosure } from "@chakra-ui/react"
import { CreatePostLogo } from "../../assets/Constants"
import { BsFillImageFill } from "react-icons/bs"
import { useRef, useState } from "react"
import usePreviousImage from '../../Hooks/usePreviousImage'
import useShowToast from "../../Hooks/useShowToast"
import usePostStore from "../../store/postStore"
import useUserProfileStore from "../../store/userProfileStore"

// Este es el componente define en la barra lateral izquierda la opcion de crear publicacion en la aplicacion
function CreatePost() {

  // Utilizamos el useDisclosure para controlar el estado de la modal de crear publicaciones
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Usamos un useState para manejar el estado del texto que se puede agregar 
  const [caption, setCaption] = useState('')

  // Usamos un useRef para manejar el estado del input file que se utiliza para seleccionar la imagen
  const imageRef = useRef(null)
  
  const { selectedFile, handleImageChange, setSelectedFile } = usePreviousImage()

  return (
    <>
      {/** Este 'Tooltip' define la opcion de crear publicaciones */}
      <Tooltip hasArrow label={'Create'} placement='right' marginLeft={1} 
        openDelay={500} display={{base: 'block', md: 'none'}}
      >
        <Flex display={'flex'} alignItems={'center'} gap={4} _hover={{backgroundColor: 'whiteAlpha.400'}} onClick={onOpen}
          borderRadius={6} padding={2} width={{base: '10', md: 'full'}} justifyContent={{base: 'center', md: 'flex-start'}}
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
                <Image src={selectedFile} alt='Imagen seleecionada' />
                <CloseButton position={'absolute'} top={2} right={2} onClick={() => {setSelectedFile('')}} />
              </Flex>
            )}
          </ModalBody>
          <ModalFooter>
            <Button marginRight={3}>Publicar</Button>
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
  const [error, setError] = useState(null)
  const authUser = useAuthStore((state) => state.user)
  const createPost = usePostStore((state) => state.createPost)
  const addPost = useUserProfileStore((state) => state.addPost)
}