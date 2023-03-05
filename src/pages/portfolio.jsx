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
    color: ${({ theme }) => theme.COLORS.black};
    text-transform: uppercase;
  }
`;
const Tags = styled.ul`
  display: flex;
  margin: -10px 0 10px -10px;
  li {
    margin: 10px 0 0 10px;
    //padding: 1px 3px;
    font-weight: 100;
    font-size: 20px;
    color: ${({ theme }) => theme.COLORS.main};
  }
`;
const List = styled.ul`
  padding: 50vh 0;
  & > li {
    display: flex;
    flex-direction: column;
    align-content: center;
    position: relative;
    min-height: 100vh;
    flex: 0 0 auto;
    width: 700px;
    margin-right: auto;
    margin-left: 0;
    &.mobile {
      width: 400px;
      .box {
        .info-box {
          padding: 30px;
        }
      }
    }
    &:nth-child(odd) {
      margin-right: 0;
      margin-left: auto;
    }
    .box {
      display: block;
      position: relative;
      box-sizing: border-box;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      width: 100%;
      height: 600px;
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
          object-position: left top;
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
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 10;
        padding: 50px;
        //background: #fff;
        opacity: 0;
        transition: all 0.6s;
        font-size: 20px;
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
          top: 100px;
          left: 100px;
          height: calc(100% - 500px);
          width: calc(100% - 100px);
          img {
            width: auto;
            max-height: 100%;
            height: auto;
            transition: all 0.6s;
            transform: translateX(100%);
            object-fit: contain;
          }
        }
        .tit-area {
          //display: flex;
          //justify-content: space-between;
          .tit {
            //font-weight: 700;
            //font-size: 16px;
          }
          .role {
            margin-top: 20px;
          }
        }
        .desc {
          margin: 10px 0;
          //font-size: 14px;
        }
        .info {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          //font-size: 14px;
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
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
          rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
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
  }
`;

function Item({ item }) {
  return (
    <>
      {item.bgUrl && (
        <div className="img">
          <Image src={item.bgUrl} fill alt={item.title} loading="lazy" />
        </div>
      )}
      <h2 className="tit-h2">{item.title}</h2>
      <div className="info-box">
        {item.imgUrl && (
          <div className="img-hover">
            <Image
              src={item.imgUrl}
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              alt={item.title}
              loading="lazy"
            />
          </div>
        )}
        <div className="tit-area">
          <div className="tit">{item.desc}</div>
          <div className="role">역할 : {item.role}</div>
        </div>
        {/*<div className="desc">{item.desc}</div>*/}
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
  let speedArr = [];
  useEffect(() => {
    for (let i = 0; i < portfolioData.length; i++) {
      const random = Math.random() * 1;
      const speed = random.toFixed(1);
      speedArr.push(speed);
    }
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
        {portfolioData.map((item, i) => {
          const [boxOver, setBoxOver] = useState(false);
          return (
            <li key={item.id} className={item.isMobile ? "mobile" : ""}>
              {item.url ? (
                <Link
                  href={item.url}
                  target="_blank"
                  className={`box${boxOver === true ? " hover" : ""}`}
                  data-speed={speedArr[i]}
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
                  data-speed={speedArr[i]}
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

Portfolio.bgColor = "#ededed";

export default Portfolio;
