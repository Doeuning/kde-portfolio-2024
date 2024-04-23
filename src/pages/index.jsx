import styled from "styled-components";
import { useState, useEffect, Fragment } from "react";
import { scrollFixElement, horizontalScroll } from "@utils/scrollEvents";
import Image from "next/image";
import usDetectDevice from "@src/hooks/usDetectDevice";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { AboutMeData } from "../datas";
import MyImage from "@public/aboutme/me.gif";

ScrollTrigger.defaults({
  immediateRender: false,
  invalidateOnRefresh: true,
  toggleActions: "play none none reverse",
});

const Wrap = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  box-sizing: border-box;
`;

const BgScroll = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  margin: 0 -680px;
  height: 400vh;
  /* background: linear-gradient(
    180deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(10, 10, 80, 1) 0%,
    rgba(18, 12, 86, 1) 24%,
    rgba(146, 40, 181, 1) 81%,
    rgba(255, 191, 38, 1) 100%
  ); */
  /* background: linear-gradient(
    180deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(10, 10, 80, 1) 0%,
    rgba(18, 12, 86, 1) 15%,
    rgba(146, 40, 181, 1) 36%,
    rgba(255, 191, 38, 1) 61%,
    rgba(39, 215, 247, 1) 83%,
    rgba(0, 215, 255, 1) 100%
  ); */
  background: linear-gradient(
    180deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(10, 10, 80, 1) 0%,
    rgba(18, 12, 86, 1) 15%,
    rgba(146, 40, 181, 1) 37%,
    rgba(255, 209, 0, 1) 54%,
    rgba(77, 162, 178, 1) 70%,
    rgba(0, 142, 255, 1) 100%
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
      background: url("/aboutme/mountain0.gif") repeat-x center bottom / auto
        400px;
    }
    &.second {
      background: url("/aboutme/mountain1.gif") repeat-x center bottom / auto
        300px;
    }
    &.third {
      background: url("/aboutme/mountain2.gif") repeat-x center bottom / auto
        160px;
    }
  }
`;

const Sun = styled.div`
  position: absolute;
  width: 64px;
  height: 64px;
  left: 50%;
  top: 15%;
  z-index: 200;
  margin: -32px 0 0 -32px;
  background: url("/aboutme/sun.gif") 0 0 / 100% auto no-repeat;
  transform: scale(1.3) translateY(110vh);
`;

const Star = styled.div`
  position: absolute;
  z-index: 100;
  background: #fff;
  width: 7px;
  height: 7px;
`;

const Tree = styled.div`
  position: fixed;
  top: 0;
  width: 100px;
  min-height: 100vh;
  padding: 0 50px;
  ${({ theme }) =>
    theme.MIXINS.sprite(
      "/aboutme/plant.jpg",
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

const TxtArea = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: 35%;
  z-index: 400;
  max-width: 500px;
  padding-top: 4000px;
  word-break: keep-all;
  .inner {
    position: fixed;
    top: 25%;
    width: 500px;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.3s;
  }
  &.on {
    .inner {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DataArea = styled.ul`
  position: relative;
  z-index: 5;
  li {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    &:first-child {
      position: relative;
    }
    .box {
      opacity: 0;
      ${({ theme }) => theme.MIXINS.fontDungGeunMo};
      box-sizing: border-box;
      max-width: 100%;
      width: 100%;
      min-height: 500px;
      /* border: 4px solid ${({ theme }) => theme.COLORS.gray10}; */
      border: 4px solid #fff;
      padding: 20px;
      background: #120c56;
      font-weight: 500;
      font-size: 16px;
      color: #fff;
      pre {
        white-space: pre-wrap;
      }
      &.on {
        opacity: 1;
      }
    }
  }
`;
const Buttons = styled.ul`
  position: absolute;
  left: -120px;
  li {
    width: 120px;
    &:last-child {
      .btn {
        margin-bottom: 0;
        border-bottom-width: 4px;
      }
    }
    .btn {
      display: block;
      position: relative;
      z-index: 10;
      box-sizing: border-box;
      width: 100%;
      margin-bottom: -4px;
      border: solid ${({ theme }) => theme.COLORS.gray10};
      border-width: 4px 0 4px 4px;
      padding: 10px;
      background: ${({ theme }) => theme.COLORS.gray20};
      color: ${({ theme }) => theme.COLORS.gray40};
      font-weight: 700;
      font-size: 16px;
      text-align: left;
      transform-origin: right top;
      &.on {
        z-index: 20;
        border-color: #fff;
        border-right: none;
        background: #120c56;
        color: #fff;
        transform: scale(1.15) translateX(4px);
      }
    }
  }
`;

function Aboutme(props) {
  const [stars, setStars] = useState([]);
  const [starState, setStarState] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const starNum = 50;
  const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const makeStars = () => {
    console.log(window.screen.width);
    for (let i = 0; i < starNum; i++) {
      let offsetX = getRandom(0, window.screen.width);
      let offsetY = getRandom(0, window.screen.height);
      setStars((prev) => [...prev, [offsetX, offsetY]]);
    }
    setStarState(true);
  };
  const bgAnimation = () => {
    const txt = document.querySelector(".txt");
    gsap.to(".dim", {
      opacity: 0,
      display: "none",
      duration: 1,
      scrollTrigger: {
        trigger: ".txt",
        start: "top top",
        end: "+=300",
        scrub: 1,
        pin: false,
      },
    });

    gsap.to(".sun", {
      y: "0",
      duration: 1,
      scrollTrigger: {
        trigger: ".txt",
        start: "top top",
        end: "bottom bottom",
        scrub: 5,
        pin: false,
      },
    });

    gsap.to(".mountain.second", {
      y: "-70px",
      duration: 1,
      scrollTrigger: {
        trigger: ".txt",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: false,
      },
    });
    gsap.to(".mountain.first", {
      y: "-120px",
      scrollTrigger: {
        trigger: ".txt",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: false,
      },
    });

    gsap.to(".me", {
      y: "0",
      scrollTrigger: {
        trigger: ".txt",
        start: "top top",
        end: "bottom bottom",
        scrub: 5,
        pin: false,
      },
      ease: "none",
    });
    // 어디서 나온지 모를 356이란 높이...
    console.log("bg scrollHeight", document.querySelector(".bg").clientHeight);
    console.log(
      "total height",
      document.querySelector(".bg").scrollHeight + window.innerHeight
    );
    gsap.to(".bg", {
      y: -document.querySelector(".bg").scrollHeight + window.innerHeight,
      scrollTrigger: {
        trigger: ".txt",
        start: "top top",
        end: "bottom bottom",
        scrub: 5,
        pin: false,
        onUpdate: ({ progress, direction, isActive }) => {
          console.log("update", direction, isActive, progress);
        },
        onToggle: ({ progress, direction, isActive }) => {
          console.log(direction, isActive, progress);
          if (!isActive && direction > 0) {
            txt.classList.add("on");
          } else {
            txt.classList.remove("on");
          }
        },
      },
      ease: "none",
    });
  };
  const pageOnAction = (num) => {
    setPage(num);
  };
  useEffect(() => {
    makeStars();
    bgAnimation();
    setData(AboutMeData);
    console.log("page loaded");
  }, []);

  // useEffect(() => {}, [page]);

  useEffect(() => {
    if (starState) {
      const starArr = gsap.utils.toArray(".star");
      starArr.forEach((element) => {
        gsap.to(element, {
          y: "-150vh",
          scrollTrigger: {
            trigger: ".txt",
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
            <Star className="star" style={{ top: pos[1], left: pos[0] }}></Star>
          );
        })}
      </BgArea>
      <Tree className="tree">
        <Me className="me">
          <Image src={MyImage} fill />
        </Me>
      </Tree>
      <TxtArea className="txt">
        <div className="inner">
          <Buttons>
            {data &&
              data.map((obj, i) => {
                return (
                  <li key={`data-${i}`}>
                    <button
                      type="button"
                      className={`btn${page === i ? " on" : ""}`}
                      onClick={() => {
                        pageOnAction(i);
                      }}
                    >
                      {Object.keys(obj)[0]}
                    </button>
                  </li>
                );
              })}
          </Buttons>
          <DataArea>
            {data &&
              data.map((obj, i) => {
                return (
                  <li key={`data-${i}`}>
                    <div className={`box${page === i ? " on" : ""}`}>
                      <pre>
                        <br />
                        {JSON.stringify(obj, null, 4)}
                      </pre>
                    </div>
                  </li>
                );
              })}
          </DataArea>
        </div>
      </TxtArea>
    </Wrap>
  );
}

Aboutme.bgColor = "#111";

export default Aboutme;
