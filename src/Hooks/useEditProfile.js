import { useState } from'react'
import useAuthStore from '../store/authStore'
import useShowToast from './useShowToast'
import { doc, updateDoc } from 'firebase/firestore'
import { firestore, storage } from "../Firebase/firebase";
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import useUserProfileStore from '../store/userProfileStore';

// Este custom hook 'useEditProfile' se encarga de manejar la logica para editar el perfil de un usuario
function useEditProfile() {

  // Importamos el estado del usuario y el letrero a mostrar
  const [isUpdating, setIsUpdating] = useState(false)

  const authUser = useAuthStore((state) => state.user)
  const setAuthUser = useAuthStore((state) => state.setUser)
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile)

  const showToast = useShowToast()

  // Esta sera la funcion a ejecutar cuando el usuario desee editar su perfil
  const editProfile = async(inputs, selectedFile) => {
    if(isUpdating || !authUser) return
    setIsUpdating(true)

    const storageRef = ref(storage, `profilePics/${authUser.uid}`)
    const userDocRef = doc(firestore, 'users', authUser.uid)

    let URL = ''

    try{
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, 'data_url')
        URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`))
      }
      const updatedUser = {
        ...authUser,
        fullName: inputs.fullName || authUser.fullName,
        userName: inputs.userName || authUser.userName,
        bio: inputs.bio || authUser.bio,
        profilePicURL: URL || authUser.profilePicURL
      }

      await updateDoc(userDocRef, updatedUser)
      localStorage.setItem('user-info', JSON.stringify(updatedUser))
      setAuthUser(updatedUser)
      setUserProfile(updatedUser)
      showToast('Success', 'El perfil de ha actualizaco correctamente', 'success')

    } catch (error) {
      showToast('Error', 'Error al editar el Perfil', 'error')
    }
  }

  return { editProfile, isUpdating }

}

export default useEditProfile