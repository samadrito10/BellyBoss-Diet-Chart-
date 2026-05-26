import express from 'express'
import { generateDiet, getDietHistory, getSingleHistory } from '../controllers/dietController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/generate', protect, generateDiet)
router.get('/history', protect, getDietHistory)
router.get('/history/:id', protect, getSingleHistory)

export default router