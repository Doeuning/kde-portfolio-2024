import Link from "next/link";
import styled, { css } from "styled-components";
import { useEffect } from "react";
import { MdLightbulbOutline } from "react-icons/md";
import {
  transitionElement,
  staggerText,
  parallaxElement,
} from "@utils/scrollEvents";
import IndexScript from "@utils/indexScript";
import smoothScroll from "@utils/smoothScroll";

const MainWrap = styled.div`
  position: relative;
`;

const Section = styled.section`
  box-sizing: border-box;
  position: relative;
  padding: 60px 0;
`;

const PageIntro = styled.section`
  ${({ theme }) => theme.MIXINS.fontRaleway};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const PageTitle = styled.h1`
  font-size: 60px;
  text-align: center;
`;

const Background = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  // position: fixed;
  // top: 0;
  // right: 0;
  // bottom: 0;
  // left: 0;
  width: 100%;
  height: 100vh;
  z-index: -999;
`;

const HelloWorld = styled.div`
  ${({ theme }) => theme.MIXINS.fontOleoScript};
  width: auto;
  font-size: 100px;
  color: lightpink;
`;

const Balloons = styled.ul`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  li {
    position: absolute;
    display: inline-block;
    border: 3px solid ${({ theme }) => theme.COLORS.gray40};
    border-radius: 10px;
    padding: 20px;
    background: white;
    font-weight: 700;
    font-size: 20px;
    color: ${({ theme }) => theme.COLORS.gray20};
    word-break: keep-all;
    &::after {
      display: block;
      content: "";
      position: absolute;
      bottom: -10px;
      left: 50%;
      z-index: -1;
      transform: translateX(-50%) rotate(45deg);
      width: 20px;
      height: 20px;
      border-radius: 0 0 5px 0;
      background: ${({ theme }) => theme.COLORS.gray40};
    }
    &:nth-child(1) {
      top: 50%;
      left: -60%;
    }
    &:nth-child(2) {
      top: 20%;
      left: -30%;
    }
    &:nth-child(3) {
      top: 5%;
      right: -30%;
    }
    &:nth-child(4) {
      top: 60%;
      right: -10%;
    }
    &:nth-child(5) {
      top: 70%;
      left: -30%;
    }
    &:nth-child(6) {
      top: 80%;
      left: 30%;
    }
    &:nth-child(7) {
      top: 45%;
      right: -40%;
    }
    &:nth-child(8) {
      top: 30%;
      right: -16%;
    }
  }
`;

const ParallaxWrap = styled.div`
  min-height: 100vh;
`;
const AboutMe = styled.div`
  @keyframes glow {
    from {
      filter: drop-shadow(0 0 5px #fff) drop-shadow(0 0 15px #fde407)
        drop-shadow(0 0 20px #e0ee39);
    }
    to {
      filter: drop-shadow(0 0 20px #fff) drop-shadow(0 0 25px #fde407)
        drop-shadow(0 0 40px #e0ee39);
    }
  }
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .bg {
    position: relative;
    font-size: 500px;
    color: white;
    animation: glow 1s ease-in-out infinite alternate;
  }
`;

function Index(props) {
  useEffect(() => {
    smoothScroll(".main-wrap");
    IndexScript();
  }, []);
  return (
    <MainWrap className="main-wrap">
      <Background>
        <HelloWorld className="stagger-text bg-text">HELLO WORLD!</HelloWorld>
      </Background>
      <PageIntro className="page-intro">
        <PageTitle>
          <div className="stagger-text">
            Frontend Developer
            <br />
            Doeun Kim
          </div>
        </PageTitle>
      </PageIntro>
      <ParallaxWrap className="section parallax-wrap">
        <AboutMe>
          <MdLightbulbOutline className="bg" />
          <Balloons className="balloons">
            <li data-speed="2">될 수 있는 것은 최대한 되게합니다.</li>
            <li data-speed="1.2">팀원들의 의견을 존중합니다.</li>
            <li data-speed="0.7">성장하는 것을 좋아합니다.</li>
            <li data-speed="0.4">사용자의 경험을 우선시합니다.</li>
            <li data-speed="1.4">완성도 있는 마무리를 지향합니다.</li>
            <li data-speed="0.1">어쩌구저쩌구</li>
            <li data-speed="0.9">어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구</li>
            <li data-speed="0.8">어쩌구저쩌구 어쩌구저쩌구</li>
          </Balloons>
        </AboutMe>
      </ParallaxWrap>
      <Section className="section">
        <Link href="/portfolio">포트폴리오 보러가기</Link>
      </Section>
      <Section className="section">
        <Link href="/portfolio">포트폴리오 보러가기</Link>
      </Section>
      <Section className="section">
        <Link href="/portfolio">포트폴리오 보러가기</Link>
      </Section>
    </MainWrap>
  );
}

Index.layout = "clean";

export default Index;
