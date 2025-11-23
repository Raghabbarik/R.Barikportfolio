
'use client';

import { useEffect, useState } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';

/**
 * This component listens for custom 'permission-error' events and throws them,
 * allowing them to be caught by Next.js's local development error overlay.
 * This provides a rich, in-context debugging experience for Firestore security rules.
 * It renders nothing and has no impact on the production build.
 */
export default function FirebaseErrorListener() {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handler = (e: Error) => {
      setError(e);
    };

    errorEmitter.on('permission-error', handler);

    return () => {
      errorEmitter.off('permission-error', handler);
    };
  }, []);

  if (error) {
    // Throwing the error will activate the Next.js error overlay
    throw error;
  }

  return null;
}
