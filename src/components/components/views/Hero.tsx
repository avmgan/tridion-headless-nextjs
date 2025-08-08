'use client';

import { Component } from '@/types/page-types';

export default function Hero({ component }: { component: Component }) {
  return (
    <div className="component-default">
      <h3>Component: {component.componentTemplate.view}</h3>
      <pre>{JSON.stringify(component.content, null, 2)}</pre>
    </div>
  );
}