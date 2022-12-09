import styled from "styled-components";
import Header from "@layouts/Header";
import Container from "@layouts/Container";

const Layout = styled.div`
  overflow-x: hidden;
  position: relative;
  min-height: 100vh;
`;

export default function Index({ children }) {
  return (
    <Layout>
      <Header />
      <Container>{children}</Container>
    </Layout>
  );
}
