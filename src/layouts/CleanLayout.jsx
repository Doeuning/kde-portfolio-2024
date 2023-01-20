import styled from "styled-components";
import Container from "@layouts/Container";

const CleanLayout = styled.div`
  overflow: hidden;
  position: relative;
  min-height: 100vh;
`;

export default function Index({ children }) {
  return (
    <CleanLayout>
      <Container>{children}</Container>
    </CleanLayout>
  );
}
