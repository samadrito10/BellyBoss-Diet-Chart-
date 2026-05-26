import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveProfile, getProfile } from '../services/api'

const Profile = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [form, setForm] = useState({
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    activityLevel: 'moderate',
    goal: 'lose_weight',
    foodPreference: 'non_vegetarian',
    allergies: '',
    medicalConditions: ''
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getProfile()
        const p = data.profile
        setForm({
          age: p.age,
          gender: p.gender,
          weight: p.weight,
          height: p.height,
          activityLevel: p.activityLevel,
          goal: p.goal,
          foodPreference: p.foodPreference,
          allergies: p.allergies.join(', '),
          medicalConditions: p.medicalConditions.join(', ')
        })
      } catch (err) {
        console.log('No profile yet')
      }
    }
    fetchProfile()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await saveProfile({
        ...form,
        age: Number(form.age),
        weight: Number(form.weight),
        height: Number(form.height),
        allergies: form.allergies ? form.allergies.split(',').map(a => a.trim()) : [],
        medicalConditions: form.medicalConditions ? form.medicalConditions.split(',').map(m => m.trim()) : []
      })
      setSuccess('Profile saved successfully!')
      setTimeout(() => navigate('/dashboard'), 1500)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8'>
      <div className='max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8'>
        <h2 className='text-3xl font-bold text-green-700 mb-2'>Your Profile</h2>
        <p className='text-gray-500 mb-8'>Fill in your details for a personalized diet chart</p>

        {success && <div className='bg-green-100 text-green-600 px-4 py-3 rounded-lg mb-6'>{success}</div>}

        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-700 font-medium mb-1'>Age</label>
              <input type='number' name='age' value={form.age} onChange={handleChange} required
                className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400' />
            </div>
            <div>
              <label className='block text-gray-700 font-medium mb-1'>Gender</label>
              <select name='gender' value={form.gender} onChange={handleChange}
                className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400'>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </select>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-700 font-medium mb-1'>Weight (kg)</label>
              <input type='number' name='weight' value={form.weight} onChange={handleChange} required
                className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400' />
            </div>
            <div>
              <label className='block text-gray-700 font-medium mb-1'>Height (cm)</label>
              <input type='number' name='height' value={form.height} onChange={handleChange} required
                className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400' />
            </div>
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-1'>Activity Level</label>
            <select name='activityLevel' value={form.activityLevel} onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400'>
              <option value='sedentary'>Sedentary (little or no exercise)</option>
              <option value='light'>Light (exercise 1-3 days/week)</option>
              <option value='moderate'>Moderate (exercise 3-5 days/week)</option>
              <option value='active'>Active (exercise 6-7 days/week)</option>
              <option value='very_active'>Very Active (hard exercise daily)</option>
            </select>
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-1'>Your Goal</label>
            <select name='goal' value={form.goal} onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400'>
              <option value='lose_weight'>Lose Weight</option>
              <option value='gain_weight'>Gain Weight</option>
              <option value='maintain_weight'>Maintain Weight</option>
              <option value='build_muscle'>Build Muscle</option>
            </select>
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-1'>Food Preference</label>
            <select name='foodPreference' value={form.foodPreference} onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400'>
              <option value='vegetarian'>Vegetarian</option>
              <option value='non_vegetarian'>Non Vegetarian</option>
              <option value='vegan'>Vegan</option>
            </select>
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-1'>Allergies (comma separated)</label>
            <input type='text' name='allergies' value={form.allergies} onChange={handleChange}
              placeholder='e.g. nuts, dairy, gluten'
              className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400' />
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-1'>Medical Conditions (comma separated)</label>
            <input type='text' name='medicalConditions' value={form.medicalConditions} onChange={handleChange}
              placeholder='e.g. diabetes, hypertension'
              className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400' />
          </div>

          <button type='submit' disabled={loading}
            className='bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50'>
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Profile