import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import Header from "@layouts/Header";
import Container from "@layouts/Container";

const Layout = styled.div`
  overflow: hidden;
  position: relative;
  min-height: 100vh;
  background: black;
`;

export default function Index({ children, bgColor }) {
  const router = useRouter();
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [router]);
  return (
    <Layout>
      <Header />
      <Container bgColor={bgColor}>{children}</Container>
    </Layout>
  );
}
