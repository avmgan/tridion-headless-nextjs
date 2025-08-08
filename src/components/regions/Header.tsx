// components/regions/Header.tsx
'use client';

import { PageResponse, Region } from '@/types/page-types';
import LogoRenderer from './LogoRenderer';
import NavRenderer from './NavRenderer';
import dynamic from 'next/dynamic';
import { NavigationData } from '@/types/navigation-types';

const LanguageSelector = dynamic(
  () => import('@/components/components/views/LanguageSelector'),
  {
    ssr: false,
    loading: () => <div className="select-placeholder" />,
  }
);

const TopNavigation = dynamic(
  () => import('@/components/components/views/TopNavigation'),
  {
    ssr: true, // Changed to true since we're now using usePathname
    loading: () => <div className="nav navbar-nav main-nav">Loading navigation...</div>,
  }
);

interface HeaderProps {
  regions: Region[];
  navigationData?: NavigationData | null;
  pageData?: PageResponse
}

export default function Header({ regions, navigationData, pageData }: HeaderProps)  {
  const logoRegion = regions.find(r => r.title === 'Logo');
  const navRegion = regions.find(r => r.title === 'Nav');

  return (
    <header id="page-header" className="navbar navbar-default">
      <div className="container-fluid page-border">
        <div className="row">
          <div className="col-xs-12" role="navigation">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-collapse"
              >
                <i className="fa fa-bars" />
              </button>

              {logoRegion && <LogoRenderer region={logoRegion} />}
            </div>

            <div className="navbar-collapse collapse" 
            {...{
              'typeof': 'Region',
              'resource': 'Nav'
            }}>
              {navRegion && <NavRenderer region={navRegion} />}
              <LanguageSelector pageData={pageData} />
              <TopNavigation serverData={navigationData} localizationPath={pageData?.path} />
              
              <form className="navbar-form navbar-right" action="/search" method="get">
                <div className="form-group">
                  <input
                    name="q"
                    type="text"
                    className="form-control"
                    placeholder="Search"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}