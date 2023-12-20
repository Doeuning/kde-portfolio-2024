import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect, Fragment } from "react";
// import { ArcadeData } from "../datas";
import { motion } from "framer-motion";

import Game2048 from "@root/src/components/Game2048";

const Section = styled.section`
  padding-top: 50px;
  color: #fff;
`;
const Title = styled.h2`
  font-weight: 700;
  font-size: 50px;
  text-align: center;
  ${({ theme }) => theme.MIXINS.fontRaleway};
`;
const Board = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;
const ArcadeWrapper = styled.div`
  margin: 0 -50px;
  .game-box {
    .tit {
      margin-bottom: 20px;
      font-weight: 700;
      font-size: 30px;
      text-align: center;
    }
  }
`;

function Arcade(props) {
  // const [gameData, setGameData] = useState(null);
  // console.log("1", gameData);
  // useEffect(() => {
  //   setGameData(ArcadeData.games);
  //   console.log("2", gameData);
  // }, []);
  return (
    <ArcadeWrapper>
      {/* {gameData && ( */}
      <Section>
        <Title>Game Zone</Title>
        <Board>
          <div className="game-box">
            <h3 className="tit">2048</h3>
            <Game2048 />
          </div>
        </Board>

        {/* {gameData.map((item) => {
              return (
                <li key={item.code}>
                  <h3>{item.title}</h3>
                  {item.component}
                </li>
              );
            })} */}
      </Section>
      {/* )} */}
    </ArcadeWrapper>
  );
}

Arcade.bgColor = "#111";

export default Arcade;
