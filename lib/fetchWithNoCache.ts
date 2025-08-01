export const fetchWithNoCache = async (url: string, options: RequestInit = {}) => {
  const defaultOptions: RequestInit = {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      ...options.headers,
    },
    ...options,
  };

  return fetch(url, defaultOptions);
};
