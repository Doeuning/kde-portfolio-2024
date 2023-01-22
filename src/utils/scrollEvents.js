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

export const staggerElement = (getElements, staggerNum = 0.1) => {
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
          stagger: staggerNum,
        }
      );
  };
  const elements = gsap.utils.toArray(getElements);
  moveUp(elements);
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
          start: `center center`,
          end: `bottom+=${scrollLeft} 50%`,
          scrub: 1,
          pin: true,
          pinSpacing: type === "background" ? false : true,
          toggleActions: "play none none reverse",
        },
      })
      .to(element, {
        x: -scrollLeft,
        y: "auto",
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
    const speed = element.dataset.speed;
    const gap = 200;
    let moveY = element.offsetHeight * speed;
    if (type === "background") {
      gsap.to(element, {
        scrollTrigger: {
          scrub: 1,
        },
        y: -ScrollTrigger.maxScroll(window) * speed,
        ease: "none",
      });
    } else {
      gsap.fromTo(
        element,
        {
          y: `+=${gap}`,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: element,
            start: `top bottom`,
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        element,
        {
          y: 0,
        },
        {
          y: `-=${moveY}`,
          ease: "power2",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: `bottom-=${moveY - element.offsetHeight / 3}px top+=${
              element.offsetHeight / 3
            }px`,
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        element,
        {
          y: `-=${moveY}`,
          opacity: 1,
        },
        {
          y: `-=${gap}`,
          opacity: 0,
          scrollTrigger: {
            trigger: element,
            start: `bottom-=${moveY}px top+=${element.offsetHeight / 3}px`,
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  };
  const elements = gsap.utils.toArray(getElements);
  elements.forEach((element) => moveParallax(element));
};
