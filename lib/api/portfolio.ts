import { PortfolioItem } from '@/types/portfolio';

export async function getPortfolioItems(service?: string): Promise<PortfolioItem[]> {
  const url = new URL('/api/portfolio/items', window.location.origin);
  
  if (service) {
    url.searchParams.append('service', service);
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!response.ok) {
    throw new Error('Failed to fetch portfolio items');
  }

  const data = await response.json();
  return data.data;
}

export async function getPortfolioItem(id: string): Promise<PortfolioItem> {
  const response = await fetch(`/api/portfolio/items/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch portfolio item');
  }

  const data = await response.json();
  return data.data;
}

export async function createPortfolioItem(formData: FormData): Promise<PortfolioItem> {
  const response = await fetch('/api/portfolio/items', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create portfolio item');
  }

  const data = await response.json();
  return data.data;
}

export async function updatePortfolioItem(id: string, formData: FormData): Promise<PortfolioItem> {
  const response = await fetch(`/api/portfolio/items/${id}`, {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update portfolio item');
  }

  const data = await response.json();
  return data.data;
}

export async function deletePortfolioItem(id: string): Promise<void> {
  const response = await fetch(`/api/portfolio/items/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete portfolio item');
  }
}
