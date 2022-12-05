import Link from "next/link";
import styled from "styled-components";

const Header = styled.div`
  position: sticky;
  top: 0;
  background: #000;
  color: #fff;
`;

const Inner = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledLink = styled.span`
  display: block;
  padding: 20px;
  font-size: 20px;
`;

function HeaderWrap(props) {
  return (
    <Header>
      <Inner>
        <Link href="/">
          <StyledLink>홈</StyledLink>
        </Link>
        <Link href="/sub">
          <StyledLink>서브1</StyledLink>
        </Link>
      </Inner>
    </Header>
  );
}

export default HeaderWrap;
