import { Box, Flex, Image, Input, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import Login from './Login'
import SignUp from './SignUp'
import GoogleAuth from './GoogleAuth'

function AuthForm() {

  const [isLogin, setIsLogin] = useState(true)
  
  return (
    <>
      {/** Este es el formulario de autenticacion Inicialmente es de Iniciar Sesion */}
      <Box border={'1px solid gray'} borderRadius={4} padding={5}>
        <VStack spacing={4}>

          {/** Logo correspondiente a la aplicacion */}
          <Image src='/logo (1).png' height={24} cursor={'pointer'} alt='Logo de Instagram'/>

          {/** Operador ternario para mostrar el componente 'Registrarme' o 'Iniciar Sesion'
           * esto ya es de acuerdo al caso
           */}
          {isLogin ? <Login /> : <SignUp />}

          {/** Seccion donde esta la opcion de registrarse o de iniciar session con Google */}
          <Flex alignItems={'center'} justifyContent={'center'} marginY={4} gap={1} width={'full'}>
            <Box flex={2} height={'1px'} backgroundColor={'gray.400'} />
            <Text marginX={1} color={'white'}>OR</Text>
            <Box flex={2} height={'1px'} backgroundColor={'gray.400'} />
          </Flex>

          {/** Este componente ha sido creado aparte y se encarga ya sea de registrarse o de iniciar session en la aplicacion pero 
           * usando alguna cuenta o correo de Google directamente
           */}
          <GoogleAuth prefix={isLogin ? 'Iniciar Sesion' : 'registrarme'} />

        </VStack>
      </Box>

      {/** Aqui estara el formulario de autenticacion correspondiente a registrase en la aplicacion*/}
      <Box border={'1px solid gray'} borderRadius={4} padding={5}>
        <Flex alignItems={'center'} justifyContent={'center'}>
          <Box marginX={2} fontSize={14}>
            {isLogin ? 'No tengo una cuenta' : 'Ya tengo una cuenta'}
          </Box>
          <Box onClick={() => setIsLogin(!isLogin)} color={'blue.500'} cursor={'pointer'} >
            {isLogin ? 'Registrarme' : 'Iniciar Sesion'}
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default AuthForm