import { useState } from 'react'
import { generateDiet } from '../services/api'
import ReactMarkdown from 'react-markdown'

const GenerateDiet = () => {
  const [dietChart, setDietChart] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await generateDiet()
      setDietChart(data.dietChart)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate diet chart')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8'>
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-3xl font-bold text-green-700 mb-2'>Generate Diet Chart 🤖</h2>
        <p className='text-gray-500 mb-8'>Click below to generate your personalized diet chart</p>

        {error && <div className='bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-6'>{error}</div>}

        <button
          onClick={handleGenerate}
          disabled={loading}
          className='bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 mb-8 shadow-lg'
        >
          {loading ? '🤖 Generating your diet chart...' : '✨ Generate My Diet Chart'}
        </button>

        {dietChart && (
          <div className='bg-white rounded-2xl shadow-xl p-8 prose max-w-none'>
            <ReactMarkdown>{dietChart}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}

export default GenerateDiet