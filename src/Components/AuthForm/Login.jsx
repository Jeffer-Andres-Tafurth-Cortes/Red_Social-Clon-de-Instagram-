import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react"
import { useState } from "react"
import useLogin from "../../Hooks/useLogin"

// Este componente pertene a lo que es el Iniciar Sesion en la aplicacion con correo y contraseña
function Login() {

  // Se crea un useState para los valores de los campos de correo y contraseña
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  })

  // Se hace uso de custom hook useLogin para realizar la autenticacion con los valores de correo y contraseña
  const {loading, error, login} = useLogin()

  return (
    <>
      {/** Estos Inputs corresponden a la autenticacion para Iniciar Sesion */} 
      <Input 
        placeholder='Correo electronico' 
        fontSize={14} 
        type='email' 
        value={inputs.email} 
        size={'sm'}
        onChange={(e) => setInputs({...inputs, email: e.target.value})} 
      />
      
      <Input 
        placeholder='Contraseña' 
        fontSize={14} 
        type='password' 
        value={inputs.password}
        size={'sm'}
        onChange={(e) => setInputs({...inputs, password: e.target.value})}
      />

      {error &&(
        <Alert status='error' fontSize={13} padding={2} borderRadius={4}>
          <AlertIcon fontSize={14} />
          {error.message}
        </Alert>
      )}

      {/** Este Boton responde a los dos Inputs de arriba */}
      <Button width={'full'} colorScheme='blue' size={'sm'} fontSize={14} 
        isLoading={loading}  onClick={() => login(inputs)}> 
        Iniciar Sesion
      </Button>

    </>
  )
}

export default Login