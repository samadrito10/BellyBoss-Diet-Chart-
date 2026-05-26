import Profile from '../models/Profile.js'

// CREATE or UPDATE profile
export const saveProfile = async (req, res) => {
  try {
    const {
      age, gender, weight, height,
      activityLevel, goal, foodPreference,
      allergies, medicalConditions
    } = req.body

    // Check if profile already exists
    let profile = await Profile.findOne({ user: req.user._id })

    if (profile) {
      // Update existing profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user._id },
        {
          age, gender, weight, height,
          activityLevel, goal, foodPreference,
          allergies, medicalConditions
        },
        { new: true }
      )
      return res.status(200).json({ message: 'Profile updated', profile })
    }

    // Create new profile
    profile = await Profile.create({
      user: req.user._id,
      age, gender, weight, height,
      activityLevel, goal, foodPreference,
      allergies, medicalConditions
    })

    res.status(201).json({ message: 'Profile created', profile })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// GET profile
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id })

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }

    res.status(200).json({ profile })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// GET BMI
export const getBMI = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id })

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }

    // BMI formula = weight(kg) / height(m)^2
    const heightInMeters = profile.height / 100
    const bmi = (profile.weight / (heightInMeters * heightInMeters)).toFixed(1)

    let category = ''
    if (bmi < 18.5) category = 'Underweight'
    else if (bmi < 24.9) category = 'Normal'
    else if (bmi < 29.9) category = 'Overweight'
    else category = 'Obese'

    res.status(200).json({ bmi, category })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}