import styled from "styled-components";
import { useState, useEffect, useRef, Component } from "react";

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

class Point extends Component {
  render() {}
  // const [posX, setPosX] = useState(x);
  // const [posY, setPosY] = useState(y);
  // const [curr, setCurr] = useState(cur);
  // const speed = 0.1;
  // const max = Math.random() * 100 + 150;
  //
  // const update = () => {
  //   setCurr((prevState) => {
  //     prevState += speed;
  //   });
  //   setPosY(fixedY + Math.sin(curr) * max);
  // };
  // return <div></div>;
}
function Wave(props) {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [stageWidth, setStageWidth] = useState(0);
  const [stageHeight, setStageHeight] = useState(0);

  const setCanvasSize = () => {
    setStageWidth(document.body.clientWidth);
    setStageHeight(document.body.clientHeight);
  };
  // const update = () => {
  //   setOptions((prevState) => ({
  //     ...prevState,
  //     y:
  //     cur: (prevState.cur += prevState.speed),
  //   }));
  // };
  const drawWave = () => {
    if (!ctx) return;
    const points = [
      {
        x: 50,
        y: stageHeight / 2,
      },
    ];
    ctx.beginPath();
    // ctx.moveTo(0, 0);
    // ctx.moveTo(array[0].x, array[0].y);
    // ctx.lineTo(array[1].x, array[1].y);
    // for (let i = 0; i < points.length - 1; i++) {
    //   const c = (points[i].x + points[i + 1].x) / 2;
    //   const d = (points[i].y + points[i + 1].y) / 2;
    //   ctx.quadraticCurveTo(points[i].x, points[i].y, c, d);
    // }
    for (let i = 0; i < 10; i++) {
      new Point({ x: 0, y: stageHeight / 2, fixedY: 0, cur: 0 });
      // ctx.arc(points[0].x + 100 * i, points[0].y + 10 * i, 5, 0, 2 * Math.PI);
    }
    // ctx.arc(points[0].x, points[0].y, 10, 0, 2 * Math.PI);
    // ctx.stroke();
    ctx.fillStyle = "#000";
    ctx.fill();
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
