// src/components/layouts/PageRenderer.tsx
'use client';

import { PageResponse } from '@/types/page-types';
import Header from '@/components/regions/Header';
import Footer from '@/components/regions/Footer';
import RegionRenderer from '@/components/regions/RegionRenderer';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { NavigationData } from '@/types/navigation-types';
import React, { useState, useEffect } from 'react';

export default function Home({ pageData }: { pageData?: PageResponse }) {
  const [navigationData, setNavigationData] = useState<NavigationData | null>(null);

  useEffect(() => {
    // First try to get data from window object
    if (typeof window !== 'undefined' && window.__NAVIGATION_DATA__) {
      setNavigationData(window.__NAVIGATION_DATA__);
      return;
    }

    // Fallback to fetch if window data not available
    const fetchData = async () => {
      try {
        const response = await fetch('/api/proxy/navigation');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setNavigationData(data);
      } catch (error) {
        console.error('Failed to fetch navigation:', error);
        setNavigationData({ items: [] });
      }
    };

    fetchData();
  }, []);

  if (!pageData) {
    return <div>Loading...</div>;
  }

  // Safely destructure with defaults
  const { 
    pageTemplate = { view: 'default' }, 
    regions = [],
    headerRegions = [],
    footerRegions = []
  } = pageData;

  return (
    <>
    <ErrorBoundary fallback={<div>Header failed to load</div>}>
      {headerRegions?.length > 0 && <Header regions={headerRegions}  navigationData={navigationData} pageData={pageData} />}
    </ErrorBoundary>
    <main className="page-row page-row-expanded" role="main">
      <div className="container-fluid page-border">
        <ErrorBoundary fallback={<div>Main content failed to load</div>}>
          {regions?.map((region, index) => (
            <ErrorBoundary key={`region-${index}`} fallback={<div>Component failed to load</div>}>
              <div className="row">
                <div className="col-sm-12 col-md-12">
                  <RegionRenderer region={region} />
                </div>
              </div>
            </ErrorBoundary>
          ))}
        </ErrorBoundary>
        </div>
    </main>
    <ErrorBoundary fallback={<div>Footer failed to load</div>}>
    {footerRegions?.length > 0 && <Footer regions={footerRegions} />}
  </ErrorBoundary>
  </>
  );
}