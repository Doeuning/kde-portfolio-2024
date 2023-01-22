import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import usDetectDevice from "@src/hooks/usDetectDevice";
// const mobile = usDetectDevice();

gsap.registerPlugin(ScrollTrigger);

if (ScrollTrigger.isTouch === 1) {
  ScrollTrigger.config({
    autoRefreshEvents:
      "visibilitychange,DOMContentLoaded,load,orientationchange",
  });
}

export const transitionElement = (getElements) => {
  const moveUp = (element) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      })
      .fromTo(
        element,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
        }
      );
  };
  const elements = gsap.utils.toArray(getElements);
  elements.forEach((element) => moveUp(element));
};

// type: default || background
export const horizontalScroll = (getElements, type = "default") => {
  const moveLeft = (element) => {
    const scrollLeft = element.scrollWidth; // + element.offsetWidth
    const wrap = element.parentElement;
    gsap
      .timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top 50%",
          end: `bottom+=${scrollLeft} 50%`,
          scrub: 1,
          pin: true,
          pinSpacing: type === "background" ? false : true,
          toggleActions: "play none none reverse",
        },
      })
      .to(element, {
        x: -scrollLeft,
        immediateRender: false,
        overwrite: "auto",
        duration: 1,
      });
  };
  const elements = gsap.utils.toArray(getElements);
  elements.forEach((element) => moveLeft(element));
};

export const parallaxElement = (getElements, type = "default") => {
  const moveParallax = (element) => {
    window.addEventListener("scroll", (e) => {});
    const depth = element.dataset.depth;
    let movement = element.offsetHeight * depth;
    console.log("movement", movement);
    if (type === "background") {
      gsap.to(element, {
        scrollTrigger: {
          scrub: true,
        },
        y: -ScrollTrigger.maxScroll(window) * element.dataset.depth,
        ease: "none",
      });
    } else {
      gsap.fromTo(
        element,
        {
          y: `+=100`,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: element,
            start: `top+=100px bottom`,
            toggleActions: "play none none reverse",
            // markers: true,
            onEnter: () => {
              console.log("element enter", element);
              console.log(element.offsetHeight / depth / 1.5);
            },
          },
        }
      );
      gsap.fromTo(
        element,
        {
          y: 0,
        },
        {
          y: `-=${movement}`,
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: `bottom-=${movement - element.offsetHeight / 3}px top+=${
              element.offsetHeight / 3
            }px`,
            scrub: true,
            toggleActions: "play none none reverse",
            markers: true,
            onEnter: () => {
              console.log("parallax start");
            },
            onLeave: () => {
              console.log("parallax end");
            },
          },
        }
      );
      gsap.fromTo(
        element,
        {
          y: `-=${movement}`,
          opacity: 1,
        },
        {
          y: "-=100",
          opacity: 0,
          scrollTrigger: {
            trigger: element,
            start: `bottom-=${movement - element.offsetHeight / 3}px top+=${
              element.offsetHeight / 3
            }px`,
            toggleActions: "play none none reverse",
            // markers: true,
            onEnter: () => {
              console.log(
                `bottom-=${movement - element.offsetHeight / 3}px top+=${
                  element.offsetHeight / 3
                }px`
              );
              console.log("disappear start");
            },
          },
        }
      );
    }
  };
  const elements = gsap.utils.toArray(getElements);
  elements.forEach((element) => moveParallax(element));
};
