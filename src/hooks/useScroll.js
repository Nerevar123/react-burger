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

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [current]);

  return [scrollRef, isVisible];
}

export default useScroll;
