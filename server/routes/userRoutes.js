import express from 'express'
import { saveProfile, getProfile, getBMI } from '../controllers/userController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/profile', protect, saveProfile)
router.get('/profile', protect, getProfile)
router.get('/bmi', protect, getBMI)

export default router