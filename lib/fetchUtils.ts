export const fetchWithNoCache = async (url: string, options: RequestInit = {}) => {
  const timestamp = new Date().getTime();
  const urlWithTimestamp = url.includes('?') 
    ? `${url}&t=${timestamp}` 
    : `${url}?t=${timestamp}`;

  const defaultHeaders = {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  };

  const response = await fetch(urlWithTimestamp, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    cache: 'no-store',
    next: { revalidate: 0 }
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error(`Error fetching ${url}:`, response.status, errorData);
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  return response;
};

export const fetchJsonWithNoCache = async <T = any>(url: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetchWithNoCache(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  return response.json();
};
