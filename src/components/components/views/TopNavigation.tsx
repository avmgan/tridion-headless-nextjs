// components/views/TopNavigation.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { fetchNavigationData } from '@/services/navigation-service';
import { NavigationData } from '@/types/navigation-types';

interface NavigationItem {
  title: string;
  url: string;
  visible: boolean;
  alternateText?: string;
}

interface TopNavigationProps {
  serverData?: NavigationData | null;
  localizationPath: string;
}

const DEFAULT_NAV_ITEMS: NavigationItem[] = [];

export default function TopNavigation({ serverData, localizationPath }: TopNavigationProps) {
  const [navItems, setNavItems] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;
    
    const loadNavigation = async () => {
      try {
        //setLoading(true);
        //setError(null);
        
        console.debug('[Navigation] Fetching navigation data...');
        const startTime = performance.now();
        
        const result = await fetchNavigationData(localizationPath);
        
        if (!isMounted) return;
        
        const processingTime = performance.now() - startTime;
        console.debug(`[Navigation] Data fetched in ${processingTime.toFixed(1)}ms`);

        if (!result?.items) {
          throw new Error('Invalid navigation data structure');
        }

        const processedItems = result.items
          .filter((item: any) => 
            item?.title && 
            item?.url && 
            item.visible !== false
          )
          .map((item: any) => ({
            title: item.title,
            url: item.url,
            visible: true,
            alternateText: item.alternateText || `${item.title} page`
          }));

        if (processedItems.length === 0) {
          console.warn('[Navigation] No valid items, using defaults');
          setNavItems(DEFAULT_NAV_ITEMS);
        } else {
          console.debug('[Navigation] Setting new navigation items', processedItems);
          setNavItems(processedItems);
        }
      } catch (err) {
        if (!isMounted) return;
        
        const errorMessage = err instanceof Error ? err.message : 'Failed to load navigation';
        console.error('[Navigation] Error:', errorMessage, err);
        setError(errorMessage);
        //setNavItems(DEFAULT_NAV_ITEMS);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Add slight delay to avoid flash of default content
    const timer = setTimeout(loadNavigation, 100);
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  const normalizeUrl = (url: string) => url.endsWith('/') ? url : `${url}/`;

  const isActive = (linkUrl: string) => {
    if (!pathname) return false;
    return normalizeUrl(pathname).startsWith(normalizeUrl(linkUrl));
  };

  // Determine which items to display
  const displayItems = navItems.length > 0 ? navItems : DEFAULT_NAV_ITEMS;

  return (
    <div className="navigation-wrapper relative">
      <ul className={`nav navbar-nav main-nav ${loading ? 'opacity-75' : ''}`}>
        {displayItems.map(item => (
          <li 
            key={`nav-${item.url}`}
            className={`nav-item ${isActive(item.url) ? 'active' : ''}`}
          >
            <Link
              href={item.url}
              className={`nav-link transition-opacity ${loading ? 'opacity-50' : 'opacity-100'}`}
              title={item.alternateText}
              prefetch={false}
              aria-busy={loading ? 'true' : 'false'}
            >
              {item.title}
              {loading && isActive(item.url) && (
                <span className="loading-dot ms-1">...</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
      
      {/* Status indicators */}
      {loading && (
        <div className="navigation-status absolute right-0 top-0 text-xs text-muted-foreground">
          {/*Loading updates...*/}
        </div>
      )}
      
      {error && (
        <div 
          className="navigation-error absolute right-0 top-0 text-xs text-warning"
          title={error}
        >
          (Updates unavailable)
        </div>
      )}
    </div>
  );
}