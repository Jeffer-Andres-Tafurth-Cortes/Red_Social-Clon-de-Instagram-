import { Box, Flex, Tooltip, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Button } from "@chakra-ui/react"
import { SearchLogo } from "../../assets/Constants"
import { useRef } from "react"
import useSearchUser from "../../Hooks/useSearchUser"
import SuggestedUser from'../SuggestedUsers/SuggestedUser'

// Este es el componente de buscar en la barra lateral de la izquierda de la aplicación
function Search() {

  // Utilizamos el useDisclosure para controlar el estado de la modal de busqueda
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { isLoading, user, getUserProfile, setUser } = useSearchUser()

  const searchRef = useRef(null)

  const handleSearchUser = (e) => {
    e.preventDefault()
    getUserProfile(searchRef.current.value)
  }
  console.log(user);

  return (
    <>
      {/** Todo este 'Tooltip' pertenece al boton de Buscar en la barra lateral de la izquierda */}
      <Tooltip hasArrow label={'Search'} placement='right' marginLeft={1} 
        openDelay={500} display={{base: 'block', md: 'none'}}
      >
        <Flex display={'flex'} alignItems={'center'} gap={4} _hover={{backgroundColor: 'whiteAlpha.400'}} borderRadius={6} padding={2} 
          width={{base: '10', md: 'full'}} justifyContent={{base: 'center', md: 'flex-start'}} onClick={onOpen}
        >
          <SearchLogo size={25} />
          <Box display={{base: 'none', md: 'block'}}>
            Buscar
          </Box>
        </Flex>
      </Tooltip>


      {/** Este modal se muestra cuando se de click en el boton de buscar */}
      <Modal isOpen={isOpen} onClose={onClose} motionPresent='slideInLeft'>
        <ModalOverlay />
        <ModalContent backgroundColor={'black'} border={'1px solid gray'} maxWidth={'400px'}>
          <ModalHeader>Buscar Usuario</ModalHeader>
          <ModalCloseButton />
          <ModalBody paddingBottom={6}>
            <form onSubmit={handleSearchUser}>
              <FormControl>
                <FormLabel>Nombre del usuario</FormLabel>
                <Input placeholder="Escriba el nombre de algun usuario" ref={searchRef} />
              </FormControl>
              <Flex width={'full'} justifyContent={'flex-end'}>
                <Button type='submit' marginLeft={'auto'} size={'sm'} marginY={4} isLoading={isLoading}>
                  Buscar
                </Button>
              </Flex>
            </form>
            {user && <SuggestedUser user={user} setUser={setUser} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Search