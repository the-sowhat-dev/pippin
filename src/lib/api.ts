import {
  FullLeadResponse,
  getFinancialProductKey,
  getProjectNeedKey,
  LeadsResponse,
  ProResponse,
  UpdateProInput,
  CreateCommercialOfferInput,
  ProCommercialOfferResponse,
  MatchingLeadsResponse,
  getPersonalSalaryRangeKey,
  getPersonalNetWorthRangeKey,
  ProLeadsAlertResponse,
  CreateProLeadsAlertInput,
  UpdateProLeadsAlertInput,
  UpdateCommercialOfferAsProInput,
} from "sowhat-types";

import { LeadsFiltersAndSorting } from "@/utils/filters";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!BACKEND_URL) {
  console.warn("NEXT_PUBLIC_BACKEND_URL is not defined");
}

/**
 * Helper to make authenticated requests to the backend
 */
async function fetchWithAuth<T>(
  endpoint: string,
  token: string | null,
  options: RequestInit = {},
): Promise<T | null> {
  const headers: Record<string, string> = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options.headers as Record<string, string>) || {}),
  };

  // Only add Content-Type: application/json if the body is not FormData
  if (!(options.body instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
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
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
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
    return fetchWithAuth<ProResponse | null>("/pro", token, { method: "GET" });
  } catch (error) {
    console.error("Error fetching pro profile:", error);
    throw error;
  }
}

/**
 * Update or create the Pro profile
 */
export async function updatePro(data: UpdateProInput, token: string | null): Promise<ProResponse> {
  const result = await fetchWithAuth<ProResponse | null>("/pro", token, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!result) {
    throw new Error("Failed to update pro profile");
  }

  return result;
}

/**
 * Initialize the Pro profile
 */
export async function initPro(token: string | null): Promise<ProResponse> {
  const result = await fetchWithAuth<ProResponse | null>("/pro/init", token, {
    method: "POST",
  });

  if (!result) {
    throw new Error("Failed to initialize pro profile");
  }

  return result;
}

/**
 * Upload an image for the Pro profile
 */
export async function uploadImage(
  file: File,
  type: "clerk" | "company",
  token: string | null,
): Promise<void> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);

  await fetchWithAuth<void>("/pro/upload", token, {
    method: "POST",
    body: formData,
  });
}

/**
 * Fetch filtered leads
 */
export async function getLeads(
  filters: LeadsFiltersAndSorting,
  cursor: string | null, // encoded { initialAmount: number, id: string }
  token: string | null,
): Promise<LeadsResponse> {
  const params = new URLSearchParams();

  params.append("minInitialAmount", filters.minInitialAmount.toString());
  params.append("maxInitialAmount", filters.maxInitialAmount.toString());

  if (filters.onlyWithoutProduct) {
    params.append("onlyWithoutProduct", "true");
  }

  if (filters.onlyOutsideFrance) {
    params.append("onlyOutsideFrance", "true");
  }

  filters.postalCodes.forEach((code) => {
    params.append("postalCodes[]", code);
  });

  if (filters.sortBy) {
    params.append("sortBy", filters.sortBy);
  }

  if (filters.sortOrder) {
    params.append("sortOrder", filters.sortOrder);
  }

  if (cursor) {
    params.append("cursor", cursor);
  }

  // Convert the label into keys
  filters.needs.forEach((n) => {
    const key = getProjectNeedKey(n);
    if (key) {
      params.append("needs[]", key);
    }
  });

  // Convert the label into keys
  filters.financialProducts.forEach((p) => {
    const key = getFinancialProductKey(p);
    if (key) {
      params.append("financialProducts[]", key);
    }
  });

  // Convert the label into keys
  filters.personalNetWorthRanges.forEach((r) => {
    const key = getPersonalNetWorthRangeKey(r);
    if (key) {
      params.append("personalNetWorthRanges[]", key);
    }
  });

  // Convert the label into keys
  filters.personalSalaryRanges.forEach((r) => {
    const key = getPersonalSalaryRangeKey(r);
    if (key) {
      params.append("personalSalaryRanges[]", key);
    }
  });

  try {
    console.log("Sending request to /pro/leads with params:", params.toString());

    const result = await fetchWithAuth<LeadsResponse | null>(
      `/pro/leads?${params.toString()}`,
      token,
      { method: "GET" },
    );

    if (!result) {
      return { items: [], nextCursor: null, total: 0 };
    }
    return result;
  } catch (error) {
    console.error("Error fetching leads:", error);
    throw error;
  }
}

/**
 * Get the full details of a specific lead
 */
export async function getLead(id: string, token: string | null): Promise<FullLeadResponse | null> {
  try {
    return fetchWithAuth<FullLeadResponse | null>(`/pro/lead/${id}`, token, { method: "GET" });
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
  token: string | null,
): Promise<ProCommercialOfferResponse> {
  const result = await fetchWithAuth<ProCommercialOfferResponse | null>("/pro/offer", token, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!result) {
    throw new Error("Failed to create offer");
  }

  return result;
}

/**
 * Update a commercial offer
 */
export async function updateOffer(
  offerId: string,
  data: UpdateCommercialOfferAsProInput,
  token: string | null,
): Promise<ProCommercialOfferResponse> {
  const result = await fetchWithAuth<ProCommercialOfferResponse | null>(
    `/pro/offer/${offerId}`,
    token,
    { method: "PUT", body: JSON.stringify(data) },
  );

  if (!result) {
    throw new Error("Failed to update offer");
  }

  return result;
}

/**
 * Toggle like for a user
 */
export async function toggleLikeUser(
  id: string,
  token: string | null,
  like: boolean,
): Promise<void> {
  await fetchWithAuth<void>(`/pro/like/user/${id}?like=${like}`, token, {
    method: "PUT",
  });
}

/**
 * Get all alerts for the current pro
 */
export async function getAlerts(token: string | null): Promise<ProLeadsAlertResponse[]> {
  try {
    const result = await fetchWithAuth<ProLeadsAlertResponse[]>("/pro/alerts", token, {
      method: "GET",
    });
    return result ?? [];
  } catch (error) {
    console.error("Error fetching alerts:", error);
    throw error;
  }
}

/**
 * Create a new leads alert
 */
export async function createAlert(
  data: CreateProLeadsAlertInput,
  token: string | null,
): Promise<ProLeadsAlertResponse> {
  const result = await fetchWithAuth<ProLeadsAlertResponse | null>("/pro/alerts", token, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!result) throw new Error("Failed to create alert");
  return result;
}

/**
 * Update an existing leads alert (filters, name, or pause)
 */
export async function updateAlert(
  data: UpdateProLeadsAlertInput,
  token: string | null,
): Promise<ProLeadsAlertResponse> {
  const { id, ...body } = data;
  const result = await fetchWithAuth<ProLeadsAlertResponse | null>(`/pro/alerts/${id}`, token, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  if (!result) throw new Error("Failed to update alert");
  return result;
}

/**
 * Delete a leads alert
 */
export async function deleteAlert(id: string, token: string | null): Promise<void> {
  await fetchWithAuth<void>(`/pro/alerts/${id}`, token, {
    method: "DELETE",
  });
}

/**
 * Get matching leads (offered and liked)
 */
export async function getMatchingLeads(token: string | null): Promise<MatchingLeadsResponse> {
  const result = await fetchWithAuth<MatchingLeadsResponse>("/pro/match", token, {
    method: "GET",
  });

  if (!result) {
    throw new Error("Failed to fetch matching leads");
  }

  return result;
}
