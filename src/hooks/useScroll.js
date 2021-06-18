import { useEffect } from "react";

// function useScroll(elem, area, cb) {
//   useEffect(() => {
//     // const current = elem.map((item) => item.current);
//     // console.log(current);
//     const container = area.current;
//     var options = {
//       root: container,
//       rootMargin: '0px',
//       threshold: 1.0
//   }

//   const observer = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             const lazyImg = entry.target
//             console.log(lazyImg)
//             cb()
//             observer.unobserve(lazyImg)
//         }
//     })
// }, options)

// elem.forEach(i => {
//   console.log(i)
//   observer.observe(i)
// })




//     // observer.observe(elem[0].current);

//     // return () => {
//     //   observer.unobserve({current});
//     // };
//   }, [area, cb, elem]);
// }

function useScroll(elem, cb) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // console.log(entry);
            cb();
        }
      });
    });

    observer.observe(elem.current);

    return () => {
      observer.unobserve(elem.current);
    };
  }, [cb, elem]);
}

export default useScroll;
