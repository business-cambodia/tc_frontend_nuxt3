import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    console.log('📢 Received request...')

    const body = await readBody<{ prompt: string }>(event)

    console.log('📢 Received Data:')

    if (!body || typeof body.prompt !== 'string') {
      return {
        statusCode: 400,
        body: { error: 'Invalid prompt provided' }
      }
    }

    const prompt = body.prompt

    const GEMINI_API_KEY = 'AIzaSyCQ93H8BG0Fs1jDDulI_gvEYtvX7uc86BA'

    if (!GEMINI_API_KEY) {
      throw new Error('Missing GEMINI_API_KEY environment variable')
    }

    // console.log(`📢 Sending prompt: ${prompt}`)

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`

    const payload = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    }

    console.log('📢 Sending payload:', payload)

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const data = await response.json()
    console.log('📢 API Response:')

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: { error: data?.error?.message || 'Error calling Gemini API' }
      }
    }

    const responseText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated'

    console.log('📢 Extracted response text:')

    return { responseText }
  } catch (err: any) {
    console.error('🔥 Server error processing Gemini request:', err)
    return {
      statusCode: 500,
      body: { error: `Internal server error: ${err.message}` }
    }
  }
})
