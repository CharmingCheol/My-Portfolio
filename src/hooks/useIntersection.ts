import { useCallback, useEffect, useRef } from "react";

interface OptionProps {
  root?: HTMLElement | null;
  threshold?: number;
  rootMargin?: string;
}

const useIntersection = <Tag extends HTMLElement>(onIntersect: () => void, option?: OptionProps) => {
  const ref = useRef<Tag>(null);

  const checkIntersection: IntersectionObserverCallback = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        onIntersect();
        observer.unobserve(entry.target);
      }
    },
    [onIntersect],
  );

  useEffect(() => {
    if (!ref.current) return;
    const defaultOption = { root: null, rootMargin: "0px", threshold: 0.5 };
    const observer = new IntersectionObserver(checkIntersection, { ...defaultOption, ...option });
    observer.observe(ref.current);
    return (): void => observer && observer.disconnect();
  }, [checkIntersection, option]);

  return ref;
};

export default useIntersection;
