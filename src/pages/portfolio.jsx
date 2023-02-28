import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";
import { portfolioData } from "../datas";
import { parallaxElement } from "@utils/scrollEvents";

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
  padding: 200px 0;
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
      box-sizing: border-box;
      //box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      //height: 100%;
      width: 100%;
      height: 500px;
      padding: 20px;
      background: ${({ theme }) => theme.COLORS.gray90};
      color: ${({ theme }) => theme.COLORS.gray10};
      transition: all 0.3s;
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
        margin-top: auto;
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
    a.box {
      display: block;
      &:hover,
      &:focus {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
          rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
      }
    }
  }
`;

function Item({ item }) {
  return (
    <>
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
    </>
  );
}

function Portfolio(props) {
  // const [speed, setSpeed] = useState(0);
  useEffect(() => {
    parallaxElement(".portfolio-list .box");
  }, []);

  return (
    <div>
      <List className="portfolio-list">
        {portfolioData.map((item) => {
          const random = Math.random() * 1;
          const speed = random.toFixed(1);
          return (
            <li key={item.id}>
              {item.url ? (
                <Link
                  href={item.url}
                  target="_blank"
                  className="box"
                  data-speed={speed}
                >
                  <Item item={item}></Item>
                </Link>
              ) : (
                <div className="box disabled" data-speed={speed}>
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
