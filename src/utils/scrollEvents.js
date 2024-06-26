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
          y: -100,
          opacity: 0,
          stagger: staggerNum,
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

export const scrollFixElement = (getElements, delay) => {
  const windowHeight = window.innerHeight;
  const elements = document.querySelectorAll(getElements);
  let elementsTops = [];
  elements.forEach((element, i) => {
    const elementTop = element.getBoundingClientRect().top;
    element.style.opacity = 0;
    elementsTops.push(elementTop);
  });

  let index = 0;
  let opacity = 0;
  let prevScrollPos = 0;
  let scrollAmount = 0;
  const indexView = document.createElement("h1");
  indexView.textContent = index;
  indexView.style.position = "fixed";
  indexView.style.top = "50%";
  indexView.style.left = "50px";
  indexView.style.color = "lightgreen";
  indexView.style.fontSize = "100px";
  indexView.style.fontWeight = "700";

  const moveElements = () => {
    let currentScrollPos = window.scrollY;
    let scrollDifference = currentScrollPos - prevScrollPos;
    let startNum = 500;
    let isNegative = index % 2 === 0 ? 1 : -1;
    const direction = scrollDifference > 0 ? "down" : "up";
    const el = elements[index];
    // indexView.textContent = `${index} scrollAmount is ${scrollAmount} opacity is ${opacity}`;
    // document.body.append(indexView);

    let viewportTop = currentScrollPos;
    let viewportBottom = currentScrollPos + windowHeight;
    let currElTop = elementsTops[index];
    let currElBottom = elementsTops[index] + el.offsetHeight;

    const movePosition = () => {
      scrollAmount += scrollDifference;
      opacity += scrollDifference * 0.002;

      if (scrollAmount >= startNum) {
        scrollAmount = startNum;
      }
      if (scrollAmount <= 0) {
        scrollAmount = 0;
      }
      if (opacity >= 1) {
        opacity = 1;
      }
      if (opacity <= 0) {
        opacity = 0;
      }
      el.style.transform = `translate3d(${isNegative * (startNum - scrollAmount)}px, 0, 0)`;
      el.style.opacity = opacity;
      if (scrollAmount >= startNum) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    };
    const changeIndex = () => {
      if (scrollAmount >= 500) {
        scrollAmount = 0;
      } else {
        scrollAmount = startNum;
      }

      if (opacity >= 1) {
        opacity = 0;
      } else {
        opacity = 1;
      }
    };

    // scroll down
    if (direction === "down") {
      if (viewportBottom > currElTop) {
        movePosition();
      }
      if (viewportTop >= currElTop) {
        index++;
        changeIndex();
      }
    }
    // scroll up
    else {
      if (viewportBottom < currElBottom) {
        movePosition();
      }
      if (viewportBottom < currElTop) {
        index > 0 ? index-- : (index = 0);
        changeIndex();
      }
    }

    prevScrollPos = currentScrollPos;
  };

  // 윈도우가 스크롤을 할 때
  // <반복>
  // 1. 요소의 offsetTop이 viewport의 bottom에 닿으면
  // 2. 가운데로 이동시킨다
  // 3. 요소의 이동이 완료되면
  // 4. 중간에서 고정시킨다
  // 5. 다음 요소의 offsetTop이 viewport의 bottom에 닿으면
  // 6. 이전 요소의 고정을 해제한다

  window.addEventListener("scroll", moveElements);
};
// export const scrollFixElement = (getElements) => {
//   const elements = gsap.utils.toArray(getElements);
//   ScrollTrigger.defaults({
//     scrub: 10,
//     immediateRender: false,
//     invalidateOnRefresh: true,
//     toggleActions: "play none none reverse",
//   });
//   const moveFix = (element, i) => {
//     const tl = gsap.timeline();
//     ScrollTrigger.create({
//       trigger: document.body,
//       start: "top top",
//       end: "bottom bottom",
//       markers: true,
//       animation: fadeIn,
//       scrub: 1,
//       invalidateOnRefresh: true,
//       toggleActions: "play none none reverse",
//       // onEnter: () => {
//       //   console.log("   element enter start");
//       // },
//       // onLeave: () => {
//       //   console.log("   element enter end");
//       // },
//     });
//     const fadeIn = gsap.to(element, {
//       x: 0,
//       duration: 1,
//       opacity: 1,
//       stagger: 10,
//     });
//     // .to(element, {
//     //   yPercent: 0,
//     //   duration: 1,
//     //   scrollTrigger: {
//     //     trigger: element,
//     //     start: "center center",
//     //     end: "+=700",
//     //     pin: true,
//     //     pinSpacing: true,
//     //     anticipatePin: 1,
//     //     toggleClass: "active",
//     //     onEnter: () => {
//     //       console.log("   fix start");
//     //     },
//     //     onLeave: () => {
//     //       console.log("   fix end");
//     //     },
//     //   },
//     // })
//     // .to(element, {
//     //   yPercent: -50,
//     //   duration: 1,
//     //   opacity: 0,
//     //   scrollTrigger: {
//     //     trigger: element,
//     //     // start: `center 40%`,
//     //     end: "+=700",
//     //     markers: true,
//     //     onEnter: () => {
//     //       console.log("   out start");
//     //     },
//     //     onLeave: () => {
//     //       console.log("   out end");
//     //     },
//     //   },
//     // });
//     console.log("dd");
//   };
//   elements.forEach((element, i) => moveFix(element, i));
// };

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
        y: -document.body.scrollHeight * speed,
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
