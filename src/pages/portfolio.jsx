import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";
import { portfolioData } from "../datas";
import { motion } from "framer-motion";
import { parallaxElement, horizontalScroll } from "@utils/scrollEvents";
import Image from "next/image";

const TypeBtn = styled.button`
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-730px);
  z-index: 10000000;
  width: 130px;
  padding: 10px 20px;
  background: #000;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  transition: all 0.3s;
  ${({ theme }) => theme.MIXINS.boxShadow};
  &:hover {
    background: ${({ theme }) => theme.COLORS.gray20};
  }
`;
const BgText = styled.div`
  .txt {
    ${({ theme }) => theme.MIXINS.fontRaleway};
    font-size: 150px;
    line-height: 100vh;
    white-space: nowrap;
    color: ${({ theme }) => theme.COLORS.gray60};
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

const Table = styled.table`
  padding: 150px 0;
  tr {
    position: relative;
  }
  th {
    border-top: 1px solid ${({ theme }) => theme.COLORS.gray10};
    padding: 20px 10px;
    font-weight: 700;
    font-size: 14px;
    background: ${({ theme }) => theme.COLORS.gray70};
  }
  td {
    position: static;
    border-top: 1px solid ${({ theme }) => theme.COLORS.gray50};
    padding: 20px 10px;
    font-size: 14px;
    background: rgba(255, 255, 255, 0.5);
    text-align: center;
    a {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transition: all 0.3s;
      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }
    }
    &.desc {
      text-align: left;
    }
    .thumb {
      ${({ theme }) => theme.MIXINS.boxShadow};
      position: absolute;
      width: 300px;
      height: 200px;
      z-index: 100;
      font-size: 0;
    }
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
        .info-inner {
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
      overflow: hidden;
      position: relative;
      box-sizing: border-box;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      width: 100%;
      height: 600px;
      border-radius: 30px;
      background: ${({ theme }) => theme.COLORS.gray50};
      color: ${({ theme }) => theme.COLORS.gray10};
      transition: all 0.6s;
      .dummyBg {
        display: block;
        height: 100%;
        ${({ theme }) => theme.MIXINS.fontRaleway};
        font-size: 600px;
        line-height: 100%;
        text-align: center;
        color: ${({ theme }) => theme.COLORS.gray60};
      }
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
        left: 0;
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
        inset: 0;
        z-index: 10;
        background: #fff;
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
          opacity: 0;
          z-index: -1;
          width: 100%;
          height: 100%;
          background: ${({ theme }) => theme.COLORS.gray50};
          transition: all 0.6s;
          transform: scale(1.5);
        }
        .info-inner {
          padding: 50px;
          background: ${({ theme }) => theme.COLORS.gray10};
          color: #fff;
        }
        .img-hover {
          overflow: hidden;
          position: absolute;
          top: 30%;
          left: 50%;
          height: calc(100% - 500px);
          width: calc(100% - 100px);
          transform: translate(-50%, -50%) scale(1.5);
          transition: all 0.6s;
          img {
            width: auto;
            max-height: 100%;
            height: auto;
            object-fit: contain;
          }
        }
        .tit-area {
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
          &::before {
            opacity: 1;
            transform: scale(1);
          }
          .img-hover {
            transform: translate(-50%, -50%) scale(1);
          }
        }
      }
    }
  }
`;

function Item({ item, speed }) {
  const [boxOver, setBoxOver] = useState(false);
  console.log("spped", speed);
  return (
    <div
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
      {item.bgUrl ? (
        <div className="img">
          <Image src={item.bgUrl} fill alt={item.title} />
        </div>
      ) : (
        <div className="dummyBg">?</div>
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
            />
          </div>
        )}
        <div className="info-inner">
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
      </div>
    </div>
  );
}

function Portfolio(props) {
  const [data, setData] = useState(null);
  const [viewListType, setViewListType] = useState(true);
  const [speedArr, setSpeedArr] = useState([]);
  const changeType = () => {
    setViewListType((prevState) => !prevState);
    window.scrollTo(0, 0);
  };
  const viewAction = () => {
    for (let i = 0; i < portfolioData.length; i++) {
      const random = Math.random() * 1;
      const speed = random.toFixed(1);
      setSpeedArr((arr) => [...arr, speed]);
    }
    horizontalScroll(".horizontal-txt .txt", "background");
    parallaxElement(".portfolio-list .box");
  };
  useEffect(() => {
    console.log("setdata");
    setData(portfolioData);
  }, []);
  useEffect(() => {
    console.log("viewaction");
    viewAction();
  }, [data]);

  return (
    data && (
      <div>
        <TypeBtn className={viewListType && "on"} onClick={changeType}>
          {viewListType ? "목록으로 보기" : "이미지로 보기"}
        </TypeBtn>
        <motion.div
          key={viewListType}
          initial={{ opacity: 0, y: "100px" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100px" }}
        >
          {viewListType ? (
            <div>
              <BgText className="horizontal-txt">
                <div className="txt">
                  Success doesn’t come from what you do occasionally, but what
                  you do consistently.
                </div>
              </BgText>
              <List className="portfolio-list">
                {data.map((item, i) => {
                  console.log("speedArr", speedArr[i]);
                  return (
                    <li key={item.id} className={item.isMobile ? "mobile" : ""}>
                      {item.url ? (
                        <Link href={item.url} target="_blank">
                          <Item item={item} speed={speedArr[i]}></Item>
                        </Link>
                      ) : (
                        <div>
                          <Item item={item} speed={speedArr[i]}></Item>
                        </div>
                      )}
                    </li>
                  );
                })}
              </List>
            </div>
          ) : (
            <Table>
              <colgroup>
                <col style={{ width: "12%" }} />
                <col style={{ width: "8%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "8%" }} />
                <col style={{ width: "auto" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "0" }} />
              </colgroup>
              <thead>
                <tr>
                  <th>투입 기간</th>
                  <th>타입</th>
                  <th>프로젝트명</th>
                  <th>역할</th>
                  <th>설명</th>
                  <th>사용 기술</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, i) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.period}</td>
                      <td>
                        {item.type === "project" ? "프로젝트" : "유지보수"}
                      </td>
                      <td>{item.title}</td>
                      <td>{item.role}</td>
                      <td className="desc">{item.desc}</td>
                      <td>
                        {item.tags.map((el, i) => {
                          if (i >= item.tags.length - 1) {
                            return el;
                          } else {
                            return el + ", ";
                          }
                        })}
                      </td>
                      {item.url ? (
                        <td>
                          <Link href={item.url} target="_blank"></Link>
                        </td>
                      ) : (
                        <td></td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </motion.div>
      </div>
    )
  );
}

Portfolio.bgColor = "#495057";

export default Portfolio;
