'use client';

import { Component } from '@/types/page-types';
import { useEffect, useState } from 'react';
import { getMediaUrl } from '@/utils/getMediaUrl';

export default function Article({ component }: { component: Component }) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const heroImage = component.content?.image;
  const headline = component.content?.headline;
  const date = component.content?.date;
  const articleBody = component.content?.articleBody?.values;

  // Only render the hero image on client-side if not mobile
  const shouldShowHeroImage = isClient ? (heroImage?.url && window.innerWidth > 767) : false;

  return (
    <article className="rich-text" prefix="s: http://schema.org/" 
    {...{
      'typeof': 's:Article'
    }}
    >
      {/* Hero Image Section */}
      {shouldShowHeroImage ? (
        <div className="hero" property="image">
          <img 
            src={getMediaUrl(heroImage.url, 1024, 311)} 
            alt={heroImage.altText || ''} 
            data-aspect="3.3"
          />
          {headline && (
            <div className="overlay overlay-tl ribbon">
              <h1 property="headline">{headline}</h1>
            </div>
          )}
        </div>
      ) : (
        headline && <h1 property="headline">{headline}</h1>
      )}

      {/* Date - Use consistent date formatting */}
      {date && (
        <div className="meta" property="datePublished">
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      )}

      {/* Article Body */}
      <div className="content">
        {articleBody?.map((para, index) => (
          <div key={index} property="articleBody">
            {/* Subheading */}
            {para.subheading && (
              <h3 property="subheading">{para.subheading}</h3>
            )}

            {/* Content */}
            {para.content && (
              <div 
                property="content"
                dangerouslySetInnerHTML={{ __html: para.content }} 
              />
            )}

            {/* Media - Ensure consistent rendering */}
            {para.media && (
             <>
              {/* Check if we have a YouTube ID in metadata */}
              {'youTubeId' in para.media.metadata ? (
                <div 
                  className="video" 
                  prefix="s: http://schema.org/" 
                  property="media"
                  {...{
                    'typeof': 's:VideoObject s:MediaObject'
                  }}
                >
                  {para.media.metadata.headline && (
                    <h3>{para.media.metadata.headline}</h3>
                  )}
                  <div className="embed-video">
                    <img 
                      src={getMediaUrl(para.media.url, 1024)} 
                      alt={para.media.altText || para.media.metadata.headline || ''} 
                    />
                    <button type="button" data-video={para.media.metadata.youTubeId}>
                      <i className="fa fa-play-circle"></i>
                    </button>
                  </div>
                  {para.caption && (
                    <div property="caption">{para.caption}</div>
                  )}
                </div>
              ) : (
                <figure property="media">
                  <img 
                    src={getMediaUrl(para.media.url, 1024)} 
                    alt={para.media.altText || ''} 
                    width="100%"
                  />
                  {para.caption && (
                    <figcaption property="caption">{para.caption}</figcaption>
                  )}
                </figure>
              )}
            </>
          )}
          </div>
        ))}
      </div>
    </article>
  );
}