'use client';

import { Region } from '@/types/page-types';
import ComponentRenderer from '../components/ComponentRenderer';

export default function RegionRenderer({ region }: { region: Region }) {
  return (
    <div 
    {...{
      'typeof': 'Region'
    }}
    resource={`${region.title.toLowerCase().replace(' ', '-')}`}>    
        
        {region.components.map((component, index) => (
          <ComponentRenderer 
            key={`${component.id}-${index}`}
            component={component}
          />
        ))}
        
      </div>
   );
}