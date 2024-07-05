import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage/HomePage'
import AuthPage from './Pages/AuthPage/AuthPage'
import PageLayout from './Layouts/PageLayouts/PageLayout'
import ProfilePage from './Pages/ProfilePage/ProfilePage'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from './Firebase/firebase'

function App() {

  const [authUser] = useAuthState(auth)

  return (
    <PageLayout>
      {/** Aqui se definen las diferentes rutas en la cuales va a tener la aplicacion */}
      <Routes>

        {/** Esta primer ruta corresponde al Home de la aplicacion */}
        <Route path='/' element={authUser ? <HomePage /> :  <Navigate to={'/auth'} />} />

        {/** La segunda ruta corresponde al auth de la aplicacion (autenticacion de acceso) */}
        <Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to={'/'} />} />

        {/** La tercer ruta corresponde a entrar a nuestro perfil en la aplicacion */}
        <Route path='/:userName' element={<ProfilePage />} />

      </Routes>
    </ PageLayout>
  )
}

export default App
