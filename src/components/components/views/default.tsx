import { Component } from '@/types/page-types';

export default function DefaultComponent({ component }: { component: Component }) {
  return (
    <div className="component-default">
      <h3>Component: {component?.componentTemplate?.view || 'Untitled'}</h3>
      {component?.content && (
        <pre>{JSON.stringify(component.content, null, 2)}</pre>
      )}
    </div>
  );
}