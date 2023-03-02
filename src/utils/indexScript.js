import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { staggerText, transitionElement } from "@utils/scrollEvents";

export default function IndexScript() {
  staggerText(".stagger-text", 0.05);
  transitionElement(".section");

  const bgEffect = () => {
    const moving = (element) => {
      // console.log(element.childNodes);
      element.childNodes.forEach((el) => {
        el.style.whiteSpace = "pre";
        el.style.display = "inline-block";
        el.style.verticalAlign = "middle";
      });
      const tl = gsap.timeline();
      tl.from(element.childNodes, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
      }).to(
        element.childNodes,
        {
          scrollTrigger: {
            trigger: element.parentElement,
            start: "top top",
            end: "+=800",
            pin: true,
            pinSpacing: true,
            scrub: 1,
            toggleActions: "play none none reverse",
            onToggle: () => {
              // console.log("in");
            },
          },
          duration: 2,
          opacity: 1,
          stagger: {
            from: "random",
            each: 0.2,
          },
          scale: "random(2, 5)",
          x: "random(-300, 300)",
          y: "random(-300, 300)",
        },
        ">"
      );
    };
    const elements = gsap.utils.toArray(".bg-text");
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
      moving(element);
    });
  };
  bgEffect();
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".page-intro",
        start: "top top",
        end: "+=800",
        pin: true,
        // pinReparent: true,
        pinSpacing: true,
        scrub: true,
        toggleActions: "play none none reverse",
      },
    })
    .to(".page-intro", {
      y: 0,
      opacity: 1,
    });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".parallax-wrap",
        start: "top top",
        end: "+=800",
        pin: true,
        // pinReparent: true,
        pinSpacing: true,
        scrub: true,
        toggleActions: "play none none reverse",
      },
    })
    .to(".parallax-wrap .bg", {
      y: 0,
      opacity: 1,
    });
  const moveParallax = (element, i) => {
    const speed = element.dataset.speed;
    const gap = 100;
    let moveY = element.offsetHeight * 2 * speed;
    gsap.to(element, {
      y: `-${moveY}`,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: `top bottom-=${gap}`,
        end: `bottom-=${moveY}px top+=${element.offsetHeight / 2}px`,
        scrub: 2,
        invalidateOnRefresh: true,
        toggleActions: "play none none reverse",
      },
    });
  };
  const elements = gsap.utils.toArray(".parallax-wrap .balloons li");
  elements.forEach((element, i) => moveParallax(element, i));
}
