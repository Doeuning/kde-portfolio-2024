import Link from "next/link";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { gsap } from "gsap/dist/gsap";
import { staggerElement } from "@utils/scrollEvents";
import { gnbMenu } from "../datas";

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
    box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
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
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 900;
  background: #000;
  transform: translate3d(0, -100%, 0);
  .inner {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-end;
    box-sizing: border-box;
    max-width: 1200px;
    padding: 0 20px;
    height: 100%;
    margin: 0 auto;
    a {
      flex: 0 0 auto;
      display: inline-block;
    }
  }
`;

const StyledLink = styled.span`
  display: inline-block;
  position: relative;
  margin: 0 auto;
  padding: 20px;
  ${({ theme }) => theme.MIXINS.fontRaleway};
  font-weight: 700;
  font-size: 30px;
`;

function HeaderWrap() {
  const [open, setOpen] = useState(false);
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });
  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };
  const router = useRouter();
  const handleMove = (e) => {
    const diffX = e.clientX - mousePos.x;
    const diffY = e.clientY - mousePos.y;
    const target = e.target;

    target.style.transform = `translate(${e.clientX}px, ${e.clientY}px, 0)`;
    if (mousePos.x !== 0 && mousePos.y !== 0) {
      gsap.to(e.currentTarget, {
        x: diffX * 10,
        y: diffY * 5,
        duration: 2,
        scale: 2,
        ease: "Expo.easeOut",
      });
    }
    setMousePos({ x: e.clientX, y: e.clientY });
  };
  const handleLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 2,
      scale: 1,
      ease: "Expo.easeOut",
    });
  };
  useEffect(() => {
    if (open) {
      gsap.to(".gnb", {
        y: 0,
        ease: "Expo.easeOut",
        onStart: () => {
          staggerElement(".gnb .inner");
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
          <div className="inner">
            {gnbMenu.map((item) => {
              return (
                <Link
                  href={item.url}
                  onMouseMove={handleMove}
                  onMouseLeave={handleLeave}
                  key={item.url}
                >
                  <StyledLink>{item.title}</StyledLink>
                </Link>
              );
            })}
          </div>
        </Gnb>
      </Inner>
    </Header>
  );
}

export default HeaderWrap;
