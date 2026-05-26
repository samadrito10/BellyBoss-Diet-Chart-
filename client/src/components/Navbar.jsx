import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaLeaf } from 'react-icons/fa'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className='bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50'>
      <Link to='/' className='flex items-center gap-2 text-2xl font-bold text-green-600'>
        <FaLeaf />
        BellyBoss
      </Link>
      <div className='flex gap-6 items-center'>
        {user ? (
          <>
            {[
              { path: '/dashboard', label: 'Dashboard' },
              { path: '/generate', label: 'Generate Diet' },
              { path: '/history', label: 'History' },
              { path: '/profile', label: 'Profile' },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition ${isActive(item.path) ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 hover:text-green-600'}`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className='bg-red-50 text-red-500 px-5 py-2 rounded-full font-semibold hover:bg-red-100 transition'
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/login' className='text-gray-600 font-medium hover:text-green-600 transition'>Login</Link>
            <Link to='/register' className='bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition shadow-md'>
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar