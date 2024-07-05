import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import useShowToast from "./useShowToast"
import { auth, firestore } from "../Firebase/firebase"
import { doc, getDoc } from "firebase/firestore"
import useAuthStore from "../store/authStore"

// Este hook va a ejecutar cuando un usuario Inicie sesion de su cuenta en la aplicacion
function useLogin() {

  // Importamos el letrero a mostrar de acuerdo si el inicio de sesion esta bien o no
  const showToast = useShowToast()

  // Importamos el hook para iniciar sesion con firebase
  const[
    signInWithEmailAndPassword,
    ,
    loading,
    error
  ] = useSignInWithEmailAndPassword(auth)

  // Importamos el estado del usuario logeado
  const loginUser = useAuthStore((state) => state.login)

  // Esta funcion va a ser llamada cuando un usuario se inicie sesion
  const login = async (inputs) => {
    
    // Se verifica si el usuario ya esta logeado, en caso afirmativo no se ejecuta la logica de iniciar sesion
    // Se verifica si todos los campos estan llenos para iniciar sesion
    if (!inputs.email || !inputs.password) {
      return showToast('Error', 'Por favor llenar todos los campos', 'error')
    }

    // Se ejecuta la logica de iniciar sesion con firebase, en caso de error se muestra un mensaje de error
    try {
      const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password)

      // Si el inicio de sesion es exitoso se muestra un mensaje de bienvenida
      if(userCred){
        const docRef = doc(firestore, 'users', userCred.user.uid)
        const docSnap = await getDoc(docRef)
        localStorage.setItem('user-info', JSON.stringify(docSnap.data()))
        loginUser(docSnap.data())
      }
    } catch(error){
      showToast('Error', error.message, 'error')
    }
  }
 
  return {loading, error, login}
}

export default useLogin