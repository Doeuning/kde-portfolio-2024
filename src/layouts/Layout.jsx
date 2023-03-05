import styled from "styled-components";
import Header from "@layouts/Header";
import Container from "@layouts/Container";
import { motion } from "framer-motion";

const Layout = styled.div`
  overflow: hidden;
  position: relative;
  min-height: 100vh;
`;

export default function Index({ children, bgColor }) {
  return (
    <Layout>
      <Header />
      <motion.div layoutid="main">
        <Container bgColor={bgColor}>{children}</Container>
      </motion.div>
    </Layout>
  );
}
