// src/hooks/useResources.ts
import { useEffect, useState } from 'react';
import { fetchResources, getResource } from '@/services/resource-service';
import { ResourceDictionary } from '@/types/resources';

export function useResources(locale = '') {
  const [resources, setResources] = useState<ResourceDictionary>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadResources = async () => {
      setIsLoading(true);
      try {
        const loadedResources = await fetchResources(locale);
        setResources(loadedResources);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load resources'));
      } finally {
        setIsLoading(false);
      }
    };

    loadResources();
  }, [locale]);

  const resource = (
    key: string, 
    placeholders?: Record<string, string> | string[]
  ): string => {
    return getResource(key, locale, placeholders);
  };

  return { 
    resources, 
    resource, 
    isLoading, 
    error 
  };
}