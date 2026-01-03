import { ProResponse, UpdateProInput } from 'sowhat-types';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!BACKEND_URL) {
  console.warn('NEXT_PUBLIC_BACKEND_URL is not defined');
}

/**
 * Helper to make authenticated requests to the backend
 */
async function fetchWithAuth(endpoint: string, token: string | null, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options.headers as Record<string, string>) || {}),
  };

  // Only add Content-Type: application/json if the body is not FormData
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${BACKEND_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorBody}`);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }

  // Check if response is JSON
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
}

/**
 * Get the Pro profile for the current user
 * Returns null if the user doesn't exist yet
 */
export async function getPro(token: string | null): Promise<ProResponse | null> {
  try {
    const data = await fetchWithAuth('/pro', token, { method: 'GET' });
    return data as ProResponse | null;
  } catch (error) {
    console.error('Error fetching pro profile:', error);
    throw error;
  }
}

/**
 * Update or create the Pro profile
 */
export async function updatePro(data: UpdateProInput, token: string | null): Promise<ProResponse> {
  const result = await fetchWithAuth('/pro', token, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return result as ProResponse;
}

/**
 * Upload an image for the Pro profile
 */
export async function uploadImage(
  file: File,
  type: 'clerk' | 'company',
  token: string | null
): Promise<void> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);

  await fetchWithAuth('/pro/upload', token, {
    method: 'POST',
    body: formData,
  });
}
