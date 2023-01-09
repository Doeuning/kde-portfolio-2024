import Link from "next/link";
import styled from "styled-components";
import { MdHome } from "react-icons/md";

const Header = styled.div`
  position: sticky;
  top: 0;
  background: #000;
  color: #fff;
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  max-width: 1200px;
  margin: 0 auto;
`;

const Gnb = styled.div`
  display: flex;
  margin-left: auto;
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
        <Link href="/" scroll={false}>
          <StyledLink>
            <MdHome />
          </StyledLink>
        </Link>
        <Gnb>
          <Link href="/portfolio" scroll={false}>
            <StyledLink>Portfolio</StyledLink>
          </Link>
          <Link href="/result" scroll={false}>
            <StyledLink>결과</StyledLink>
          </Link>
        </Gnb>
      </Inner>
    </Header>
  );
}

export default HeaderWrap;
