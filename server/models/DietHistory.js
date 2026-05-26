import mongoose from 'mongoose'

const dietHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dietChart: {
    type: String,
    required: true
  },
  profileSnapshot: {
    age: Number,
    gender: String,
    weight: Number,
    height: Number,
    activityLevel: String,
    goal: String,
    foodPreference: String,
    allergies: [String],
    medicalConditions: [String]
  },
  bmi: String,
  bmiCategory: String
}, { timestamps: true })

export default mongoose.model('DietHistory', dietHistorySchema)