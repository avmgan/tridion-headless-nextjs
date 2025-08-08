'use client';

import { Component } from '@/types/page-types';

export default function Promo({ component }: { component: Component }) {
  return (
    <div prefix="s: http://schema.org/" typeof="s:DataDownload s:MediaObject">
      <h2>{component.content.title}</h2>
      <h2>{component.content.subHeading}</h2>
      <h2>{component.itemId}</h2>
      <h2>{component.publicationId}</h2>
      <h2>{component.schemaId}</h2>
    </div>      
  );
}
