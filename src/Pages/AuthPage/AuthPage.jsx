import { Box, Container, Flex, Image, VStack } from '@chakra-ui/react'
import AuthForm from '../../Components/AuthForm/AuthForm'

function AuthPage() {
  return (
    <>
      {/** Esta parte es la de autenticacion para acceder a la aplicacion */}
      <Flex minHeight={'100vh'} justifyContent={'center'} alignItems={'center'} paddingX={4}>

        {/** Va a estar envuelto en un contenedor el cual de va a dividir en dos secciones */}
        <Container maxWidth={'container.md'} padding={0}>

          <Flex justifyContent={'center'} alignItems={'center'} gap={10}>

            {/** La primer seccion es la de la izquierda y va a estar compuesta por una imagen
             * de como es la aplicacion (base significa para versiones moviles) */}
            <Box display={{base: 'none', md: 'block'}}>
              <Image src='/auth (1).png' alt={'Imagen de la aplicacion Instagram en movil'} height={650} />
            </Box>

            {/** La segunda seccion es la de la derecha y va a estar compuesta por un recuadro
             * en donde va a estar el formulario ya sea para acceder a la aplicacion o crear
             * una cuenta para poder acceder*/}
            <VStack spacing={4} align={'stretch'}>

              {/** El componente AuthForm es el formulario de ingreso y/o de registro a la aplicacion */}
              <AuthForm />

              <Box textAlign={'center'}>Descarga la aplicacion.</Box>

              {/** Links de imagenes para descargar la aplicacion */}
              <Flex gap={5} justifyContent={'center'}>
                <Image src='/playstore (1).png' height={10} alt='Logo de playstores' />
                <Image src='/microsoft (1).png' height={10} alt='Logo de microsoft' />
              </Flex>
            </VStack>

          </Flex>

        </Container>
      </Flex>
    </>
  )
}

export default AuthPage