import Wave from "@components/Wave";
import { useEffect } from "react";

function Aboutme(props) {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    window.addEventListener("resize", resize, false);

    const stageWidth = document.body.clientWidth;
    const stageHeight = document.body.clientHeight;
    const resize = () => {
      ctx.width = stageWidth * 2;
      ctx.height = stageHeight * 2;
      ctx.scale(2, 2);
    };

    const animate = (t) => {
      ctx.clearRect(0, 0, stageWidth, stageHeight);
      requestAnimationFrame(animate);
    };
  }, []);
  return (
    <div>
      <Wave></Wave>
    </div>
  );
}

export default Aboutme;
