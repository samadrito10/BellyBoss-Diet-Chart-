import Profile from '../models/Profile.js'
import DietHistory from '../models/DietHistory.js'
import { generateDietChart } from '../services/geminiService.js'

// GENERATE diet chart
export const generateDiet = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id })

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found. Please complete your profile first.' })
    }

    const heightInMeters = profile.height / 100
    const bmi = (profile.weight / (heightInMeters * heightInMeters)).toFixed(1)

    let bmiCategory = ''
    if (bmi < 18.5) bmiCategory = 'Underweight'
    else if (bmi < 24.9) bmiCategory = 'Normal'
    else if (bmi < 29.9) bmiCategory = 'Overweight'
    else bmiCategory = 'Obese'

    // Generate diet chart using Gemini AI
    const dietChart = await generateDietChart(profile, req.user.name)

    // Save to history
    const history = await DietHistory.create({
      user: req.user._id,
      dietChart,
      profileSnapshot: {
        age: profile.age,
        gender: profile.gender,
        weight: profile.weight,
        height: profile.height,
        activityLevel: profile.activityLevel,
        goal: profile.goal,
        foodPreference: profile.foodPreference,
        allergies: profile.allergies,
        medicalConditions: profile.medicalConditions
      },
      bmi,
      bmiCategory
    })

    res.status(200).json({
      message: 'Diet chart generated successfully',
      dietChart,
      bmi,
      bmiCategory,
      historyId: history._id
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// GET diet history
export const getDietHistory = async (req, res) => {
  try {
    const history = await DietHistory.find({ user: req.user._id })
      .sort({ createdAt: -1 })

    res.status(200).json({ history })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// GET single diet history
export const getSingleHistory = async (req, res) => {
  try {
    const history = await DietHistory.findById(req.params.id)

    if (!history) {
      return res.status(404).json({ message: 'History not found' })
    }

    res.status(200).json({ history })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}