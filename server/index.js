import dns from 'dns';

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
]);

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import dietRoutes from './routes/dietRoutes.js'

dotenv.config()
dotenv.config()
console.log('GROQ KEY:', process.env.GROQ_API_KEY)

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/diet', dietRoutes)

// Test route
app.get('/', (req, res) => {
  res.send('Diet Chart API is running!')
})

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected')
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))
  })
  .catch((err) => console.log('❌ MongoDB connection error:', err))