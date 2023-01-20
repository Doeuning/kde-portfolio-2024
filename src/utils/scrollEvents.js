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
          scrub: 1,
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

export const horizontalScroll = (getElements) => {
  // const scrollLeft = mobile
  //           ? $(element).get(0).scrollWidth - $(element).get(0).offsetWidth
  //           : 423;

  const moveLeft = (element) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 50%",
          end: () => {
            return "+=" + window.innerHeight * 2;
          },
          scrub: 1,
          pin: true,
          pinSpacing: true,
          toggleActions: "play none none reverse",
          markers: true,
        },
      })
      .to(element, {
        x: "-100%",
        y: 0,
        immediateRender: false,
        overwrite: "auto",
        duration: 1,
      });
  };
  const elements = gsap.utils.toArray(getElements);
  elements.forEach((element) => moveLeft(element));
};
