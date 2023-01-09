import styled from "styled-components";
import Link from "next/link";
import { portfolioData } from "../datas";

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(310px, 1fr));
  gap: 20px;
  li {
    .box {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      height: 100%;
      border-radius: 8px;
      padding: 20px;
      opacity: 0.5;
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
            background: ${(p) => p.theme.blue};
          }
          &.maintain {
            background: ${(p) => p.theme.green};
          }
        }
      }
    }
    a.box {
      opacity: 1;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      background: #fff !important;
      color: ${(p) => p.theme.gray10};
      transition: all 0.3s;
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
  return (
    <List>
      {portfolioData.map((item) => {
        return (
          <li key={item.id}>
            {item.url ? (
              <Link href={item.url} target="_blank" className="box">
                <Item item={item}></Item>
              </Link>
            ) : (
              <div className="box">
                <Item item={item}></Item>
              </div>
            )}
          </li>
        );
      })}
    </List>
  );
}

export default Portfolio;
