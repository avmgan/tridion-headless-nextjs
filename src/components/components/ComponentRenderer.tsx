'use client';

import { Component } from '@/types/page-types';
import { lazy, Suspense } from 'react';
import DefaultComponent from './views/default';

export default function ComponentRenderer({ component }: { component: Component }) {
  const viewName = component?.componentTemplate?.view || 'default';

  const ComponentTemplate = lazy(() =>
  import(`./views/${viewName}`)
    .then((module) => ({ default: module.default }))
    .catch((error) => {
      console.error(`Failed to load view "${viewName}":`, error);
      return { default: DefaultComponent };
    })
);

  return (
    <Suspense fallback={<div>Loading component...</div>}>
      <ComponentTemplate component={component} />
    </Suspense>
  );
}
