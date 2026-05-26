import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getBMI, getProfile } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { FaRobot, FaHistory, FaUser, FaFire, FaWeight, FaRuler } from 'react-icons/fa'

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

  const getBmiBg = (category) => {
    if (category === 'Underweight') return 'bg-blue-50 border-blue-200'
    if (category === 'Normal') return 'bg-green-50 border-green-200'
    if (category === 'Overweight') return 'bg-yellow-50 border-yellow-200'
    return 'bg-red-50 border-red-200'
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-4xl font-extrabold text-gray-800 mb-1'>
          Hey, {user?.name}! 
        </h1>
        <p className='text-gray-500 text-lg'>Here's your health overview for today</p>
      </div>

      {loading ? (
        <div className='flex items-center justify-center h-64'>
          <div className='text-green-600 text-xl font-medium animate-pulse'>Loading your data...</div>
        </div>
      ) : !profile ? (
        <div className='bg-white rounded-3xl p-12 shadow-lg text-center max-w-lg mx-auto'>
          <div className='text-6xl mb-6'>📋</div>
          <h3 className='text-2xl font-bold text-gray-800 mb-3'>Complete Your Profile</h3>
          <p className='text-gray-500 mb-8'>Fill in your health details to get your personalized AI diet chart</p>
          <Link to='/profile'
            className='bg-green-600 text-white px-10 py-3 rounded-full font-semibold hover:bg-green-700 transition shadow-lg'>
            Complete Profile →
          </Link>
        </div>
      ) : (
        <>
          {/* Stats Row */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-5 mb-6'>
            {[
              { icon: <FaWeight className='text-green-600' />, label: 'Weight', value: `${profile.weight} kg` },
              { icon: <FaRuler className='text-blue-500' />, label: 'Height', value: `${profile.height} cm` },
              { icon: <FaFire className='text-orange-500' />, label: 'Goal', value: profile.goal.replace(/_/g, ' ') },
              { icon: <FaUser className='text-purple-500' />, label: 'Age', value: `${profile.age} years` },
            ].map((stat, i) => (
              <div key={i} className='bg-white rounded-2xl p-5 shadow-md flex items-center gap-4'>
                <div className='text-2xl'>{stat.icon}</div>
                <div>
                  <div className='text-gray-400 text-sm'>{stat.label}</div>
                  <div className='font-bold text-gray-800 capitalize'>{stat.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Cards */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* BMI Card */}
            <div className={`rounded-3xl p-8 shadow-md border-2 ${getBmiBg(bmi?.category)}`}>
              <h3 className='text-lg font-semibold text-gray-600 mb-4'>Your BMI Score</h3>
              <div className={`text-6xl font-extrabold mb-2 ${getBmiColor(bmi?.category)}`}>
                {bmi?.bmi}
              </div>
              <div className={`text-xl font-bold mb-4 ${getBmiColor(bmi?.category)}`}>
                {bmi?.category}
              </div>
              <div className='text-sm text-gray-500'>
                {bmi?.category === 'Normal' ? '✅ You are in a healthy range!' :
                  bmi?.category === 'Underweight' ? '⚠️ You need to gain some weight' :
                    bmi?.category === 'Overweight' ? '⚠️ Consider losing some weight' :
                      '⚠️ Please consult a doctor'}
              </div>
            </div>

            {/* Generate Card */}
            <div className='bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 shadow-lg text-white'>
              <FaRobot className='text-4xl mb-4 text-green-100' />
              <h3 className='text-xl font-bold mb-3'>Generate Diet Chart</h3>
              <p className='text-green-100 mb-6 text-sm'>Get your AI powered personalized meal plan instantly!</p>
              <Link to='/generate'
                className='bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-green-50 transition inline-block'>
                Generate Now 
              </Link>
            </div>

            {/* History Card */}
            <div className='bg-white rounded-3xl p-8 shadow-md'>
              <FaHistory className='text-4xl mb-4 text-gray-400' />
              <h3 className='text-xl font-bold text-gray-800 mb-3'>Diet History</h3>
              <p className='text-gray-500 mb-6 text-sm'>View all your previously generated diet charts</p>
              <Link to='/history'
                className='bg-gray-100 text-gray-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition inline-block'>
                View History →
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard