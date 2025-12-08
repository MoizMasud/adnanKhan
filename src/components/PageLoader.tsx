import { useEffect, useState } from 'react';

interface PageLoaderProps {
  children: React.ReactNode;
  delay?: number;
}

export default function PageLoader({ children, delay = 300 }: PageLoaderProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Immediately show content to allow IntersectionObserver to work
    setIsReady(true);

    // Wait for images and components to load
    const timer = setTimeout(() => {
      setIsReady(true);
    }, delay);

    // Also wait for window load event
    const handleLoad = () => {
      clearTimeout(timer);
      setIsReady(true);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, [delay]);

  // Render children immediately without any opacity wrapper
  // Let individual components handle their own visibility
  return <>{children}</>;
}
