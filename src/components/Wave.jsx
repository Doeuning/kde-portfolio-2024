import styled from "styled-components";
import { useState, useEffect, useRef } from "react";

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
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [stageWidth, setStageWidth] = useState(0);
  const [stageHeight, setStageHeight] = useState(0);
  const options = {};

  const setCanvasSize = () => {
    setStageWidth(document.body.clientWidth);
    setStageHeight(document.body.clientHeight);
  };
  const drawWave = () => {
    if (!ctx) return;
    const points = [
      {
        x: 0,
        y: stageHeight / 2,
      },
      {
        x: 100,
        y: 200,
      },
    ];
    ctx.beginPath();
    ctx.moveTo(0, 0);
    // ctx.moveTo(array[0].x, array[0].y);
    // ctx.lineTo(array[1].x, array[1].y);
    for (let i = 0; i < points.length - 1; i++) {
      const c = (points[i].x + points[i + 1].x) / 2;
      const d = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, c, d);
    }
    ctx.stroke();
    // ctx.fillStyle = "#ff0000";
    // ctx.fill();
  };

  useEffect(() => {
    setCanvasSize();
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.width = stageWidth * 2 + "px";
    context.height = stageHeight * 2 + "px";
    setCtx(context);
  }, []);

  useEffect(() => {
    drawWave();
  }, [ctx]);

  if (typeof window !== "undefined") {
    window.addEventListener("resize", setCanvasSize);
  }

  return (
    <CanvasWrap>
      <Point x={500} y={400} />
      <canvas ref={canvasRef} width={stageWidth} height={stageHeight}></canvas>
    </CanvasWrap>
  );
}

export default Wave;
