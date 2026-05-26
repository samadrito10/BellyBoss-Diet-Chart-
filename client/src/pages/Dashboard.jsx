import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getBMI, getProfile } from '../services/api'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const { user } = useAuth()
  const [bmi, setBmi] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await getProfile()
        setProfile(profileRes.data.profile)
        const bmiRes = await getBMI()
        setBmi(bmiRes.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const getBmiColor = (category) => {
    if (category === 'Underweight') return 'text-blue-500'
    if (category === 'Normal') return 'text-green-500'
    if (category === 'Overweight') return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8'>
      <h1 className='text-3xl font-bold text-green-700 mb-2'>
        Welcome back, {user?.name}! 👋
      </h1>
      <p className='text-gray-500 mb-8'>Here's your health overview</p>

      {loading ? (
        <div className='text-center text-gray-500'>Loading...</div>
      ) : !profile ? (
        <div className='bg-white rounded-2xl p-8 shadow-md text-center'>
          <div className='text-5xl mb-4'>📋</div>
          <h3 className='text-xl font-bold text-gray-800 mb-2'>Complete Your Profile</h3>
          <p className='text-gray-500 mb-6'>Fill in your details to get your personalized diet chart</p>
          <Link
            to='/profile'
            className='bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition'
          >
            Complete Profile
          </Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* BMI Card */}
          <div className='bg-white rounded-2xl p-6 shadow-md'>
            <h3 className='text-lg font-semibold text-gray-700 mb-4'>Your BMI</h3>
            <div className={`text-5xl font-bold mb-2 ${getBmiColor(bmi?.category)}`}>
              {bmi?.bmi}
            </div>
            <div className={`text-lg font-medium ${getBmiColor(bmi?.category)}`}>
              {bmi?.category}
            </div>
            <div className='mt-4 text-sm text-gray-400'>
              Height: {profile.height}cm | Weight: {profile.weight}kg
            </div>
          </div>

          {/* Profile Card */}
          <div className='bg-white rounded-2xl p-6 shadow-md'>
            <h3 className='text-lg font-semibold text-gray-700 mb-4'>Your Profile</h3>
            <div className='flex flex-col gap-2 text-gray-600'>
              <p>🎂 Age: <span className='font-medium'>{profile.age} years</span></p>
              <p>⚡ Activity: <span className='font-medium capitalize'>{profile.activityLevel}</span></p>
              <p>🎯 Goal: <span className='font-medium capitalize'>{profile.goal.replace('_', ' ')}</span></p>
              <p>🥗 Diet: <span className='font-medium capitalize'>{profile.foodPreference.replace('_', ' ')}</span></p>
            </div>
          </div>

          {/* Generate Card */}
          <div className='bg-green-600 rounded-2xl p-6 shadow-md text-white'>
            <h3 className='text-lg font-semibold mb-4'>Generate Diet Chart</h3>
            <p className='text-green-100 mb-6'>Get your AI powered personalized diet chart now!</p>
            <Link
              to='/generate'
              className='bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-green-50 transition'
            >
              Generate Now 🤖
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard