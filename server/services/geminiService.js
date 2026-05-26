import Groq from 'groq-sdk'
import dotenv from 'dotenv'
dotenv.config()

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export const generateDietChart = async (profile, userName) => {
  const heightInMeters = profile.height / 100
  const bmi = (profile.weight / (heightInMeters * heightInMeters)).toFixed(1)

  let bmiCategory = ''
  if (bmi < 18.5) bmiCategory = 'Underweight'
  else if (bmi < 24.9) bmiCategory = 'Normal'
  else if (bmi < 29.9) bmiCategory = 'Overweight'
  else bmiCategory = 'Obese'

  const prompt = `
    You are a professional nutritionist and dietician. Create a detailed personalized diet chart for the following person:

    Name: ${userName}
    Age: ${profile.age} years
    Gender: ${profile.gender}
    Weight: ${profile.weight} kg
    Height: ${profile.height} cm
    BMI: ${bmi} (${bmiCategory})
    Activity Level: ${profile.activityLevel}
    Goal: ${profile.goal}
    Food Preference: ${profile.foodPreference}
    Allergies: ${profile.allergies.length > 0 ? profile.allergies.join(', ') : 'None'}
    Medical Conditions: ${profile.medicalConditions.length > 0 ? profile.medicalConditions.join(', ') : 'None'}

    Please provide a comprehensive diet chart that includes:
    1. Daily Calorie Requirements (BMR and TDEE)
    2. Macro nutrients breakdown (Proteins, Carbs, Fats in grams)
    3. Breakfast options (3 options)
    4. Mid Morning Snack (2 options)
    5. Lunch options (3 options)
    6. Evening Snack (2 options)
    7. Dinner options (3 options)
    8. Foods to avoid
    9. Hydration recommendation
    10. Special tips based on their goal and medical conditions

    Make it very detailed, practical and specific to Indian food culture.
    Format it clearly with proper headings and bullet points.
  `

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: 2048
  })

  return completion.choices[0]?.message?.content || 'Could not generate diet chart'
}