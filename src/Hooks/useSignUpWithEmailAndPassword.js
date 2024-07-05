// Importamos la funcion que nos ayudara con el tema de creacion de usuarios cuando alguien se registre 
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'

// Importamos la funcion que nos ayudara con la creacion de un nuevo usuario y almcenamiento de datos en Firebase
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore"

// Importamos el "auth" y "firestore" de 'firebase.js' donde tenemos la configuracion de Firebase como el Back-End de la aplicacion
import { auth, firestore } from '../Firebase/firebase'
import useShowToast from './useShowToast'
import useAuthStore from '../store/authStore'
function useSignUpWithEmailAndPassword() {

  // Estas constantes son las que realizan el seguimiento cuando un usuario se este registrando
  const [
    createUserWithEmailAndPassword,
    ,
    loading,
    error
  ] = useCreateUserWithEmailAndPassword(auth)

  // Importamos la logica del cartel del componente 'useShowToast.js'
  const showToast = useShowToast()

  // Aqui agregamos Zustand del hook 'authStore.js' para manejar el estado
  const loginUser = useAuthStore((state) => state.login)

  // Esta sera la funcion a ejecutar cuando in usuario ya se registre
  const signup = async(inputs) => {

    // Se hace una comprobacion primero si todos los campos estan llenos en el registro
    if ( !inputs.email || !inputs.password || !inputs.userName || !inputs.fullName) {
      showToast('Error', 'Todos los campos son obligatorios', 'error') 
      return
    }

    // Si todos los campos estan bien se prosigue con la creacion del usuario en la aplicacion
    try {

      // Se usa la funcion createUserWithEmailAndPassword para crear los usuarios con ayuda de el correo y la contraseña
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)
      if (!newUser && error) {
        showToast('Error', error.message, 'error')
        return
      }

      // Antes de crear un usuario se debe hacer la comprobacion en la base de datos si ya existe un usuario con el mismo nombre en
      // en la aplicacion, esto es para el nombre de pila que cada usuario se pone en como va a aparecer en su respectivo perfil
      const usersRef = collection(firestore, 'users')
      const q = query(usersRef, where('userName', '==', inputs.userName))
      const querySnapchat = await getDocs(q)

      if(!querySnapchat.empty){
        showToast('Error', 'Este nombre de usuario ya existe', 'error')
        return
      }

      // Al crearse un nuevo usuario se le asigna una serie de datos en funcion de la aplicacion, de sus datos y estadisticas
      // esta informacion va a estar almacenada en Firebase, mas exacto en FireStore DataBase
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          userName: inputs.userName,
          fullName: inputs.fullName,
          bio: '',
          profilePicURL: '',
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now()
        }

        await setDoc(doc(firestore, 'users', newUser.user.uid), userDoc)
        localStorage.setItem('user-info', JSON.stringify(userDoc))
        loginUser(userDoc)
      
      }
    } catch (error) {
      showToast('Error', error.message , 'error')
    }
  }

  return {loading, error, signup}
}

export default useSignUpWithEmailAndPassword