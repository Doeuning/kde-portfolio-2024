import Link from "next/link";
import styled, { css } from "styled-components";

const Inner = styled.div`
  display: flex;
  background: ${(p) => p.theme.coral};
`;

function Header(props) {
  return (
    <header style={{ css }}>
      <Inner>
        <Link href="/">메인</Link>
        <Link href="/sub">서브</Link>
      </Inner>
    </header>
  );
}

export default Header;
