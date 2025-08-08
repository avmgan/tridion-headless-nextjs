'use client';

import { Component } from '@/types/page-types';

export default function Download({ component }: { component: Component }) {
  return (
    <div prefix="s: http://schema.org/" typeof="s:DataDownload s:MediaObject">
    <div className="download-list">
        <i className="fa fa-file-pdf-o"></i>
        <div>
            <a href={component.content.media.url}>{component.title}</a> 
            <small className="size">(8 KB)</small>
                <small property="name description">{component.componentCustomMetadata.description}</small>
        </div>
    </div>
</div>      
  );
}