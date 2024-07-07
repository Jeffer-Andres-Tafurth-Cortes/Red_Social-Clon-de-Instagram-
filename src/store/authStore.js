import { create } from 'zustand'

// Para hacer la gestion del estado en toda la aplicacion se hace uso de Zustand
const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user-info')),
  login:(user) => set({user}),
  logout:() => set({user: null}),
  setUser: (user) => set({user})
}))

export default useAuthStore