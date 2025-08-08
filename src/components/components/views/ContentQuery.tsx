'use client';

import { Component } from '@/types/page-types';
import { useResources } from '@/hooks/useresources';
export default function ContentQuery({ component }: { component: Component }) {
    const { resource } = useResources(component.path);
  return (
    <div className="col-sm-6 col-md-4">
    <div prefix="s: http://schema.org/">
        <h3 property="headline">{component.content.headline}</h3>
    <ul>
            <li>
                    <a href="/articles/news/news3">
                        Fusce ullamcorper 
                    </a>
                                    <time className="meta small">[15 Jul 2014]</time>
            </li>
            <li>
                    <a href="/articles/news/news4">
                        Aliquam quis egesta 
                    </a>
                                    <time className="meta small">[18 Jun 2014]</time>
            </li>
            <li>
                    <a href="/articles/news/news2">
                        Praesent facilisis consectet.
                    </a>
                                    <time className="meta small">[17 Aug 2014]</time>
            </li>
            <li>
                    <a href="/articles/news/news1">
                        Cras vel justo semp
                    </a>
                                    <time className="meta small">[18 Aug 2014]</time>
            </li>
    </ul>
        <p property="link">
            <a href={component.content.link?.internalLink.url}>{component.content.link?.linkText} <i className="fa fa-chevron-right"></i></a>
        </p>
</div>  
    </div>      
  );
}