import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import GenerateDiet from './pages/GenerateDiet'
import History from './pages/History'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth()
  return token ? children : <Navigate to='/login' />
}

const AppRoutes = () => {
  const { token } = useAuth()
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={!token ? <Login /> : <Navigate to='/dashboard' />} />
        <Route path='/register' element={!token ? <Register /> : <Navigate to='/dashboard' />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/generate' element={<ProtectedRoute><GenerateDiet /></ProtectedRoute>} />
        <Route path='/history' element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App