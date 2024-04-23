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

// type: default || background`
export const horizontalScroll = (getElements, type = "default") => {
  const moveLeft = (element) => {
    const scrollLeft = element.scrollWidth; // + element.offsetWidth
    const wrap = element.parentElement;
    const body = document.body,
      html = document.documentElement;

    const totalHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    // console.log("wrap", totalHeight);

    gsap
      .timeline({
        scrollTrigger: {
          trigger: wrap,
          start: `top top`,
          end: `bottom+=${totalHeight} 50%`,
          scrub: 1,
          pin: true,
          // pinReparent: true,
          pinSpacing: type !== "background" ? true : false,
          toggleActions: "play none none reverse",
        },
      })
      .fromTo(
        element,
        {
          x: 0,
        },
        {
          x: -scrollLeft,
          immediateRender: false,
          duration: 1,
        }
      );
  };
  const elements = gsap.utils.toArray(getElements);
  elements.forEach((element) => moveLeft(element));
};

export const scrollFixElement = (getElements, parent) => {
  const elements = gsap.utils.toArray(getElements);
  ScrollTrigger.defaults({
    scrub: 1,
    immediateRender: false,
    invalidateOnRefresh: true,
    toggleActions: "play none none reverse",
  });
  const moveFix = (element) => {
    const tl = gsap.timeline();
    tl.fromTo(
      element,
      {
        yPercent: 50,
      },
      {
        yPercent: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "center center",
        },
      }
    )
      .to(element, {
        duration: 1,
        scrollTrigger: {
          trigger: element,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          start: "center center",
          end: "+=" + window.innerHeight,
          toggleClass: "active",
          markers: true,
        },
      })
      .to(element, {
        yPercent: -50,
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: `center center+=${window.innerHeight}`,
          end: "bottom top",
        },
      });

    gsap.to(element, {
      duration: 5,
      ease: "none",
    });

    gsap.fromTo(
      element,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          anticipatePin: 1,
          start: "top bottom",
          end: "+=100",
          scrub: false,
        },
      }
    );
  };
  elements.forEach((element, i) => moveFix(element));
};

export const parallaxElement = (getElements, type = "default") => {
  const elements = gsap.utils.toArray(getElements);
  let speedArr = [];

  for (let i = 0; i < getElements.length; i++) {
    const random = Math.random() * 1,
      speed = random.toFixed(1);
    speedArr.push(speed);
  }

  const moveParallax = (element, i) => {
    const wrap = element.parentElement,
      speed = speedArr[i];
    let moveY = element.offsetHeight * speed,
      tl = gsap.timeline();

    if (type === "background") {
      tl.to(element, {
        scrollTrigger: {
          scrub: 1,
        },
        y: -document.querySelector("body").scrollHeight * speed,
        ease: "none",
      });
    } else {
      element.style.transform = `translateY(${moveY})`;
      ScrollTrigger.create({});
      tl.from(element, {
        opacity: 0,
        y: moveY,
      }).to(element, {
        y: `-=${moveY}`,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: `top bottom+=${100}`,
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
          toggleActions: "play none none reverse",
          onToggle: (self) => {
            // if (i === 0) {
            //   console.log(
            //     "----------------------parallax progress",
            //     self.progress
            //   );
            // }
          },
        },
      });
    }
  };
  elements.forEach((element, i) => moveParallax(element, i));
};
