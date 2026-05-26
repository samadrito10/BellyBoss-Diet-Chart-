import { useState, useEffect } from 'react'
import { getDietHistory, getSingleHistory } from '../services/api'
import ReactMarkdown from 'react-markdown'

const History = () => {
  const [history, setHistory] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await getDietHistory()
        setHistory(data.history)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [])

  const handleView = async (id) => {
    try {
      const { data } = await getSingleHistory(id)
      setSelected(data.history)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8'>
      <h2 className='text-3xl font-bold text-green-700 mb-2'>Diet History 📋</h2>
      <p className='text-gray-500 mb-8'>View your past generated diet charts</p>

      {loading ? (
        <div className='text-center text-gray-500'>Loading...</div>
      ) : history.length === 0 ? (
        <div className='bg-white rounded-2xl p-8 shadow-md text-center'>
          <div className='text-5xl mb-4'>📭</div>
          <h3 className='text-xl font-bold text-gray-800'>No history yet</h3>
          <p className='text-gray-500'>Generate your first diet chart to see it here</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col gap-4'>
            {history.map((item, index) => (
              <div key={item._id} className='bg-white rounded-2xl p-6 shadow-md cursor-pointer hover:shadow-lg transition'
                onClick={() => handleView(item._id)}>
                <div className='flex justify-between items-center'>
                  <h3 className='font-bold text-gray-800'>Diet Chart #{history.length - index}</h3>
                  <span className='text-sm text-gray-400'>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className='flex gap-4 mt-2 text-sm text-gray-500'>
                  <span>BMI: {item.bmi}</span>
                  <span>•</span>
                  <span>{item.bmiCategory}</span>
                  <span>•</span>
                  <span className='capitalize'>{item.profileSnapshot?.goal?.replace('_', ' ')}</span>
                </div>
              </div>
            ))}
          </div>

          {selected && (
            <div className='bg-white rounded-2xl shadow-xl p-8 prose max-w-none overflow-y-auto max-h-screen'>
              <ReactMarkdown>{selected.dietChart}</ReactMarkdown>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default History