'use client';

import { Region } from '@/types/page-types';
import FooterGroupLinks from './FooterGroupLinks';
import FooterLinks from './FooterLinks';


export default function Footer({ regions }: { regions: Region[] }) {
	const footerLinksRegion = regions.find(r => r.title === 'Links');
	const footerGrouoLinksRegion = regions.find(r => r.title === 'Footer Links');

	return (
    <footer id="page-footer" className="page-row">
      <div className="container-fluid page-border">
	 	 {footerGrouoLinksRegion && <FooterGroupLinks region={footerGrouoLinksRegion} />}
	  	<hr />
		 {footerLinksRegion && <FooterLinks region={footerLinksRegion} />}
      </div>
    </footer>
  );
}