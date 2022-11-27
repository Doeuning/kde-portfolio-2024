import styled from "styled-components";

const Wrap = styled.div`
  color: red;
`;

function Container({ children }) {
  return <Wrap>{children}</Wrap>;
}

export default Container;
