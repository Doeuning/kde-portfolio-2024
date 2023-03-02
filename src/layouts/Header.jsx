import Link from "next/link";
import styled from "styled-components";
import { MdHome } from "react-icons/md";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { gsap } from "gsap/dist/gsap";
import { staggerElement } from "@utils/scrollEvents";

const Button = styled.button`
  display: block;
  position: relative;
  z-index: 1100;
  width: 50px;
  height: 50px;
  background: #000;
  color: #fff;
  transition: all 0.3s;
  &::before {
    display: block;
    content: "";
    position: absolute;
    top: 15px;
    right: 10px;
    width: 30px;
    height: 5px;
    background: #fff;
    transition: all 0.3s;
    transform-origin: center center;
  }
  &::after {
    display: block;
    content: "";
    position: absolute;
    top: 30px;
    right: 10px;
    width: 30px;
    height: 5px;
    background: #fff;
    transition: all 0.3s;
    transform-origin: center center;
  }
  .is-open & {
    background: #fff;
    color: #000;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    &::before {
      margin-top: 5px;
      transform: rotate(45deg);
      background: #000;
    }
    &::after {
      margin-top: -10px;
      transform: rotate(-45deg);
      background: #000;
    }
  }
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  &.is-open {
    background: black;
    color: #fff;
  }
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  box-sizing: border-box;
  max-width: 1200px;
  margin: 0 auto;
`;

const Gnb = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 900;
  background: #000;
  transform: translate3d(0, -100%, 0);
`;

const StyledLink = styled.span`
  display: block;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-size: 30px;
`;

function HeaderWrap(props) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };
  const router = useRouter();
  useEffect(() => {
    if (open) {
      gsap.to(".gnb", {
        y: 0,
        ease: "Expo.easeOut",
        onStart: () => {
          staggerElement(".gnb");
        },
      });
    } else {
      gsap.to(".gnb", {
        y: "-100%",
        ease: "Expo.easeOut",
      });
    }
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [router]);

  return (
    <Header className={`header ${open && "is-open"}`}>
      <Inner>
        <Button type="button" onClick={handleClick}></Button>
        <Gnb className="gnb">
          <Link href="/aboutme">
            <StyledLink>About me</StyledLink>
          </Link>
          <Link href="/portfolio">
            <StyledLink>Portfolio</StyledLink>
          </Link>
          <Link href="/skills">
            <StyledLink>Skills</StyledLink>
          </Link>
          <Link href="/contact">
            <StyledLink>Contact</StyledLink>
          </Link>
          <Link href="/demo">
            <StyledLink>Scroll Event Demo</StyledLink>
          </Link>
        </Gnb>
      </Inner>
    </Header>
  );
}

export default HeaderWrap;
