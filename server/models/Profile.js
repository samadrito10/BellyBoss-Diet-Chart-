import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  activityLevel: {
    type: String,
    enum: ['sedentary', 'light', 'moderate', 'active', 'very_active'],
    required: true
  },
  goal: {
    type: String,
    enum: ['lose_weight', 'gain_weight', 'maintain_weight', 'build_muscle'],
    required: true
  },
  foodPreference: {
    type: String,
    enum: ['vegetarian', 'non_vegetarian', 'vegan'],
    required: true
  },
  allergies: {
    type: [String],
    default: []
  },
  medicalConditions: {
    type: [String],
    default: []
  }
}, { timestamps: true })

export default mongoose.model('Profile', profileSchema)