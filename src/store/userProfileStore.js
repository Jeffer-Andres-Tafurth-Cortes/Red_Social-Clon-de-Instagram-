import { create } from 'zustand'

// Se usa zustand para hacer la gestion del estado global en cuanto a colocar la resepctiva informacion del usuario cuando
// acceda a la aplicacion, esto se vera reflejado de mejor manera cuando el usuario acceda al perfil propio
const useUserProfileStore = create((set) => ({
  userProfile: null,
  setUserProfile:((userProfile) => set({ userProfile })),

  // Esta funcion que se define en el estado global es para mostrar el numero de post realizados en el perfil
  addPost: (post) => 
    set((state) => ({
    userProfile: { ...state.userProfile, posts: [post.id, ...state.userProfile.posts]}
  })),


  deletePost: (postId) => set((state) => ({
    userProfile:{...state.userProfile, posts: state.userProfile.posts.filter((id) => id !== postId)}
  }))
  
}))

export default useUserProfileStore