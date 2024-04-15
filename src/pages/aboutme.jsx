import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect, Fragment } from "react";
import { portfolioData } from "../datas";
import { motion } from "framer-motion";
import { scrollFixElement, horizontalScroll } from "@utils/scrollEvents";
import Image from "next/image";
import usDetectDevice from "@src/hooks/usDetectDevice";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import MyImage from "@public/me.gif";

const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  box-sizing: border-box;
  /* ${({ theme }) =>
    theme.MIXINS.sprite(
      "/bg-aboutme.png",
      "no-repeat",
      "center center",
      "cover"
    )}; */
  /* background: url("/plant.jpg") center center repeat-y; */
`;

const BgScroll = styled.div`
  position: relative;
  min-width: 100%;
  min-height: 100%;
  margin: 0 -680px;
  height: 400vh;
  background: linear-gradient(
    180deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(10, 10, 80, 1) 0%,
    rgba(18, 12, 86, 1) 24%,
    rgba(146, 40, 181, 1) 81%,
    rgba(255, 191, 38, 1) 100%
  );
  .test {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 50px;
    height: 60px;
    background: #fff;
  }
`;

const BgArea = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  min-height: 100%;

  .dim {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 500;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
  }
  .mountain {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 300;
    width: 100%;
    height: 100%;
    &.first {
      background: url("/mountain0.gif") repeat-x center bottom / auto 400px;
    }
    &.second {
      background: url("/mountain1.gif") repeat-x center bottom / auto 300px;
    }
    &.third {
      background: url("/mountain2.gif") repeat-x center bottom / auto 160px;
    }
  }
`;

const Sun = styled.div`
  position: absolute;
  width: 64px;
  height: 64px;
  left: 50%;
  top: 40%;
  z-index: 200;
  margin: -32px 0 0 -32px;
  background: url("/sun.gif") 0 0 / 100% auto no-repeat;
  transform: scale(1.3) translateY(50vh);
`;

const Star = styled.div`
  position: absolute;
  z-index: 100;
  background: #fff;
  width: 10px;
  height: 10px;
`;

const Tree = styled.div`
  position: fixed;
  top: 0;
  width: 100px;
  min-height: 100vh;
  padding: 0 50px;
  ${({ theme }) =>
    theme.MIXINS.sprite(
      "/plant.jpg",
      "repeat-y",
      "center center",
      "100px auto"
    )};
`;

const Me = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  width: 100px;
  height: 200px;
  transform: scale(1.1) translateY(50vh);
`;

function Aboutme(props) {
  const [stars, setStars] = useState([]);
  const [starState, setStarState] = useState(false);
  const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const makeStars = () => {
    console.log(window.screen.width);
    for (let i = 0; i < 30; i++) {
      let offsetX = getRandom(0, window.screen.width);
      let offsetY = getRandom(0, window.screen.height);
      setStars((prev) => [...prev, [offsetX, offsetY]]);
    }
    setStarState(true);
  };

  useEffect(() => {
    makeStars();

    gsap.to(".dim", {
      opacity: 0,
      display: "none",
      duration: 1,
      scrollTrigger: {
        trigger: ".bg",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: false,
        markers: true,
        invalidateOnRefresh: true,
        toggleActions: "play none none reverse",
      },
    });

    gsap.to(".sun", {
      y: "0",
      duration: 1,
      scrollTrigger: {
        trigger: ".bg",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: false,
        markers: true,
        invalidateOnRefresh: true,
        toggleActions: "play none none reverse",
      },
    });

    gsap.to(".mountain.second", {
      y: "-70px",
      duration: 1,
      scrollTrigger: {
        trigger: ".bg",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: false,
        markers: true,
        invalidateOnRefresh: true,
        toggleActions: "play none none reverse",
      },
    });
    gsap.to(".mountain.first", {
      y: "-120px",
      scrollTrigger: {
        trigger: ".bg",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: false,
        markers: true,
        invalidateOnRefresh: true,
        toggleActions: "play none none reverse",
      },
    });

    gsap.to(".me", {
      y: "0",
      scrollTrigger: {
        trigger: ".bg",
        start: "top top",
        end: "bottom bottom",
        scrub: 5,
        pin: false,
        markers: true,
        invalidateOnRefresh: true,
        toggleActions: "play none none reverse",
      },
      ease: "none",
    });
    console.log("page loaded");
  }, []);

  useEffect(() => {
    if (starState) {
      const starArr = gsap.utils.toArray(".star");
      starArr.forEach((element) => {
        gsap.to(element, {
          y: "-100vh",
          scrollTrigger: {
            trigger: ".bg",
            start: "top top",
            end: "max",
            scrub: 5,
            invalidateOnRefresh: true,
            toggleActions: "play none none reverse",
          },
        });
      });
      setStarState(false);
      console.log("star state changed");
    }
  }, [starState]);

  return (
    <div>
      <motion.div
        key={"ddd"}
        initial={{ opacity: 0, y: "100px" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "-100px" }}
      >
        <Wrap className="wrap">
          <BgScroll className="bg">
            <div className="test"></div>
          </BgScroll>
          <BgArea>
            <div className="dim"></div>
            <div className="mountain first"></div>
            <div className="mountain second"></div>
            <div className="mountain third"></div>
            <Sun className="sun"></Sun>
            {stars.map((pos) => {
              return (
                <Star
                  className="star"
                  style={{ top: pos[1], left: pos[0] }}
                ></Star>
              );
            })}
          </BgArea>
          <Tree className="tree">
            <Me className="me">
              <Image src={MyImage} fill />
            </Me>
          </Tree>
        </Wrap>
      </motion.div>
    </div>
  );
}

Aboutme.bgColor = "#111";

export default Aboutme;
