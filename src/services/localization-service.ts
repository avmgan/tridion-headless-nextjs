// src/services/localization-service.ts
export interface Localization {
    id: string;
    path: string;
    language: string;
    isDefault: boolean;
  }
  
  export async function fetchLocalizations(localePath: string = ''): Promise<Localization[]> {
    try {
      // Determine the API endpoint based on localePath
      const apiEndpoint = localePath 
        ? `/api/proxy${localePath}/localization.json`
        : '/api/proxy/localization.json';
  
      const response = await fetch(apiEndpoint);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
  
      const data = await response.json();
      
      // Transform API response to our expected format
      return Array.isArray(data) ? data.map((item: any) => ({
        id: item.id,
        path: item.path || '', // Empty path for default localization
        language: item.language,
        isDefault: item.isDefaultLocalization
      })) : [];
      
    } catch (error) {
      console.error('Localization fetch error:', error);
      return [];
    }
  }