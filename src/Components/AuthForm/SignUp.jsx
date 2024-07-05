import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"
import useSignInWithEmailAndPassword  from "../../Hooks/useSignUpWithEmailAndPassword"

// Este componente define lo que sera el Resgistrarse en la aplicacion (crear cuenta en la aplicacion)
function SignUp() {

  // Se crea un useState para los valores de los campos de correo, contraseña y confirmar contraseña
  const [inputs, setInputs] = useState({
    fullName: '',
    userName: '',
    email: '',
    password: '',
  })

  // Este useState permite agregar un funcionalidad de ocultar o mirar la contraseña que el usuario escriba
  // esta funcion proviene de hook useSignUpWithEmailAndPassword
  const [showPassword, setShowPassword] = useState(false)

  // Agregamos la funcion para crear usuarios cuando alguno se registre
  const {loading, error, signup} = useSignInWithEmailAndPassword()

  return (
    <>
      {/** Este primer Input corresponde a escribir el nombre completo */}
      <Input 
        placeholder='Nombre Completo' 
        fontSize={14} 
        type='text' 
        value={inputs.fullName} 
        size={'sm'}
        onChange={(e) => setInputs({...inputs, fullName:e.target.value})} 
      />
      
      {/** Este segundo Input corresponde a escribir el un nombre de usuario para la aplicacion */}
      <Input 
        placeholder='Nombre de Usuario' 
        fontSize={14} 
        type='text' 
        value={inputs.userName}
        size={'sm'}
        onChange={(e) => setInputs({...inputs, userName:e.target.value})}
      />

      {/** Este tercer Input corresponde a escribir el correo electronico */}
      <Input 
        placeholder='Correo electronico' 
        fontSize={14} 
        type='email' 
        value={inputs.email}
        size={'sm'}
        onChange={(e) => setInputs({...inputs, email:e.target.value})}
      />

      <InputGroup>
        {/** Este cuarto Input corresponde a escribir la contraseña de la cuenta */}
        <Input 
          placeholder='Contraseña' 
          fontSize={14} 
          type={showPassword ? 'text' : 'password'}  
          value={inputs.password}
          size={'sm'}
          onChange={(e) => setInputs({...inputs, password:e.target.value})}
        />

        <InputRightElement height={'full'}>
          <Button variant={'ghost'} size={'sm'} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>

      </InputGroup>

      {error && (
        <>
          <Alert status='error' fontSize={13} padding={2} borderRadius={4}>
            <AlertIcon fontSize={12} />
            {error.message}
          </Alert>
        </>
      )}
      
      {/** Boton para registrarse una vez llenado todo los datos */}
      <Button width={'full'} colorScheme='blue' size={'sm'} fontSize={14} isLoading={loading} onClick={() => signup(inputs)}> 
        Registrarme
      </Button>
    </>
  )
}

export default SignUp