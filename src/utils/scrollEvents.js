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
        element.childNodes,
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
  elements.forEach((element) => moveUp(element));
};

export const staggerText = (
  getStringElements,
  staggerNum = 0.1,
  yPosition = 20
) => {
  const moveUp = (element) => {
    element.style.whiteSpace = "pre";
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
        element.childNodes,
        {
          display: "inline-block",
          y: yPosition,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: staggerNum,
        }
      );
  };
  const elements = gsap.utils.toArray(getStringElements);
  elements.forEach((element) => {
    const textArr = [...element.childNodes]
      .map((item) => {
        if (item.nodeType !== 3) {
          return item.outerHTML;
        } else {
          return item.nodeValue
            .split("")
            .map((letter) => {
              return `<span>${letter}</span>`;
            })
            .join("");
        }
      })
      .join("");
    element.innerHTML = textArr;
    moveUp(element);
  });
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
          // pinReparent: true,
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
  const moveParallax = (element, i) => {
    const speed = element.dataset.speed;
    const gap = 100;
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
      // element.style.opacity = 0;
      // element.style.transform = `translateY(${gap}px)`;
      // gsap.from(element, {
      //   opacity: 0,
      //   // y: `+=${gap}`,
      // });
      // gsap.to(element, {
      //   opacity: 1,
      //   // y: "auto",
      //   ease: "none",
      //   // duration: 0.5,
      //   scrollTrigger: {
      //     trigger: element,
      //     start: `top bottom`,
      //     end: `top bottom-=${gap / 4}`,
      //     scrub: 1,
      //     invalidateOnRefresh: true,
      //     toggleActions: "play none none reverse",
      //     markers: {
      //       startColor: "red",
      //       endColor: "red",
      //       fontSize: "18px",
      //       fontWeight: "bold",
      //       indent: 250,
      //     },
      //     onToggle: (self) => {
      //       if (i === 0) {
      //         console.log("hello----------------------progress", self.progress);
      //       }
      //     },
      //   },
      // });
      gsap.to(element, {
        y: `-${moveY}`,
        ease: "none",
        // duration: 1,
        scrollTrigger: {
          trigger: element,
          start: `top bottom-=${gap}`,
          // start: (self) => self.previous().end,
          end: `bottom-=${moveY}px top+=${element.offsetHeight / 3}px`,
          scrub: 2,
          invalidateOnRefresh: true,
          // markers: {
          //   startColor: "black",
          //   endColor: "black",
          //   fontSize: "18px",
          //   fontWeight: "bold",
          //   indent: 500,
          // },
          toggleActions: "play none none reverse",
          onToggle: (self) => {
            if (i === 0) {
              console.log(
                "----------------------parallax progress",
                self.progress
              );
            }
          },
        },
      });
      // console.log(`bottom-=${moveY}px top+=${element.offsetHeight / 4}px`);
      // gsap.to(element, {
      //   y: `-${moveY + gap}`,
      //   opacity: 0,
      //   ease: "none",
      //   // duration: 0.5,
      //   scrollTrigger: {
      //     trigger: element,
      //     start: `bottom-=${moveY + gap}px top+=${element.offsetHeight / 4}px`,
      //     // start: (self) => self.previous().end,
      //     end: `+=${gap / 2}`,
      //     scrub: 1,
      //     invalidateOnRefresh: true,
      //     toggleActions: "play none none reverse",
      //     markers: {
      //       startColor: "blue",
      //       endColor: "blue",
      //       fontSize: "18px",
      //       fontWeight: "bold",
      //       indent: 0,
      //     },
      //     onToggle: (self) => {
      //       if (i === 0) {
      //         console.log(
      //           i,
      //           "----------------------byebye progress",
      //           self.progress
      //         );
      //       }
      //     },
      //   },
      // });
    }
  };
  const elements = gsap.utils.toArray(getElements);
  elements.forEach((element, i) => moveParallax(element, i));
};
