import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect, useRef, Fragment } from "react";

const GameWrapper = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  background: ${({ theme }) => theme.COLORS.gray20};
`;

const NumberBox = styled.div`
  user-select: none;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  border: 10px solid ${({ theme }) => theme.COLORS.gray30};
  border-radius: 20px;
  background: ${({ theme }) => theme.COLORS.black};
  font-weight: 700;
  font-size: 50px;
  color: ${({ theme }) => theme.COLORS.white};
`;

function Game2048() {
  // number array
  const [numberArray, setNumberArray] = useState([]);
  const [newObj, setNewObj] = useState(null);
  useEffect(() => {
    // 페이지 로드
    return () => {
      setNumberArray((prev) => [
        ...prev,
        {
          num: 2,
          posX: 0,
          posY: 0,
          position: { top: 0, left: 0 },
        },
      ]);
      console.log("load -------------", direction);
    };
  }, []);

  // direction
  const [touchStart, setTouchStart] = useState([0, 0]);
  const [touchEnd, setTouchEnd] = useState([0, 0]);
  const [direction, setDirection] = useState(null);
  const [clicked, setClicked] = useState(false);

  const handleMouseStart = (e) => {
    setTouchStart([e.clientX, e.clientY]);
    setClicked(true);
  };
  const handleMouseEnd = (e) => {
    setTouchEnd([e.clientX, e.clientY]);
    setClicked(false);
    detectDirection();
  };
  const handleTouchStart = (e) => {
    setTouchStart([e.touches[0].clientX, e.touches[0].clientY]);
    setClicked(true);
  };
  const handleTouchEnd = (e) => {
    setTouchEnd([e.changedTouches[0].clientX, e.changedTouches[0].clientY]);
    setClicked(false);
    detectDirection();
  };
  const detectDirection = () => {
    const diffX = touchStart[0] - touchEnd[0];
    const diffY = touchEnd[1] - touchStart[1];
    if (Math.abs(diffX) > Math.abs(diffY)) {
      diffX > 0 ? setDirection("left") : setDirection("right");
    } else {
      diffY > 0 ? setDirection("down") : setDirection("up");
    }
  };
  useEffect(() => {
    return () => {
      console.log("numberArray 길이", numberArray.length);

      // 문제구간
      numberArray.length !== 1 && numberArray.length < 16
        ? addNewNumber()
        : finishGame();
      console.log("direction changed -------------", direction);
    };
  }, [direction]);

  // new element
  const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const addNewNumber = () => {
    console.log("방향", direction);

    const num = getRandom(1, 2) * 2;
    let numX, numY;

    const makePos = () => {
      numberArray.forEach((el) => {
        numX = getRandom(0, 3);
        if (el.posX !== numX) {
          numY = getRandom(0, 3);
          if (el.posY !== numY) {
            console.log("포지선 정하기", numX, numY);
            setNewObj({
              num: num,
              posX: numX,
              posY: numY,
              position: {
                top: numY * 100,
                left: numX * 100,
              },
            });
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
    };
    makePos();
    console.log("숫자를 더할 위치입니다", numX, numY);
    setNumberArray((prev) => [...prev, newObj]);
  };

  // finish game
  const finishGame = () => {
    alert("죽었다!");
  };

  return (
    <GameWrapper
      onMouseDown={handleMouseStart}
      onTouchStart={handleTouchStart}
      onMouseUp={handleMouseEnd}
      onTouchEnd={handleTouchEnd}
    >
      {numberArray.length &&
        numberArray.map((numObj, i) => {
          console.log("number object 생성", i, numObj);
          return (
            <NumberBox key={i} style={numObj.position}>
              {numObj.num}
            </NumberBox>
          );
        })}
    </GameWrapper>
  );
}

Game2048.bgColor = "#111";
export default Game2048;