function Wavetest() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    window.addEventListener("resize", init, false);

    const stageWidth = document.body.clientWidth;
    const stageHeight = document.body.clientHeight;
    const init = () => {
      ctx.width = stageWidth * 2;
      ctx.height = stageHeight * 2;
      ctx.scale(2, 2);
    };

    const animate = (t) => {
      ctx.clearRect(0, 0, stageWidth, stageHeight);
      requestAnimationFrame(animate);
    };
    init();
    document.body.appendChild(canvas);
  }, []);
  return (
    <div>
      <Wave></Wave>
    </div>
  );
}

export default Wavetest;
