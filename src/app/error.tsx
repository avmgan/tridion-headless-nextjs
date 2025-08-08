// src/app/error.tsx
'use client';

interface ErrorProps {
  error: {
    message: string;
    digest?: string;
  };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Something went wrong!</h2>
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
        <p className="font-medium">{error.message}</p>
        {error.digest && (
          <p className="text-sm mt-2">Error reference: {error.digest}</p>
        )}
      </div>
      <button
        onClick={() => reset()}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
}