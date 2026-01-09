import {
  FullLeadResponse,
  getFinancialProductKey,
  getProjectNeedKey,
  LeadsResponse,
  ProResponse,
  UpdateProInput,
  CreateCommercialOfferInput,
  UpdateCommercialOfferInput,
  ProCommercialOfferResponse,
  MatchingLeadsResponse,
} from 'sowhat-types';

import { LeadsFilters } from '@/utils/filters';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!BACKEND_URL) {
  console.warn('NEXT_PUBLIC_BACKEND_URL is not defined');
}

/**
 * Helper to make authenticated requests to the backend
 */
async function fetchWithAuth<T>(
  endpoint: string,
  token: string | null,
  options: RequestInit = {}
): Promise<T | null> {
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

  return response.text() as T;
}

/**
 * Get the Pro profile for the current user
 * Returns null if the user doesn't exist yet
 */
export async function getPro(token: string | null): Promise<ProResponse | null> {
  try {
    return fetchWithAuth<ProResponse | null>('/pro', token, { method: 'GET' });
  } catch (error) {
    console.error('Error fetching pro profile:', error);
    throw error;
  }
}

/**
 * Update or create the Pro profile
 */
export async function updatePro(data: UpdateProInput, token: string | null): Promise<ProResponse> {
  const result = await fetchWithAuth<ProResponse | null>('/pro', token, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  if (!result) {
    throw new Error('Failed to update pro profile');
  }

  return result;
}

/**
 * Initialize the Pro profile
 */
export async function initPro(token: string | null): Promise<ProResponse> {
  const result = await fetchWithAuth<ProResponse | null>('/pro/init', token, {
    method: 'POST',
  });

  if (!result) {
    throw new Error('Failed to initialize pro profile');
  }

  return result;
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

  await fetchWithAuth<void>('/pro/upload', token, {
    method: 'POST',
    body: formData,
  });
}

/**
 * Fetch filtered leads
 */
export async function getLeads(
  filters: LeadsFilters,
  cursor: string | null, // encoded { initialAmount: number, id: string }
  token: string | null
): Promise<LeadsResponse> {
  const params = new URLSearchParams();

  params.append('minInitialAmount', filters.minInitialAmount.toString());
  params.append('maxInitialAmount', filters.maxInitialAmount.toString());

  if (filters.onlyWithoutProduct) {
    params.append('onlyWithoutProduct', 'true');
  }

  if (cursor) {
    params.append('cursor', cursor);
  }

  // Convert the label into keys
  filters.needs.forEach((n) => {
    const key = getProjectNeedKey(n);
    if (key) {
      params.append('needs[]', key);
    }
  });

  // Convert the label into keys
  filters.financialProducts.forEach((p) => {
    const key = getFinancialProductKey(p);
    if (key) {
      params.append('financialProducts[]', key);
    }
  });

  try {
    console.log('Sending request to /pro/leads with params:', params.toString());

    const result = await fetchWithAuth<LeadsResponse | null>(
      `/pro/leads?${params.toString()}`,
      token,
      { method: 'GET' }
    );

    console.log('Getting a result:', result);

    if (!result) {
      return { items: [], nextCursor: null, total: 0 };
    }
    return result;
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
}

/**
 * Get the full details of a specific lead
 */
export async function getLead(id: string, token: string | null): Promise<FullLeadResponse | null> {
  try {
    return fetchWithAuth<FullLeadResponse | null>(`/pro/lead/${id}`, token, { method: 'GET' });
  } catch (error) {
    console.error(`Error fetching lead details for ${id}:`, error);
    throw error;
  }
}

/**
 * Create a commercial offer for a lead
 */
export async function createOffer(
  data: CreateCommercialOfferInput,
  token: string | null
): Promise<ProCommercialOfferResponse> {
  const result = await fetchWithAuth<ProCommercialOfferResponse | null>('/pro/offer', token, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!result) {
    throw new Error('Failed to create offer');
  }

  return result;
}

/**
 * Update a commercial offer
 */
export async function updateOffer(
  id: string,
  data: UpdateCommercialOfferInput,
  token: string | null
): Promise<ProCommercialOfferResponse> {
  const result = await fetchWithAuth<ProCommercialOfferResponse | null>(`/pro/offer/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  if (!result) {
    throw new Error('Failed to update offer');
  }

  return result;
}

/**
 * Toggle like for a user
 */
export async function toggleLikeUser(
  id: string,
  token: string | null,
  like: boolean
): Promise<void> {
  await fetchWithAuth<void>(`/pro/like/user/${id}?like=${like}`, token, {
    method: 'PUT',
  });
}

/**
 * Get matching leads (offered and liked)
 */
export async function getMatchingLeads(token: string | null): Promise<MatchingLeadsResponse> {
  const result = await fetchWithAuth<MatchingLeadsResponse | null>('/pro/match', token, {
    method: 'GET',
  });

  if (!result) {
    throw new Error('Failed to fetch matching leads');
  }

  return result;
}
