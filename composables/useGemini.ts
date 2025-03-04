// composables/useGemini.ts
export const useGemini = () => {
  const generateContent = async (prompt: string) => {
    try {
      // Call our secure server endpoint instead of the Gemini API directly
      const response = await useFetch('/api/gemini', {
        method: 'POST',
        body: { prompt }
      })

      if (response.error.value) {
        throw new Error(response.error.value?.data?.error || 'Failed to generate content')
      }

      const data = response.data.value

      if (isResponseWithText(data)) {
        return data.responseText
      } else {
        throw new Error('Failed to generate content')
      }

    } catch (error: any) {
      console.error('Gemini API Error:', error)
      throw new Error(error.message || 'Failed to generate content')
    }
  }

  const isResponseWithText = (data: any): data is { responseText: string } => {
    return data && typeof data.responseText === 'string'
  }

  return {
    generateContent
  }
}