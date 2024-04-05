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
  bottom: 0;
  width: 100%;
  height: 100%;
  background: url("/mountain2.gif") repeat-x center bottom / auto 160px,
    url("/mountain1.gif") repeat-x center bottom / auto 300px,
    url("/mountain0.gif") repeat-x center bottom / auto 400px;
`;

const Sun = styled.div`
  position: absolute;
  width: 64px;
  height: 64px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: url("/sun.gif") 0 0 / 100% auto no-repeat;
  transform: scale(1.3);
`;

const ImageArea = styled.div`
  position: relative;
  flex: 0 1 100px;
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
    let tl = gsap.timeline();
    tl.to(".sun", {
      y: `-=10`,
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".wrap",
        start: `top top`,
        end: "+=1000",
        scrub: 1,
        invalidateOnRefresh: true,
        toggleActions: "play none none reverse",
        onToggle: (self) => {},
      },
    });
    tl.fromTo(
      ".bg",
      {
        backgroundColor: "#181653",
      },
      {
        backgroundColor: "#60C5F1",
      }
    );
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
          <BgArea className="bg">
            <Sun className="sun"></Sun>
          </BgArea>
          <ImageArea>
            <Me>
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
