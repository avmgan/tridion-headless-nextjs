'use client';

import { useEffect, useState } from 'react';
import { fetchLocalizations } from '@/services/localization-service';

interface Localization {
  id: string;
  path: string;
  language: string;
}

interface LanguageSelectorProps {
  pageData: {
    itemId: string;
    publicationId: string;
    path: string;
  };
}

export default function LanguageSelector({ pageData }: LanguageSelectorProps) {
  const [localizations, setLocalizations] = useState<Localization[]>([]);
  const [selectedLocalizationId, setSelectedLocalizationId] = useState<string>('');

  useEffect(() => {
    const loadLocalizations = async () => {
      try {
        const localizationPath = pageData.path ? pageData.path.trim() : '';
        const data = await fetchLocalizations(localizationPath);
        setLocalizations(data);

        if (pageData?.publicationId) {
          setSelectedLocalizationId(pageData.publicationId);
        }
      } catch (error) {
        console.error('Error fetching localizations:', error);
      }
    };

    loadLocalizations();
  }, [pageData]);

  const handleLanguageChange = async (localizationId: string) => {
    try {
      const selectedLocalization = localizations.find(loc => loc.id === localizationId);
      if (!selectedLocalization) return;

      const response = await fetch(
        `/api/proxy/resolve/${pageData.itemId}?localizationId=${localizationId}&defaultPath=${encodeURIComponent(selectedLocalization.path)}`
      );
      
      if (!response.ok) {
        throw new Error(`API responded with ${response.status}`);
      }

      const data = await response.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        console.error('Invalid response format:', data);
      }
    } catch (error) {
      console.error('Error during language change:', error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.jQuery) {
      const $ = window.jQuery;
      $('.selectpicker').selectpicker('refresh');
    }
  }, [localizations, selectedLocalizationId]);

  if (!pageData || localizations.length <= 1) {
    return null;
  }

  return (
    <select
      className="selectpicker"
      value={selectedLocalizationId}
      onChange={(e) => {
        setSelectedLocalizationId(e.target.value);
        handleLanguageChange(e.target.value);
      }}
    >
      {localizations.map((loc) => (
        <option key={loc.id} value={loc.id}>
          {loc.language}
        </option>
      ))}
    </select>
  );
}