import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";
import { portfolioData } from "../datas";
import { parallaxElement, horizontalScroll } from "@utils/scrollEvents";
import Image from "next/image";

const BgText = styled.div`
  .txt {
    ${({ theme }) => theme.MIXINS.fontRaleway};
    font-size: 150px;
    line-height: 100vh;
    white-space: nowrap;
    color: ${({ theme }) => theme.COLORS.gray50};
  }
`;
const Tags = styled.ul`
  display: flex;
  margin: -5px 0 10px -5px;
  li {
    margin: 5px 0 0 5px;
    padding: 1px 3px;
    font-weight: 700;
    color: ${({ theme }) => theme.COLORS.gray30};
  }
`;
const List = styled.ul`
  padding: 50vh 0;
  & > li {
    display: flex;
    flex-direction: column;
    align-content: center;
    position: relative;
    min-height: 50vh;
    flex: 0 0 auto;
    width: 500px;
    margin-right: auto;
    margin-left: 0;
    &:nth-child(odd) {
      margin-right: 0;
      margin-left: auto;
    }
    //&:nth-child(5n) {
    //  width: 700px;
    //  left: 60%;
    //  z-index: 10;
    //  height: 700px;
    //}
    //&:nth-child(5n + 1) {
    //  width: 600px;
    //  right: 0;
    //  height: 800px;
    //}
    //&:nth-child(5n + 2) {
    //  width: 700px;
    //  left: 100px;
    //  height: 400px;
    //}
    //&:nth-child(5n + 3) {
    //  left: 20%;
    //  width: 400px;
    //  height: 600px;
    //}
    //&:nth-child(5n + 4) {
    //  width: 500px;
    //  right: 0;
    //}
    .box {
      position: relative;
      box-sizing: border-box;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      //height: 100%;
      width: 100%;
      height: 500px;
      background: ${({ theme }) => theme.COLORS.gray70};
      color: ${({ theme }) => theme.COLORS.gray10};
      transition: all 0.6s;
      .img {
        overflow: hidden;
        position: relative;
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: right center;
          transition: all 0.6s;
        }
      }
      .tit-h2 {
        position: absolute;
        top: 20px;
        left: -20px;
        z-index: 20;
        padding: 20px;
        background: #000;
        font-weight: 700;
        font-size: 16px;
        color: #fff;
        transition: all 0.3s 0.2s;
        opacity: 0;
        transform: translateX(-50%);
      }
      .info-box {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 10;
        padding: 30px;
        //background: #fff;
        opacity: 0;
        transition: all 0.6s;
        &::before {
          display: block;
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          z-index: -1;
          width: 100%;
          height: 51%;
          background: #fff;
          transition: all 0.6s;
          transform: translateX(-100%);
        }
        &::after {
          display: block;
          content: "";
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: -1;
          width: 100%;
          height: 50%;
          background: #fff;
          transition: all 0.6s;
          transform: translateX(100%);
        }
        .img-hover {
          overflow: hidden;
          position: absolute;
          top: 50px;
          left: 100px;
          height: calc(100% - 300px);
          width: calc(100% - 100px);
          img {
            width: auto;
            height: 100%;
            transition: all 0.6s;
            transform: translateX(100%);
            object-fit: contain;
          }
        }
        .tit-area {
          display: flex;
          justify-content: space-between;
          .tit {
            font-weight: 700;
            font-size: 16px;
          }
          .role {
            margin-left: 20px;
          }
        }
        .desc {
          margin: 10px 0;
          font-size: 14px;
        }
        .info {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          font-size: 14px;
          .type {
            border-radius: 5px;
            padding: 2px 5px;
            font-weight: 700;
            color: #fff;
            &.project {
              background: ${({ theme }) => theme.COLORS.blue};
            }
            &.maintain {
              background: ${({ theme }) => theme.COLORS.green};
            }
          }
        }
        //&.disabled {
        //  width: 300px;
        //  margin: 0 auto;
        //}
      }
      &.hover {
        .img {
          img {
            transform: scale(1.2);
          }
        }
        .tit-h2 {
          opacity: 1;
          transform: translateX(0);
        }
        .info-box {
          opacity: 1;
          &::before,
          &::after {
            transform: translateX(0);
          }
          .img-hover {
            img {
              transform: translateX(0);
            }
          }
        }
      }
    }
    a.box {
      display: block;
      &.hover {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
          rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
      }
    }
  }
`;

function Item({ item }) {
  return (
    <>
      {item.bgUrl && (
        <div className="img">
          <Image src={item.bgUrl} fill />
        </div>
      )}
      <h2 className="tit-h2">{item.title}</h2>
      <div className="info-box">
        {item.imgUrl && (
          <div className="img-hover">
            <Image src={item.imgUrl} fill />
          </div>
        )}
        <div className="tit-area">
          <div className="tit">{item.title}</div>
          <div className="role">{item.role}</div>
        </div>
        <div className="desc">{item.desc}</div>
        {item.tags && (
          <Tags>
            {item.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </Tags>
        )}

        <div className="info">
          <div className="period">{item.period}</div>
          <div className={`type ${item.type}`}>
            {item.type === "project" ? "프로젝트" : "유지보수"}
          </div>
        </div>
      </div>
    </>
  );
}

function Portfolio(props) {
  useEffect(() => {
    horizontalScroll(".horizontal-txt .txt", "background");
    parallaxElement(".portfolio-list .box");
  }, []);

  return (
    <div>
      <BgText className="horizontal-txt">
        <div className="txt">
          Success doesn’t come from what you do occasionally, but what you do
          consistently.
        </div>
      </BgText>
      <List className="portfolio-list">
        {portfolioData.map((item) => {
          const random = Math.random() * 1;
          const speed = random.toFixed(1);
          const [boxOver, setBoxOver] = useState(false);
          return (
            <li key={item.id}>
              {item.url ? (
                <Link
                  href={item.url}
                  target="_blank"
                  className={`box ${boxOver && "hover"}`}
                  data-speed={speed}
                  onMouseEnter={() => {
                    setBoxOver(true);
                  }}
                  onMouseLeave={() => {
                    setTimeout(() => {
                      setBoxOver(false);
                    }, 500);
                  }}
                >
                  <Item item={item}></Item>
                </Link>
              ) : (
                <div
                  className={`box ${boxOver && "hover"}`}
                  data-speed={speed}
                  onMouseEnter={() => {
                    setBoxOver(true);
                  }}
                  onMouseLeave={() => {
                    setBoxOver(false);
                  }}
                >
                  <Item item={item}></Item>
                </div>
              )}
            </li>
          );
        })}
      </List>
    </div>
  );
}

export default Portfolio;
