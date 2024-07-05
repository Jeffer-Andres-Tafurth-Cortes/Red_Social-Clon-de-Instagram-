import { useState, useEffect } from "react";
import useAuthStore from "../store/authStore"
import useUserProfileStore from '../store/userProfileStore'
import useShowToast from './useShowToast'
import { firestore, auth } from '../Firebase/firebase'
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

// Este custom hook va a tener la logica en toda la aplicacion en cuando al 'seguir' o 'dejas de seguir' algun otro usuario
// en al aplicacion
function useFollowUser(userID) {

  const [isUpdating, setIsUpdating] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const authUser = useAuthStore((state) => state.user)
  const setAuthUser = useAuthStore((state) => state.setUser)
  const { userProfile, setUserProfile } = useUserProfileStore()
  const showToats = useShowToast()

  // Esta sera la funcion a ejecutar cuando el usuario desee seguir o dejar de seguir a otro usuario
  const handleFollowUser = async() => {

    // Se cambia el estado para indicar que se esta actualizando
    setIsUpdating(true)

    // Se actualiza la lista de seguidores y los seguidos del usuario actual y del usuario a seguir o dejar de seguir
    try {

      // Se obtienen las referencias al usuario actual y al usuario a seguir o dejar de seguir
      const currentUserRef = doc(firestore, 'users', authUser.uid)
      const userToFollowOrUnfollowRef = doc(firestore, 'users', userID)

      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(userID) : arrayUnion(userID)
      })

      await updateDoc(userToFollowOrUnfollowRef, {
        followers: isFollowing ?   arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
      })

      if(isFollowing){
        // Esta es la logica para el 'dejar de seguir' a algun usuario en la aplicacion
        setAuthUser({...authUser, following: authUser.following.filter(uid => uid !== userID)})
        setUserProfile({...userProfile, followers: authUser.followers.filter(uid => uid !== authUser.uid)})

        localStorage.setItem('user-info', JSON.stringify({
          ...authUser, following: authUser.following.filter(uid => uid !== userID)
        }))
        setIsFollowing(false)

      } else {
        // Esta es la logica para el 'seguir' a algun usuario en la aplicacion
        setAuthUser({...authUser, following: [...authUser.following, userID]})
        setUserProfile({...userProfile, followers: [...userProfile.followers, authUser.uid]})

        localStorage.setItem('user-info', JSON.stringify({
          ...authUser, following: [...authUser.following, userID]
        }))
        setIsFollowing(true)
      }

    } catch (error) {
      showToats('Error', error.message, 'error')

    } finally {
      setIsUpdating(false)
    }
  }

  // Se ejecuta cada vez que se cambia el userID o el authUser
  useEffect(() => {
    if(authUser){
      const isFollowing = authUser.following.includes(userID)
      setIsFollowing(isFollowing)
    }
  }, [authUser, userID]);

  return { isUpdating, isFollowing, handleFollowUser }
}

export default useFollowUser