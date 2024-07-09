import { Avatar, Box, Divider, Flex, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, VStack, useDisclosure } from "@chakra-ui/react"
import { AiFillHeart } from "react-icons/ai"
import { FaComment } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import Comment from "../Comment/Comment"
import PostFooter from '../FeedPosts/PostFooter'


// Este componente define la logica de cada publicacion que aparece en la seccion de Publicaciones en el 
// perfil de nuestra cuenta (Este componente es el hijo del componente ProfilePosts )
function ProfilePost({ post }) {

  // Para agregar un modal se uso el hook useDisclosure de la libreria Chakra UI
  const {isOpen, onOpen, onClose} = useDisclosure()

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
              <Text fontWeight={'bold'} marginLeft={1}>{Math.floor(Math.random() * 100)}</Text>
            </Flex>

            {/** Este Flex mostrara la cantidad de comentarios que tiene una publicacion cuando se pasa el mouse por encima
             * de la misma
             */}
            <Flex>
              <FaComment size={22} />
              <Text fontWeight={'bold'} marginLeft={1}>{Math.floor(Math.random() * 100)}</Text>
            </Flex>

          </Flex>

        </Flex>

        {/** Mientras no el mouse no este encima de alguna publicacion en nuestro perfil, por defecto mostrara la imagen respectiva
         * en cada publicacion en nuestro perfil
         */}
        <Image src={post.imageURL} alt='Publicacion en Instagram' />
      </GridItem>



      {/** A partir de aqui va a estar la logica de lo que seria el Modla cuando se hace click en alguna publicacion de nuestro perfil */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: '3xl', md: '5xl'}}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />

          {/** Aqui estara el cuerpo de lo que sera el Modal o lo que se va a mostrar del Modal */}
          <ModalBody backgroundColor={'black'} paddingBottom={5}>

            {/** Va a tener dos secciones */}
            <Flex gap={4} width={{ base: '90%', sm: '70%', md: 'full'}} marginX={'auto'}>

              {/** La primer seccion sera nuevamente mostrar la publicacion a la cual se le dio click para mostrar el modal */}
              <Box borderRadius={4} overflow={'hidden'} border={'1px solid'} borderColor={'whiteAlpha.300'} flex={1.5}>
                <Image src={post.imageURL} alt='Publicacion en Instagram' width={'full'} />
              </Box>

              {/** La segunda seccion es mas para mostrar nuestro perfil y algunos detalles de la publicacion, ademas de mostrar comentarios
               * que posiblemente hayan hecho otras personas en nuestra publicacion y al mismo tiempo agregar un comentario
               */}
              <Flex flex={1} flexDirection={'column'} paddingX={10} display={{ base: 'none', md: 'flex'}}>

                {/** Este contenedor Flex esta la logica de informacion de nuestro perfil en el Modal de la publicacion */}
                <Flex alignItems={'center'} justifyContent={'space-between'}>

                  <Flex alignItems={'center'} gap={4}>
                    <Avatar src='/Personal-Logo.png' size={'sm'} name='Jef_fur'>
                    <Text fontWeight={'bold'} fontSize={12} color={'white'} textTransform={'lowercase'}>
                      Jef_fur
                    </Text>
                    </Avatar>
                  </Flex>

                  <Box _hover={{ backgroundColor: 'whiteAlpha.300', color: 'red.600'}} borderRadius={4} padding={1}>
                    <MdDelete size={20} cursor={'pointer'} />
                  </Box>

                </Flex>

                <Divider marginY={4} backgroundColor={'gray.500'} />

                {/** Este contenedor Flex esta la logica de los comentarios que podemos tener en nuestra publicacion, asi como tambiem
                 * la opcion de que otras personas comenten la publicacion
                 */}
                <VStack width={'full'} alignItems={'start'} maxHeight={'350px'} overflowY={'auto'}>

                  {/** El component comment es creado a parte y hace la referencia a todos los comentarios que pueden haber en una
                   * publicacion
                   */}
                  <Comment createdAt={ `${Math.floor(Math.random() * 20)} min` } 
                    userName='Jef_fur' profilePic='/Personal-Logo.png' text='Empezando mi marca personal'
                  />

                  <Comment createdAt={ `${Math.floor(Math.random() * 20)} min` } 
                    userName='JuanCarlosAlvarado' profilePic='/profilepic.png' text='💻👨‍💻'
                  />

                  <Comment createdAt={ `${Math.floor(Math.random() * 20)} min` } 
                    userName='martinaramirez15' profilePic='/img3 (1).png' text='Con toda 💪'
                  />

                </VStack>

                <Divider marginY={4} backgroundColor={'gray.500'} />

                {/** Debido a que se usa la misma logica de la parte de comentarios de las publicaciones en el Inicio de la aplicacion
                 * se reutiliza el componente PostFooter a diferente de que con ayuda de un Prop no se renderiza una seccion
                 */}
                <PostFooter isProfilePage={true} />

              </Flex>

            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfilePost