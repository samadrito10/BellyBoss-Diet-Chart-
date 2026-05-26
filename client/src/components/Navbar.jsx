import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className='bg-green-600 text-white px-6 py-4 flex justify-between items-center shadow-lg'>
      <Link to='/' className='text-2xl font-bold tracking-wide'>
        🥗BellyBoss
      </Link>
      <div className='flex gap-6 items-center'>
        {user ? (
          <>
            <Link to='/dashboard' className='hover:text-green-200 transition'>Dashboard</Link>
            <Link to='/generate' className='hover:text-green-200 transition'>Generate Diet</Link>
            <Link to='/history' className='hover:text-green-200 transition'>History</Link>
            <Link to='/profile' className='hover:text-green-200 transition'>Profile</Link>
            <button
              onClick={handleLogout}
              className='bg-white text-green-600 px-4 py-1 rounded-full font-semibold hover:bg-green-100 transition'
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/login' className='hover:text-green-200 transition'>Login</Link>
            <Link to='/register' className='bg-white text-green-600 px-4 py-1 rounded-full font-semibold hover:bg-green-100 transition'>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar