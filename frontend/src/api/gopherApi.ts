import { ParsedGopherContent } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export interface FetchGopherParams {
  host: string;
  port: number;
  selector: string;
  searchQuery?: string;
}

export interface GopherApiResponse {
  success: boolean;
  isMenu: boolean;
  items?: any[];
  text?: string;
  error?: string;
}

export async function fetchGopherContent(params: FetchGopherParams): Promise<ParsedGopherContent> {
  const queryParams = new URLSearchParams({
    host: params.host,
    port: params.port.toString(),
    selector: params.selector
  });

  if (params.searchQuery) {
    queryParams.append('search', params.searchQuery);
  }

  const response = await fetch(`${API_BASE}/gopher?${queryParams}`);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }

  const data: GopherApiResponse = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Request failed');
  }

  return {
    isMenu: data.isMenu,
    items: data.items,
    text: data.text
  };
}
