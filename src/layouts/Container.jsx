import styled from "styled-components";

const Wrap = styled.div`
  box-sizing: border-box;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: ${(p) => p.theme.gray80};
`;

function Container({ children }) {
  return <Wrap>{children}</Wrap>;
}


export default Container;
