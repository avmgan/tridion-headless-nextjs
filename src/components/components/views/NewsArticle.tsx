'use client';

import { Component } from '@/types/page-types';
import { useEffect, useState } from 'react';

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
    <article className="rich-text" prefix="s: http://schema.org/" typeof="s:Article">
      {/* Hero Image Section */}
      {shouldShowHeroImage ? (
        <div className="hero" property="image">
          <img 
            src={heroImage.url} 
            alt={heroImage.altText || ''} 
            data-aspect="3.3"
            // Remove any dynamic styles that might cause hydration mismatch
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
                {para.media.$type === 'Image' ? (
                  <figure property="media">
                    <img 
                      src={para.media.url} 
                      alt={para.media.altText || ''} 
                      width="100%"
                      // Use width instead of style to avoid hydration issues
                    />
                    {para.caption && (
                      <figcaption property="caption">{para.caption}</figcaption>
                    )}
                  </figure>
                ) : (
                  <div property="media">
                    <div 
                      dangerouslySetInnerHTML={{ __html: para.media.embedCode || '' }} 
                    />
                    {para.caption && (
                      <div property="caption">{para.caption}</div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}