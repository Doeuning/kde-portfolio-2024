import styled from "styled-components";
import Tetris from "@components/Tetris";

const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  padding: 10px;
  background: lightgray;
  z-index: 100;
`;
function TetrisGame(props) {
  return (
    <div>
      <Background>
        {/*// L -> letterL 3x2 default*/}
        {/*// J -> letterJ 3x2*/}
        {/*// S -> letterS 3x2*/}
        {/*// Z -> letterZ 3x2*/}
        {/*// 네모 -> square 2x2*/}
        {/*// 일자 -> stick 1x4*/}
        {/*// 뻐큐 -> hat 3x2*/}
        <Tetris name="letterL" />
        <Tetris name="letterJ" />
        <Tetris name="letterS" />
        <Tetris name="letterZ" />
        <Tetris name="square" />
        <Tetris name="stick" />
        <Tetris name="hat" />
        <button disabled></button>
      </Background>
    </div>
  );
}

export default TetrisGame;
