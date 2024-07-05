import { Avatar, Button, Center, Flex, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack } from '@chakra-ui/react'
import { useRef, useState } from 'react';
import useAuthStore from '../../store/authStore';
import usePreviousImage from '../../Hooks/usePreviousImage';
import useEditProfile from '../../Hooks/useEditProfile';
import useShowToast from '../../Hooks/useShowToast';

// Este componente va a renderizar un modal cuando demos click en el boton de Editar Perfil
// esto para editar datos de nuestro propio perfil en la aplcacion
function EditProfile({ isOpen, onClose }) {

  // Se hace uso de useState para almacenar los valores de los campos del modal
  const [inputs, setInputs] = useState({
    fullName: '',
    userName: '',
    bio: ''
  });

  // Con un useRef se realiza la funcion de cuando se de click en cambiar foto de perfil de una vez se vaya al administrador para
  // seleccion algun foto o imagen
  const authUser = useAuthStore((state) => state.user)
  const fileRef = useRef(null)
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviousImage()
  const { editProfile, isUpdating } = useEditProfile()
  const showToast = useShowToast()

  const handleEditProfile = async() => {
    try {
      await editProfile(inputs, selectedFile)
      setSelectedFile(null)
      onClose()
    } catch (error) {
      showToast('Error', error.message, 'error')
    }
  }


  return (
    <> 
      {/** Logica perteneciente al modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor={'black'} boxShadow={'xl'} border={'1px solid gray'} marginX={3}>
          <ModalHeader />
          <ModalCloseButton />

          {/** Cuerpo del modal */}
          <ModalBody>
            <Flex backgroundColor={'black'}>
              <Stack spacing={4} width={'full'} maxWidth={'md'} backgroundColor={'black'} padding={6} marginY={0}>

                {/** Titulo del modal */}
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl'}}>Editar Perfil</Heading>

                {/** Este primer FormControl pertenece a editar y/o cambio la foto de perfil */}
                <FormControl>
                  <Stack direction={['column', 'row']} spacing={6}>
                    <Center>
                      <Avatar size={'xl'} src={selectedFile || authUser.profilePicURL} border={'2px solid white'} />
                    </Center>
                    <Center width={'full'}>
                      <Button width={'full'} onClick={() => fileRef.current.click()}>Editar Foto de Perfil</Button>
                    </Center>
                    <Input type='file' hidden  ref={fileRef} onChange={handleImageChange}/>
                  </Stack>
                </FormControl>

                {/** Este segundo FormControl pertenece a cambiar el nombre completo */}
                <FormControl>
                  <FormLabel fontSize={'sm'}>Nombre Completo</FormLabel>
                  <Input placeholder='Nombre Completo' size={'sm'} type={'text'} value={inputs.fullName || authUser.fullName} 
                    onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
                  />
                </FormControl>

                {/** Este tercer FormControl pertenece a cambiar el nombre de usuario (nombre de pila) */}
                <FormControl>
                  <FormLabel fontSize={'sm'}>Nombre de Usuario</FormLabel>
                  <Input placeholder='Nombre de Usuario' size={'sm'} type={'text'} value={inputs.userName || authUser.userName} 
                    onChange={(e) => setInputs({...inputs, userName: e.target.value})}
                  />
                </FormControl>

                {/** Este cuarto FormControl pertenece a cambiar el Bio en la aplicacion (Biografia) */}
                <FormControl>
                  <FormLabel fontSize={'sm'}>Presentacion</FormLabel>
                  <Input placeholder='Presentacion' size={'sm'} type={'text'} value={inputs.bio || authUser.bio} 
                    onChange={(e) => setInputs({...inputs, bio: e.target.value})}
                  />
                </FormControl>

                <Stack spacing={6} direction={['column', 'row']}>
                  <Button backgroundColor={'red.400'} color={'white'} width={'full'} size={'sm'} _hover={{ backgroundColor: 'red.500'}}
                    onClick={onClose}
                  >
                    Cancelar Cambios
                  </Button>
                  <Button backgroundColor={'blue.400'} color={'white'} width={'full'} size={'sm'} _hover={{ backgroundColor: 'blue.500'}}
                    onClick={handleEditProfile} isLoading={isUpdating}
                  >
                    Guardar Cambios
                  </Button>
                </Stack>

              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditProfile