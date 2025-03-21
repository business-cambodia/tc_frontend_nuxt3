import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { prompt } = body

    if (!prompt || typeof prompt !== 'string') {
      return {
        statusCode: 400,
        body: { error: 'Invalid prompt provided' }
      }
    }

    // Normalize input
    const lowerPrompt = prompt.toLowerCase().trim()

    // Define known phrases that trigger a custom response
    const introQuestions = [
      // English variations
      'who are you',
      'where are you',
      'what is your name',
      'what do you do',
      'are you human',
      'are you real',
      'tell me about yourself',
      'can you introduce yourself',
      'who created you',
      'where do you come from',
      'do you have a name',
      'what are you',
      'who made you',
      'do you have a creator',
      'who trained you',
      'are you an ai',
      'are you a bot',
      'what is your origin',
      'what company built you',
      'what’s your purpose',
    
      // Khmer variations
      'អ្នកជានរណា',
      'អ្នកឈ្មោះអ្វី',
      'អ្នកនៅឯណា',
      'អ្នកមកពីណា',
      'អ្នកជាអ្វី',
      'អ្នកបង្កើតដោយអ្នកណា',
      'អ្នកបង្កើតដោយក្រុមហ៊ុនណា',
      'អ្នកធ្វើអ្វីបានខ្លះ',
      'អ្នកកើតមកធ្វើអ្វី',
      'អ្នកមានឈ្មោះទេឬអត់',
      'អ្នកមានអ្វីពិសេស',
      'អ្នកជាមនុស្សឬ',
      'អ្នកជារ៉ូបូឬ',
      'អ្នកចេះនិយាយខ្មែរទេ',
      'តើអ្នកអាចណែនាំខ្លួនឯងបានទេ',
      'តើអ្នកបង្កើតឡើងដោយ ai ឬ',
      'អ្នកបង្កើតឡើងដោយ ai ទេ',
      'អ្នកជាអ្នកណាមួយ',
      'តើអ្នកអាចនិយាយអំពីខ្លួនអ្នកបានទេ',
      'តើអ្នកមានអត្តសញ្ញាណយ៉ាងដូចម្តេច'
    ]
    

    // Check if any of the phrases are included
    const isIntroQuestion = introQuestions.some(q =>
      lowerPrompt.includes(q) || prompt.includes(q)
    )

    if (isIntroQuestion) {
      return {
        responseText: 'ខ្ញុំគឺជាបច្ចេកវិទ្យាបញ្ញាសិប្បនិម្មិត (AI) រៀបចំដោយ Baksey Media។'
      }
    }

    // Get API key from server environment
    const apiKey = 'AIzaSyBasLyjnqdsDWdOSJxESQa6OXnA21hnoko'

    if (!apiKey) {
      console.error('Missing GEMINI_API_KEY environment variable')
      return {
        statusCode: 500,
        body: { error: 'Server configuration error' }
      }
    }

    // Make request to Gemini API from server-side
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `ឆ្លើយតបជាភាសាខ្មែរ៖ ${prompt}` }]
          }]
        })
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('Gemini API error:', data)
      return {
        statusCode: response.status,
        body: { error: data.error?.message || 'Error calling Gemini API' }
      }
    }

    return {
      responseText: data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated'
    }

  } catch (error) {
    console.error('Server error processing Gemini request:', error)
    return {
      statusCode: 500,
      body: { error: 'Internal server error' }
    }
  }
})
