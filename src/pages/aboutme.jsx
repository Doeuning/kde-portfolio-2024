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
  top: 40%;
  z-index: 200;
  margin: -32px 0 0 -32px;
  background: url("/aboutme/sun.gif") 0 0 / 100% auto no-repeat;
  transform: scale(1.3) translateY(50vh);
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

const TxtArea = styled.ul`
  position: relative;
  margin-left: 35%;
  z-index: 400;
  max-width: 500px;
  padding-top: 100vh;
  word-break: keep-all;

  li {
    display: flex;
    flex-direction: column;
    align-content: center;
    position: relative;
    flex: 0 0 auto;
    max-width: 600px;
    width: 100%;
    min-height: 200vh;
    .box {
      opacity: 0;
      /* min-height: 400px; */
      border: 4px solid #fff;
      padding: 20px;
      background: #000;
      font-weight: 500;
      font-size: 16px;
      color: #fff;
    }
    &.mo {
      width: 100%;
      .box {
        .info-inner {
          padding: 30px;
        }
      }
    }
  }
`;

function Aboutme(props) {
  const [stars, setStars] = useState([]);
  const [starState, setStarState] = useState(false);
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

  useEffect(() => {
    makeStars();

    const boxes = gsap.utils.toArray(".txt .box");
    boxes.forEach((element) => {
      gsap.to(element, {
        duration: 1,
        scrollTrigger: {
          trigger: element,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          start: "center center",
          end: "+=600",
          scrub: 5,
        },
      });

      const tl = gsap.timeline({});
      tl.fromTo(
        element,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            anticipatePin: 1,
            start: "top 60%",
            end: "+=300",
            scrub: 1,
          },
        }
      );
      tl.to(element, {
        opacity: 0,
        scale: 0.8,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          anticipatePin: 1,
          start: "top 40%",
          end: "+=300",
          scrub: 1,
        },
      });
    });
    gsap.to(".dim", {
      opacity: 0,
      display: "none",
      duration: 1,
      scrollTrigger: {
        trigger: ".txt",
        start: "top top",
        end: "bottom bottom",
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
        scrub: 1,
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

    gsap.to(".bg", {
      y: -document.querySelector(".bg").scrollHeight + window.innerHeight,
      scrollTrigger: {
        trigger: ".txt",
        start: "top top",
        end: "bottom bottom",
        scrub: 5,
        pin: false,
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
          <TxtArea className="txt">
            <li>
              <div className="box">
                <pre>
                  // 경력.js
                  <br />
                  <br />
                  {`{
  "경력": "5년 3개월"
}`}
                </pre>
              </div>
            </li>
            <li>
              <div className="box">
                <pre>
                  // 기술.js
                  <br />
                  <br />
                  {`{
  "HTML": "상",
  "CSS": "상",
  "JS": "중",
  "Vue": "하",
  "React": "하",
  "git": "중",
  "svn": "중"
}`}
                </pre>
              </div>
            </li>
            <li>
              <div className="box">
                <pre>
                  // 자격증.js
                  <br />
                  <br />
                  {`{
  "자격증": "정보처리기사"
}`}
                </pre>
              </div>
            </li>
            <li>
              <div className="box">
                <pre>
                  // 강점.js
                  <br />
                  <br />
                  {`{
  "강점": [
      "일정준수",
      "고객 및 타 파트와 원활한 커뮤니케이션",
      "끈기"
    ]
}`}
                </pre>
              </div>
            </li>
            <li>
              <div className="box">
                <pre>
                  // 특이사항.js
                  <br />
                  <br />
                  {`{
  "특이사항": [
      "시각장애 경증",
      "각막혼탁으로 흰 종이에 검은 글씨 및 
      밝은 화면을 보는 데 어려움이 있음"      
    ],
  "선호 작업": "다크 모드"
}`}
                </pre>
              </div>
            </li>
            <li>
              <div className="box">
                <pre>
                  // 취미.js
                  <br />
                  <br />
                  {`{
  "취미": [
      "프리다이빙", "보드게임", "요리", "바둑(입문)", 
      "그림", "여행", "수공예", "테스트만들기", "성대모사"
    ]
}`}
                </pre>
              </div>
            </li>
            <li>
              <div className="box">
                <pre>
                  // 기타.js
                  <br />
                  <br />
                  {`{
  "좋아하는 것": [
      "자연", "물", "동물", "푸른 하늘", "우주", "귀여운 것", "웃긴 것"
    ],
  "싫어하는 것": [
      "거짓말", "가식", "억지 귀여움", "안 웃긴 것"
    ]
}`}
                </pre>
              </div>
            </li>
          </TxtArea>
        </Wrap>
      </motion.div>
    </div>
  );
}

Aboutme.bgColor = "#111";

export default Aboutme;
