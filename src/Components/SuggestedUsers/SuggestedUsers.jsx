import { Text, Flex, VStack, Box, Link } from "@chakra-ui/react"
import SuggestedUser from "./SuggestedUser"
import SuggestedHeader from "./SuggestedHeader"
import useGetSuggestedUsers from "../../Hooks/useGetSuggestedUsers"

// Este componente es el que define la seccion de sugerencia de usuarios al lado derecho del Inicio de la aplicacion
function SuggestedUsers() {

  const { isLoading, suggestedUsers } = useGetSuggestedUsers()

  if(isLoading) return null

  return (
    <>
      {/** Aqui se mostraran los usuarios sugeridos, esta pequeña seccion estara dividida en dos partes */}
      <VStack paddingY={8} paddingX={6} gap={4}>

        {/** La primera comprende lo que es el Header que estara algunas cosas de nuestra cuenta */}
        <SuggestedHeader />

        {suggestedUsers.length !== 0 && (
          <Flex alignItems={'center'} justifyContent={'space-between'} width={'full'}>
            <Text fontSize={12} fontWeight={'bold'} color={'gray.500'}>Sugerencias para ti</Text>
            <Text fontSize={12} fontWeight={'bold'} color={'blue.500'} cursor={'pointer'}>Ver todos</Text>
          </Flex>
        )}   

        {/** En la segunda se mostrara algunos usuarios sugeridos */}
        {suggestedUsers.map((user) => (
          <SuggestedUser key={user.id} user={user} />
        ))}
        
        <Box fontSize={13} color={'gray.400'} marginTop={5} alignSelf={'start'}>
          &copy; Desarrollado por {' '}
          <Link href='https://www.linkedin.com/in/jeffer-andres-tafurth-cortes-369518212/' target='_blank' color={'blue.500'}>
            Jeffer Andres Tafurth Cortes
          </Link>
        </Box>
      </VStack>

    </>
  )
}

export default SuggestedUsers