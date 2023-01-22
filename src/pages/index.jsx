import Link from "next/link";
import styled from "styled-components";
import { useEffect } from "react";
import {
  transitionElement,
  horizontalScroll,
  parallaxElement,
  staggerElement,
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
  will-change: transform, opacity;
  background: ${({ bgColor }) => {
    return bgColor || "lightgray";
  }};
  &.first {
    left: 60%;
    z-index: 10;
    width: 200px;
    height: 200px;
  }
  &.second {
    position: relative;
    left: 20%;
    width: 1000px;
    height: 1000px;
  }
  &.third {
    left: 100px;
    width: 500px;
    height: 200px;
  }
  &.fourth {
    position: relative;
    left: 0;
    width: 300px;
    height: 600px;
  }
`;

const StaggerText = styled.div`
  font-size: 50px;
  span {
    display: inline-block;
  }
`;

function Index(props) {
  useEffect(() => {
    horizontalScroll(".horizontal-scroll-bg", "background");
    parallaxElement(".parallax-wrap div");
    staggerElement(".stagger-wrap span");
    horizontalScroll(".horizontal-scroll");
    transitionElement(".section");
  }, []);
  return (
    <MainWrap>
      <Section className="section">
        <h1>Doeun Kim</h1>
      </Section>
      <Section className="section">sdfsdf</Section>
      <Section className="section">sdfsdf</Section>
      <Section className="section">
        <StaggerText className="stagger-wrap">
          <span>감</span>
          <span>자</span>
          <span>튀</span>
          <span>김</span>
        </StaggerText>
      </Section>
      <Section className="section">sdfsdf</Section>
      <Section className="section">sdfsdf</Section>
      <ParallaxWrap className="parallax-wrap">
        <ParallaxBox
          bgColor="lightcoral"
          className="first"
          data-speed="1"
        ></ParallaxBox>
        <ParallaxBox
          bgColor="lightpink"
          className="second"
          data-speed="0.65"
        ></ParallaxBox>
        <ParallaxBox
          bgColor="green"
          className="third"
          data-speed="0.2"
        ></ParallaxBox>
        <ParallaxBox
          bgColor="cornflowerblue"
          className="fourth"
          data-speed="0.4"
        ></ParallaxBox>
      </ParallaxWrap>
      <Section className="section">
        <ScrollTExt className="horizontal-scroll-bg">
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
