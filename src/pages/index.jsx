import Link from "next/link";
import styled from "styled-components";
import { useEffect } from "react";
import { transitionElement, horizontalScroll } from "@utils/scrollEvents";

const MainWrap = styled.div`
  position: relative;
`;

const Section = styled.section`
  position: relative;
  padding: 60px 0;
`;

const ScrollTExt = styled.div`
  @import fontRaleway();
  font-size: 80px;
  white-space: nowrap;
`;

function Index(props) {
  useEffect(() => {
    transitionElement(".section");
    horizontalScroll(".horizontal-scroll");
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
      <ScrollTExt className="horizontal-scroll">
        I'm Going to take you out if you do that again. I'm Going to take you
        out if you do that again.
      </ScrollTExt>
      <Section className="section">sdfsdf</Section>
      <Section className="section">sdfsdf</Section>
      <Section className="section">sdfsdf</Section>
      <Section className="section">sdfsdf</Section>
      <Section className="section">sdfsdf</Section>
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
