import Link from "next/link";
import styled from "styled-components";
import { useEffect } from "react";
import {
  transitionElement,
  staggerText,
  IndexScript,
} from "@utils/scrollEvents";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

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
  .page-tit {
    font-size: 60px;
    text-align: center;
  }
`;

const Background = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -999;
`;

const HelloWorld = styled.div`
  ${({ theme }) => theme.MIXINS.fontOleoScript};
  width: auto;
  font-size: 100px;
  color: lightpink;
`;

function Index(props) {
  useEffect(() => {
    staggerText(".stagger-text", 0.05);
    transitionElement(".section");
    IndexScript();
  }, []);
  return (
    <MainWrap>
      <Background>
        <HelloWorld className="bg-text">HELLO WORLD!</HelloWorld>
      </Background>
      <PageIntro className="page-intro">
        <h1 className="page-tit">
          <div className="stagger-text">
            Frontend Developer
            <br />
            Doeun Kim
          </div>
        </h1>
      </PageIntro>
      <Section className="section">
        <p>사용자의 경험을 우선시합니다.</p>
      </Section>
      <Section className="section">
        <Link href="/portfolio">포트폴리오 보러가기</Link>
      </Section>
    </MainWrap>
  );
}

Index.layout = "clean";

export default Index;
