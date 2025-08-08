'use client';

import { Component } from '@/types/page-types';

export default function Place({ component }: { component: Component }) {
  return (
    <div className="col-sm-6 col-md-4">
      <div>
        <h3>{component.content.name}</h3>
        <div id="mapdddd65573335453abe1aff84ac65d656" className="static-map">
          <img src="//developers.google.com/static/maps/images/landing/hero_maps_static_api_480.png" alt="Head Office - London" height="175" />
         </div>
      </div>
    </div>      
  );
}