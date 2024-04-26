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
  width: 58px;
  height: 58px;
  border: 4px solid ${({ theme }) => theme.COLORS.black};
  background: ${({ theme }) => theme.COLORS.main};
  color: #fff;
  transition: all 0.3s;
  &::before {
    display: block;
    content: "";
    position: absolute;
    top: 15px;
    right: 11px;
    width: 30px;
    height: 5px;
    background: ${({ theme }) => theme.COLORS.black};
    transition: all 0.3s;
    transform-origin: center center;
  }
  &::after {
    display: block;
    content: "";
    position: absolute;
    top: 30px;
    right: 11px;
    width: 30px;
    height: 5px;
    background: ${({ theme }) => theme.COLORS.black};
    transition: all 0.3s;
    transform-origin: center center;
  }
  .is-open & {
    border-color: none;
    background: #000;
    color: #fff;
    /* box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px; */
    &::before {
      margin-top: 7px;
      transform: rotate(45deg);
      background: #fff;
    }
    &::after {
      margin-top: -8px;
      transform: rotate(-45deg);
      background: #fff;
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
    color: #fff;
  }
  &:not(.is-open) {
    .gnb {
      .btn {
        transition: opacity 0.3s;
        opacity: 0 !important;
      }
    }
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
  background: rgba(0, 0, 0, 0.5);
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
    .btn {
      flex: 0 0 auto;
      display: inline-block;
      text-align: left;
      transform: translateX(0) !important;
      &.curr {
        color: ${({ theme }) => theme.COLORS.main};
        transform: translateX(20px) !important;
        &::before {
          display: block;
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          width: 16px;
          height: 16px;
          background: url("/ico-16-curr.gif") center center no-repeat;
          transform: translateY(-50%);
        }
      }
    }
  }
`;

const StyledLink = styled.span`
  display: inline-block;
  position: relative;
  margin: 0 auto;
  padding: 20px;
  ${({ theme }) => theme.MIXINS.fontDungGeunMo};
  font-weight: 700;
  font-size: 30px;
`;

function HeaderWrap() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(null);
  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };
  const handleGnb = () => {
    if (menu) {
      if (open) {
        gsap.to(".gnb", {
          y: 0,
          ease: "Expo.easeOut",
          onStart: () => {
            staggerElement(".gnb .inner", 0.2);
          },
        });
      } else {
        gsap.to(".gnb", {
          y: "-100%",
          ease: "Expo.easeOut",
        });
      }
    }
  };
  const router = useRouter();
  const goToPage = (url) => {
    router.push({
      pathname: `/${url}`,
      state: { prevPage: router.path }, // 이전 페이지의 정보를 state에 저장
    });
  };

  useEffect(() => {
    setMenu(gnbMenu);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [router]);

  useEffect(() => {
    handleGnb();
  }, [open]);

  return (
    menu && (
      <Header className={`header${open ? " is-open" : ""}`}>
        <Inner>
          <Button type="button" onClick={handleClick}></Button>
          <Gnb className="gnb">
            <div className="inner">
              {menu.map((item) => {
                return (
                  <button
                    key={item.url}
                    className={`btn${router.route === item.url ? " curr" : ""}`}
                    type="button"
                    onMouseEnter={(e) => {
                      e.target.parentElement.classList.add("curr");
                    }}
                    onMouseLeave={(e) => {
                      if (router.route !== item.url) {
                        e.target.parentElement.classList.remove("curr");
                      }
                    }}
                    onClick={() => {
                      goToPage(item.url);
                    }}
                  >
                    <StyledLink>{item.title}</StyledLink>
                  </button>
                );
              })}
            </div>
          </Gnb>
        </Inner>
      </Header>
    )
  );
}

export default HeaderWrap;
