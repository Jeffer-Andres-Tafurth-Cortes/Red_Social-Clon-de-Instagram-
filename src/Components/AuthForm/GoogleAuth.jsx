import { Flex, Image, Text } from "@chakra-ui/react"
import { useSignInWithGoogle } from "react-firebase-hooks/auth"
import { auth, firestore } from "../../Firebase/firebase"
import useShowToast from "../../Hooks/useShowToast"
import useAuthStore from "../../store/authStore"
import { doc, getDoc, setDoc } from "firebase/firestore"

// Este componente define lo que es Iniciar Sesion pero con alguna cuenta de Google
function GoogleAuth({ prefix }) {

  // Este custom hook responde a la logica de iniciar sesion o registrase en la aplicacion pero con cuente de Google
  const [signInWithGoogle, , , error] = useSignInWithGoogle(auth)

  // Esta constante muestra un mensaje de error cuando ocurre algo durante el inicio de sesion con Google
  const showToast = useShowToast()

  // Este evento se ejecuta cuando el usuario hace click en el boton de Google para iniciar sesion
  const loginUser = useAuthStore((state) => state.login)

  // Esta es la logica para iniciar sesion con Google
  const handleGoogleAuth = async() => {
    
    // Se inicia la logica para iniciar sesion con Google
    try {
      const newUser = await signInWithGoogle()
      if(!newUser && error){
        showToast('Error', error.message, 'error')
        return
      }

      const userRef = doc(firestore, 'users', newUser.user.uid)
      const userSnap = await getDoc(userRef)

      if(userSnap.exists()){

        // Si el usuario ya existe, se logea automaticamente
        const userDoc = userSnap.data()
        localStorage.setItem('user-info', JSON.stringify(userDoc))
        loginUser(userDoc)
        
      } else {

        // Si el usuario no existe, se crea un nuevo documento en Firestore con sus datos
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          userName: newUser.user.email.split('@')[0],
          fullName: newUser.user.displayName,
          bio: '',
          profilePicURL: newUser.user.photoURL,
          followers: [],
          following: [],
          post: [],
          createdAt: Date.now()
        }
        await setDoc(doc(firestore, 'users', newUser.user.uid), userDoc)
        localStorage.setItem('user-info', JSON.stringify(userDoc))
        loginUser(userDoc)
      }
    } catch (error) {
      showToast('Error', error.message, 'error')
    }
  }

  return (
    <>
      {/** Seccion donde esta Google para iniciar sesion o registrarse */}
      <Flex alignItems={'center'} justify={'center'} cursor={'pointer'} onClick={handleGoogleAuth}>
        <Image src='/google (1).png' width={5} alt='Logo de Google' />
        <Text marginX={2} color={'blue.500'}>{prefix} con Google</Text>
      </Flex>
    </>
  )
}

export default GoogleAuth