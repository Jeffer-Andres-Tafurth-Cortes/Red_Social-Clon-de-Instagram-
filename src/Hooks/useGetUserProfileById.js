import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../Firebase/firebase";

// Este custom hook tiene la logica para acceder a un usuario usando el ID, esto es po ri clickeamos
// el nombre o una foto de otro usuario para acceder a su perfil
function useGetUserProfileById( userId ) {

  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null)
  const showToast = useShowToast()

  // Cuando se llama este custom hook, se ejecuta la peticion a firebase para obtener la informacion del usuario
  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true)
      setUserProfile(null)

      try {
        const userRef = await getDoc(doc(firestore, 'users', userId))
        if(userRef.exists()){
          setUserProfile(userRef.data())
        }
      } catch (error) {
        showToast('Error', 'Error al obtener la informacion del usuario', 'error')
      } finally {
        setIsLoading(false)
      }
    }
    getUserProfile()
  }, [showToast, setUserProfile, userId])

  return { isLoading, userProfile, setUserProfile }
}

export default useGetUserProfileById