// src/services/resourceService.ts
import { ResourceDictionary } from '@/types/resources';

let resourceCache: Record<string, ResourceDictionary> = {};

export async function fetchResources(locale = ''): Promise<ResourceDictionary> {
  const cacheKey = locale || 'default';
  
  if (resourceCache[cacheKey]) {
    return resourceCache[cacheKey];
  }

  try {
    const apiPath = locale 
      ? `/api/proxy${locale}/resources.json`
      : '/api/proxy/resources.json';
    
    const response = await fetch(apiPath);
    
    if (!response.ok) {
      throw new Error('Failed to fetch resources');
    }
    
    const resources: ResourceDictionary = await response.json();
    resourceCache[cacheKey] = resources;
    return resources;
  } catch (error) {
    console.error('Error fetching resources:', error);
    return {};
  }
}

export function clearResourceCache(): void {
  resourceCache = {};
}

export function getResource(
  key: string, 
  locale = '', 
  placeholders: Record<string, string> | string[] = []
): string {
  const cacheKey = locale || 'default';
  const resources = resourceCache[cacheKey] || {};
  let value = resources[key] || key; // Fallback to key if not found

  // Handle placeholders - both array format {0} and named format {name}
  if (Array.isArray(placeholders)) {
    placeholders.forEach((val, index) => {
      value = value.replace(new RegExp(`\\{${index}\\}`, 'g'), val.toString());
    });
  } else {
    for (const [name, val] of Object.entries(placeholders)) {
      value = value.replace(new RegExp(`\\{${name}\\}`, 'g'), val.toString());
    }
  }

  return value;
}