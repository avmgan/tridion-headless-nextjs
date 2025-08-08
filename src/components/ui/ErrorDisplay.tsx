// src/components/ui/ErrorDisplay.tsx
interface ErrorDisplayProps {
    message: string;
  }
  
  export default function ErrorDisplay({ message }: ErrorDisplayProps) {
    return (
      <div className="component-default p-4 border border-red-500 rounded">
        <h3 className="text-lg font-bold text-red-600">Error</h3>
        <p className="mt-2 text-red-500">{message}</p>
      </div>
    );
  }