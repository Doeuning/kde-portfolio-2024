import styled from "styled-components";
import { useState, useEffect } from "react";

const CanvasWrap = styled.div`
  //#wave {
  //  position: fixed;
  //  top: 0;
  //  right: 0;
  //  bottom: 0;
  //  left: 0;
  //  width: 100%;
  //  height: 100%;
  //}
`;

function Point({ x, y, fixedY, cur }) {
  const [posX, setPosX] = useState(x);
  const [posY, setPosY] = useState(y);
  const [curr, setCurr] = useState(cur);
  const speed = 0.1;
  const max = Math.random() * 100 + 150;

  const update = () => {
    setCurr((prevState) => {
      prevState += speed;
    });
    setPosY(fixedY + Math.sin(curr) * max);
  };
  return <div></div>;
}
function Wave(props) {
  if (typeof window !== "undefined") {
  }
  const resize = () => {};

  useEffect(() => {}, []);
  return (
    <CanvasWrap>
      <Point x={500} y={400} />
    </CanvasWrap>
  );
}

export default Wave;
