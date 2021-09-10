import { useState, useEffect, useRef } from "react";

function useScroll() {
  const scrollRef = useRef(null);
  const current = scrollRef.current;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsVisible(entry.isIntersecting);
      });
    });

    if (current) observer.observe(current as unknown as Element);

    return () => {
      if (current) observer.unobserve(current as unknown as Element);
    };
  }, [current]);

  return [scrollRef, isVisible];
}

export default useScroll;
