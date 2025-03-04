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
    
    // Get API key from server environment
    const apiKey = process.env.GEMINI_API_KEY
    
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
            parts: [{ text: prompt }]
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
