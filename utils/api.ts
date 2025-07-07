export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = `HTTP Error: ${response.status} ${response.statusText}`
    
    try {
      const error = await response.json()
      errorMessage = error.message || errorMessage
    } catch (parseError) {
      // If response is not JSON (e.g., HTML error page)
      console.warn('API response is not JSON:', parseError)
    }
    
    throw new Error(errorMessage)
  }

  try {
    return await response.json()
  } catch (parseError) {
    throw new Error('Invalid JSON response from server')
  }
}

export async function apiPost<T>(url: string, data: any, token?: string): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  })

  return handleApiResponse<T>(response)
} 