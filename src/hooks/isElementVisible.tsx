import { useEffect, useRef, useState } from "react";

export const useIsElementVisible = (options: IntersectionObserverInit) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callBackFUnction: IntersectionObserverCallback = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callBackFUnction, options);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};
