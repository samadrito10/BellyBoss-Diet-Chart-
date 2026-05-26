import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/api'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { data } = await loginUser(form)
      login(data.user, data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center'>
      <div className='bg-white rounded-2xl shadow-xl p-10 w-full max-w-md'>
        <h2 className='text-3xl font-bold text-green-700 mb-2 text-center'>Welcome Back!</h2>
        <p className='text-gray-500 text-center mb-8'>Login to your account</p>

        {error && <div className='bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-6'>{error}</div>}

        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <div>
            <label className='block text-gray-700 font-medium mb-1'>Email</label>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder='Enter your email'
              required
              className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400'
            />
          </div>
          <div>
            <label className='block text-gray-700 font-medium mb-1'>Password</label>
            <input
              type='password'
              name='password'
              value={form.password}
              onChange={handleChange}
              placeholder='Enter your password'
              required
              className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400'
            />
          </div>
          <button
            type='submit'
            disabled={loading}
            className='bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50'
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className='text-center text-gray-500 mt-6'>
          Don't have an account?{' '}
          <Link to='/register' className='text-green-600 font-semibold hover:underline'>Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login