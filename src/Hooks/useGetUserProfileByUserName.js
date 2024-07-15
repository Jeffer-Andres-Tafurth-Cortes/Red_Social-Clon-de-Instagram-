import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../Firebase/firebase";
import useUserProfileStore from "../store/userProfileStore";

// Este custom hook 'useGetUserProfileByUserName' se encarga de obtener la informacion de un usuario en particular
function useGetUserProfileByUserName(userName) {
  
  // Se hace uso de un useState para almacenar la informacion del usuario en particular
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast()
  const { userProfile, setUserProfile } = useUserProfileStore()

  useEffect(() => {
    const getUserProfile = async () => {

      // Se cambia el estado para obtener la informacion del usuario
      setIsLoading(true);

      try {
        // Se obtiene el usuario con una query (es decir una referencia)
        const q = query(collection(firestore, 'users'),where('userName', '==', userName))
        const querySnapshot = await getDocs(q)

        // Si no encuentra al usuario, retornaria null
        if(querySnapshot.empty) return setUserProfile(null)

        let userDoc
        querySnapshot.forEach((doc) => {
          userDoc = doc.data()
        });

        setUserProfile(userDoc)

      } catch (error) {
        showToast('Error', error.message, 'error')
        
      } finally {
        // Se cambia el estado para indicar que la informacion del usuario ha sido obtenida
        setIsLoading(false);
      }
    }
    getUserProfile();
  }, [setUserProfile, userName, showToast]);

  return { isLoading, userProfile }
}

export default useGetUserProfileByUserName