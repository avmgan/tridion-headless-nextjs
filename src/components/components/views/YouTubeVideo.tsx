'use client';

import { Component } from '@/types/page-types';
import { getMediaUrl } from '@/utils/getMediaUrl';

export default function YouTubeVideo({ component }: { component: Component }) {
  return (
    <div className="col-sm-6 col-md-4">
      <div className="video" prefix="s: http://schema.org/" 
      {...{
        'typeof': 's:VideoObject s:MediaObject'
      }}
      
      ><h3>{component.componentCustomMetadata.headline}</h3>
              <div className="embed-video">
                <img src={getMediaUrl(component.content.media.url)} alt="Company News" />
                <button type="button" data-video="2YBtspm8j8M">
                    <i className="fa fa-play-circle"></i>
                </button>
              </div>
      </div>
    </div>                
  );
}