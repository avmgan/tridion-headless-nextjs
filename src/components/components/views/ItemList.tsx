'use client';

import { Component } from '@/types/page-types';
import { getMediaUrl } from '@/utils/getMediaUrl';

export default function ItemList({ component }: { component: Component }) {
  const items = component.content.itemListElement?.values || [];
  
  return (
    <div id="carousel-299" className="carousel slide" data-ride="carousel" data-interval="5000" prefix="s: http://schema.org/" 
    {...{
      'typeof': 's:ItemList'
    }}
    >
      {/* Dynamic Carousel Indicators */}
      <ol className="carousel-indicators">
        {items.map((_, index) => (
          <li 
            key={`indicator-${index}`}
            data-target="#carousel-299" 
            data-slide-to={index}
            className={index === 0 ? 'active' : ''}
          />
        ))}
      </ol>
      
      <div className="carousel-inner">
        {items.map((item: any, index: number) => (
          <div key={index} className={`item ${index === 0 ? 'active' : ''}`}>
            {item.media?.url && (
              <img 
                src={getMediaUrl(item.media.url, 1024,311)} 
                alt={item.media.title} 
                width="100%"
              />
            )}
            <div className="overlay overlay-tl ribbon">
              <h2>{item.subheading}</h2>
              <div>{item.content}</div>
            </div>
            {item.link && (
              <div className="carousel-caption">
                <p>
                  <a className="btn btn-primary" href={item.link.internalLink ? item.link.internalLink.url : '#'}>
                    {item.link.linkText}                  
                  </a>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <a className="left carousel-control" href="#carousel-299" data-slide="prev">
        <i className="fa fa-chevron-left carousel-icon-left"/>
      </a>
      <a className="right carousel-control" href="#carousel-299" data-slide="next">
        <i className="fa fa-chevron-right carousel-icon-right"/>
      </a>
    </div>
  );
}