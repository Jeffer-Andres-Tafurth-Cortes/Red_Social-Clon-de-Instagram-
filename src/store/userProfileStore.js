import { create } from 'zustand'

// Se usa zustand para hacer la gestion del estado global en cuanto a colocar la resepctiva informacion del usuario cuando
// acceda a la aplicacion, esto se vera reflejado de mejor manera cuando el usuario acceda al perfil propio
const useUserProfileStore = create((set) => ({
  userProfile: null,
  setUserProfile:((userProfile) => set({ userProfile })),
  // addPost: ()
  
}))

export default useUserProfileStore