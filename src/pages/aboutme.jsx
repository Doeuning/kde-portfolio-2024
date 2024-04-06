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
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
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

const BgArea = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  .bg {
    z-index: -100;
    width: 100%;
    min-height: 100%;
    background-color: #181653;
  }
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
    z-index: 100;
    width: 100%;
    height: 100%;
    background: url("/mountain2.gif") repeat-x center bottom / auto 160px,
      url("/mountain1.gif") repeat-x center bottom / auto 300px,
      url("/mountain0.gif") repeat-x center bottom / auto 400px;
  }
`;

const Sun = styled.div`
  position: absolute;
  width: 64px;
  height: 64px;
  left: 50%;
  top: 100%;
  margin: -32px 0 0 -32px;
  background: url("/sun.gif") 0 0 / 100% auto no-repeat;
  transform: scale(1.3);
`;

const ImageArea = styled.div`
  position: relative;
  flex: 0 1 100px;
  min-height: 300vh;
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
  transform: scale(1.1);
`;

function Aboutme(props) {
  useEffect(() => {
    let tl = gsap.timeline({
      duration: 1,
      scrollTrigger: {
        trigger: ".tree",
        start: `top top`,
        end: "bottom bottom",
        scrub: 1,
        // pin: true,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        toggleActions: "play none none reverse",
        onToggle: (self) => {},
      },
    });
    tl.to(".dim", {
      opacity: 0,
    })
      .to(".bg", {
        backgroundColor: "#60C5F1",
      })
      .to(".sun", {
        top: "50%",
        ease: "none",
      })
      .to(".me", {
        y: "100vh",
        ease: "none",
      });
  }, []);

  return (
    <div>
      <motion.div
        key={"ddd"}
        initial={{ opacity: 0, y: "100px" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "-100px" }}
      >
        <Wrap className="wrap">
          <BgArea>
            <div className="bg"></div>
            <div className="dim"></div>
            <div className="mountain"></div>
            <Sun className="sun"></Sun>
          </BgArea>
          <ImageArea className="tree">
            <Me className="me">
              <Image src={MyImage} fill />
            </Me>
          </ImageArea>
        </Wrap>
      </motion.div>
    </div>
  );
}

Aboutme.bgColor = "#111";

export default Aboutme;
