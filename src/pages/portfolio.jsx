import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect, Fragment } from "react";
import { portfolioData } from "../datas";
import { scrollFixElement, horizontalScroll } from "@utils/scrollEvents";
import Image from "next/image";
import usDetectDevice from "@src/hooks/usDetectDevice";

const TypeBtn = styled.button`
  position: fixed;
  bottom: 100px;
  left: 0;
  z-index: 100;
  width: 150px;
  border: 4px solid #fff;
  padding: 20px;
  background: ${({ theme }) => theme.COLORS.gray10};
  font-weight: 700;
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.white};
  transition: all 0.3s;
  box-shadow: ${({ theme }) => theme.MIXINS.boxShadow};
  ${({ theme }) => theme.MIXINS.fontDungGeunMo};
  &:hover {
    background: ${({ theme }) => theme.COLORS.gray50};
    color: ${({ theme }) => theme.COLORS.black};
  }
`;
const BgText = styled.div`
  .txt {
    ${({ theme }) => theme.MIXINS.fontDungGeunMo};

    opacity: 0.5;
    font-size: 150px;
    line-height: 100vh;
    white-space: nowrap;
    color: ${({ theme }) => theme.COLORS.gray60};
    text-transform: uppercase;
  }
`;
const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0 0 -10px;
  li {
    margin: 10px 0 0 10px;
    padding: 5px 10px;
    background: ${({ theme }) => theme.COLORS.black};
    font-weight: 500;
    font-size: 20px;
    color: ${({ theme }) => theme.COLORS.white};
  }
`;

const Table = styled.table`
  padding: 150px 0;
  tr {
    position: relative;
    &:last-child {
      td {
        border-bottom: 1px solid ${({ theme }) => theme.COLORS.gray30};
      }
    }
  }
  th {
    border-top: 1px solid ${({ theme }) => theme.COLORS.gray50};
    padding: 20px 10px;
    font-weight: 700;
    font-size: 14px;
    background: ${({ theme }) => theme.COLORS.gray10};
    color: ${({ theme }) => theme.COLORS.white};
  }
  td {
    position: static;
    border-top: 1px solid ${({ theme }) => theme.COLORS.gray30};
    padding: 20px 10px;
    font-size: 14px;
    text-align: center;
    color: ${({ theme }) => theme.COLORS.white};
    a {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transition: all 0.3s;
      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
    &.desc {
      text-align: left;
    }
    .thumb {
      box-shadow: ${({ theme }) => theme.MIXINS.boxShadow};
      position: absolute;
      width: 300px;
      height: 200px;
      z-index: 100;
      font-size: 0;
    }
    .detail {
      margin-top: 10px;
    }
  }
`;
const List = styled.ul`
  position: relative;
  width: 100%;
  padding: 50vh 0;
  & > li {
    display: flex;
    flex-direction: column;
    align-content: center;
    position: relative;
    min-height: 100vh;
    flex: 0 0 auto;
    max-width: 600px;
    width: 100%;
    margin-top: 100vh;
    margin-right: auto;
    margin-left: 0;
    &.mo {
      width: 100%;
      .box {
        .info-inner {
          padding: 30px;
        }
      }
    }
    &:first-child {
      margin-top: 0;
    }
    &:nth-child(odd) {
      margin-right: 0;
      margin-left: auto;
      .box {
        transform: translate3d(500px, 0, 0);
        .detail {
          left: calc(-400px + 20px);
          right: auto;
          transform: translateX(-100%);
        }
      }
    }
    .box {
      display: block;
      position: absolute;
      box-sizing: border-box;
      /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
      max-width: 600px;
      width: 100%;
      min-height: 600px;
      height: 600px;
      border: 5px solid ${({ theme }) => theme.COLORS.realblack};
      color: ${({ theme }) => theme.COLORS.gray10};
      transform: translate3d(-500px, 0, 0);
      & > .detail,
      & > a > .detail {
        position: absolute;
        right: calc(-400px + 20px);
        bottom: 100px;
        z-index: 10;
        box-sizing: border-box;
        width: 400px;
        border: 5px solid ${({ theme }) => theme.COLORS.gray50};
        padding: 30px;
        background: ${({ theme }) => theme.COLORS.realblack};
        font-size: 18px;
        color: ${({ theme }) => theme.COLORS.white};
        transition: all 0.3s 0.4s;
        opacity: 0;
        transform: translateX(100%);
      }
      .box-inner {
        overflow: hidden;
        position: relative;
        width: 100%;
        height: 100%;
        background: ${({ theme }) => theme.COLORS.gray60};
      }
      .dummyBg {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        ${({ theme }) => theme.MIXINS.fontRaleway};
        font-size: 50px;
        text-align: center;
        color: ${({ theme }) => theme.COLORS.gray60};
      }
      .img {
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
      .tit-box {
        display: flex;
        align-items: center;
        position: absolute;
        top: 20px;
        left: 0;
        z-index: 20;
        transition: all 0.3s 0.2s;
        opacity: 0;
        transform: translateX(-50%);
        border: 5px solid ${({ theme }) => theme.COLORS.realblack};
        border-left: none;
        ${({ theme }) => theme.MIXINS.fontPixelifySans};
        font-weight: 700;
        font-size: 16px;
        color: #fff;
        .tit-h2 {
          padding: 20px;
          background: ${({ theme }) => theme.COLORS.black};
        }
        [class^="type"] {
          padding: 20px;
          &[class*="project"] {
            background: ${({ theme }) => theme.COLORS.blue};
          }
          &[class*="maintain"] {
            background: ${({ theme }) => theme.COLORS.green};
          }
        }
      }
      .info-box {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        position: absolute;
        inset: 0;
        z-index: 10;
        opacity: 0;
        transition: all 0.6s;
        ${({ theme }) => theme.MIXINS.fontDungGeunMo};
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
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          .period {
            font-size: 16px;
          }
        }
        .role {
          margin-top: 10px;
        }
        .percentage {
          margin-top: 10px;
        }
        .detail {
          margin-top: 20px;
        }
      }
      &.active {
        /* opacity: 1; */
        box-shadow:
          rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
          rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        & > .detail,
        & > a > .detail {
          opacity: 1;
          transform: translateX(0);
        }
        .img {
          img {
            transform: scale(1.2);
          }
        }
        .tit-box {
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

function Item({ item }) {
  const mobile = usDetectDevice();
  return (
    <Fragment>
      <div className="box-inner">
        {item.bgUrl ? (
          <div className="img">
            <Image
              src={item.bgUrl}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100%"
              alt={item.title}
            />
          </div>
        ) : (
          <div className="dummyBg">No Image</div>
        )}
        <div className="tit-box">
          <div className={`type-${item.type}`}>
            {item.type === "project" ? "Project" : "Maintenance"}
          </div>
          <h2 className="tit-h2">{item.title}</h2>
        </div>
        <div className="info-box">
          {item.imgUrl && (
            <div className="img-hover">
              <Image
                src={item.imgUrl}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100%"
                alt={item.title}
              />
            </div>
          )}
          <div className="info-inner">
            <div className="tit-area">
              <div className="tit">{item.desc}</div>
              <div className="period">{item.period}</div>
            </div>
            <div className="role">역할 : {item.role}</div>
            <div className="percentage">참여도 : {item.percentage}</div>
            {mobile && item.detail && (
              <div className="detail">{item.detail}</div>
            )}
            {item.tags && (
              <Tags>
                {item.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </Tags>
            )}
          </div>
        </div>
      </div>
      {!mobile && item.detail && <div className="detail">{item.detail}</div>}
    </Fragment>
  );
}

function Box({ item }) {
  return (
    <div className="box">
      {item.url ? (
        <Link href={item.url} target="_blank">
          <Item item={item} />
        </Link>
      ) : (
        <Item item={item} />
      )}
    </div>
  );
}
function Portfolio(props) {
  const [data, setData] = useState(null);
  const [viewListType, setViewListType] = useState(true);
  const changeType = () => {
    setViewListType((prevState) => !prevState);
    window.scrollTo(0, 0);
  };
  const viewAction = () => {
    horizontalScroll(".horizontal-txt .txt", "background");
    scrollFixElement(".portfolio-list .box", 1);
  };

  const stopViewAction = () => {
    return () => {
      ScrollTrigger.refresh();
    };
  };

  useEffect(() => {
    setData(portfolioData);
  }, []);
  useEffect(() => {
    if (data && viewListType) {
      viewAction();
    } else {
      stopViewAction();
    }
  }, [data, viewListType]);

  return (
    data && (
      <div>
        <TypeBtn className={viewListType ? "on" : ""} onClick={changeType}>
          {viewListType ? "목록으로 보기" : "이미지로 보기"}
        </TypeBtn>
        {viewListType ? (
          <div>
            <BgText className="horizontal-txt">
              <div className="txt">
                Success doesn’t come from what you do occasionally, but what you
                do consistently.
              </div>
            </BgText>
            <List className="portfolio-list">
              {data.map((item, i) => {
                return (
                  <li key={item.id} className={item.isMobile ? "mo" : ""}>
                    <Box item={item} />
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
              <col style={{ width: "15%" }} />
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
                      {item.type === "project" ? "Project" : "Maintenance"}
                    </td>
                    <td>{item.title}</td>
                    <td>{item.role}</td>
                    <td className="desc">
                      <div className="tit">{item.desc}</div>
                      <div className="detail">{item.detail}</div>
                    </td>
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
      </div>
    )
  );
}

Portfolio.bgColor = "#444";

export default Portfolio;
