import { Box, Flex, Text } from '@chakra-ui/react'
import { BsBookmark, BsGrid3X3 } from 'react-icons/bs'
import { ReelsLogo } from '../../assets/Constants'
import { MdOutlinePersonPin } from "react-icons/md";

// Esta componente va a mostrar los tabs del Perfil del usuario, como 'Publicaciones', 'Reels', 'Guardado' y 'Etiquetadas'
function ProfileTabs() {
  return (
    <>
      <Flex width={'full'} justifyContent={'center'} gap={{ base: 4, sm: 10 }} transform={'uppercase'} fontWeight={'bold'}>

        {/** Esta primer Flex va a ser sobre las Publicaciones */}
        <Flex borderTop={'1px solid white'} alignItems={'center'} padding={3} gap={1} cursor={'pointer'}>
          <Box fontSize={20}>
            <BsGrid3X3 />
          </Box>
          <Text fontSize={14} display={{ base: 'none', sm: 'block' }}>Publicaciones</Text>
        </Flex>

        {/** Este segundo Flex va a ser sobre los Reels  */}
        <Flex alignItems={'center'} padding={3} gap={1} cursor={'pointer'}>
          <Box fontSize={20}>
            <ReelsLogo />
          </Box>
          <Text fontSize={14} display={{ base: 'none', sm: 'block' }}>Reels</Text>
        </Flex>

        {/** Este tercer Flex va a ser sobre los Guadados */}
        <Flex alignItems={'center'} padding={3} gap={1} cursor={'pointer'}>
          <Box fontSize={20}>
            <BsBookmark />
          </Box>
          <Text fontSize={14} display={{ base: 'none', sm: 'block' }}>Guardado</Text>
        </Flex>

        {/** Este cuarto Flex va a ser sobre las Etiquetadas */}
        <Flex alignItems={'center'} padding={3} gap={1} cursor={'pointer'}>
          <Box fontSize={20}>
            <MdOutlinePersonPin />
          </Box>
          <Text fontSize={14} display={{ base: 'none', sm: 'block'}}>Etiquetadas</Text>
        </Flex>

      </Flex>
    </>
  )
}

export default ProfileTabs