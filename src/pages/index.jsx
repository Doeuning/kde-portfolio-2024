import Link from "next/link";
import styled from "styled-components";
import { useEffect } from "react";
import {
  transitionElement,
  horizontalScroll,
  parallaxElement,
} from "@utils/scrollEvents";

const MainWrap = styled.div`
  position: relative;
`;

const Section = styled.section`
  box-sizing: border-box;
  border: 5px solid bisque;
  position: relative;
  padding: 60px 0;
`;

const ScrollTExt = styled.div`
  @import fontRaleway();
  font-size: 80px;
  white-space: nowrap;
  background: lightpink;
`;

const ParallaxWrap = styled.section`
  position: relative;
  box-sizing: border-box;
  border: 5px solid cornflowerblue;
`;

const ParallaxBox = styled.div`
  position: relative;
  background: ${({ bgColor }) => {
    return bgColor || "lightgray";
  }};
  &.first {
    top: 0;
    left: 100px;
    width: 200px;
    height: 200px;
  }
  &.second {
    top: 200px;
    left: 90%;
    width: 200px;
    height: 500px;
  }
  &.third {
    position: relative;
    left: 30%;
    width: 500px;
    height: 500px;
  }
  &.fourth {
    position: relative;
    left: 0;
    width: 300px;
    height: 600px;
  }
`;

function Index(props) {
  useEffect(() => {
    horizontalScroll(".horizontal-scroll");
    transitionElement(".section");
    parallaxElement(".parallax-wrap div");
  }, []);
  return (
    <MainWrap>
      <Section className="section">
        <h1>Doeun Kim</h1>
      </Section>
      <Section className="section">sdfsdf</Section>
      <Section className="section">sdfsdf</Section>
      <Section className="section">sdfsdf</Section>
      <Section className="section">sdfsdf</Section>
      <ParallaxWrap className="section parallax-wrap">
        <ParallaxBox
          bgColor="lightcoral"
          className="first"
          data-depth="1"
        ></ParallaxBox>
        <ParallaxBox
          bgColor="lightpink"
          className="second"
          data-depth="0.65"
        ></ParallaxBox>
        <ParallaxBox
          bgColor="lightyellow"
          className="third"
          data-depth="0.2"
        ></ParallaxBox>
        <ParallaxBox
          bgColor="beige"
          className="fourth"
          data-depth="0.4"
        ></ParallaxBox>
      </ParallaxWrap>
      <Section className="section">
        <ScrollTExt className="horizontal-scroll">
          I'm Going to take you out if you do that again. I'm Going to take you
          out if you do that again.
        </ScrollTExt>
      </Section>
      <Section className="section">sdfsdf</Section>
      <Section className="section">sdfsdf</Section>
      <Section className="section">sdfsdf</Section>
      <Section className="section">sdfsdf</Section>
      <Section className="section">sdfsdf</Section>
      <Section className="section">
        <ScrollTExt className="horizontal-scroll">
          I'm Going to take you out if you do that again. I'm Going to take you
          out if you do that again.
        </ScrollTExt>
      </Section>
      <Section className="section">sdfsdf</Section>
      <Section className="section">sdfsdf</Section>
      <Section className="section">
        <Link href="/portfolio">포트폴리오</Link>
      </Section>
    </MainWrap>
  );
}

Index.layout = "clean";

export default Index;
