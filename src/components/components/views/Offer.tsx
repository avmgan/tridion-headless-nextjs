'use client';

import { Component } from '@/types/page-types';

export default function Offer({ component }: { component: Component }) {
  return (
    <div prefix="s: http://schema.org/" typeof="s:DataDownload s:MediaObject">
    <h2>{component.content.title}</h2>
    <h3>{component.content.subHeading}</h3>
    </div>      
  );
}