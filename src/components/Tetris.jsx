import styled, { css } from "styled-components";

// L -> letterL 3x2 default
// J -> letterJ 3x2
// S -> letterS 3x2
// Z -> letterZ 3x2
// 네모 -> square 2x2
// 일자 -> stick 1x4
// 뻐큐 -> hat 3x2
const options = {
  letterL: {
    color: "#D9B41C",
    order: [3, 4, 5, 6],
  },
  letterJ: {
    color: "#D9B41C",
    order: [1, 2, 3, 6],
  },
  letterS: {
    color: "#0657DF",
    order: [2, 3, 4, 5],
  },
  letterZ: {
    color: "#0657DF",
    order: [1, 2, 4, 5],
  },
  hat: {
    color: "#C60BB5",
    order: [2, 4, 5, 6],
  },
  square: {
    color: "#3EB016",
    order: [1, 2, 3, 4],
  },
  stick: {
    color: "#D46615",
    order: [1, 2, 3, 4],
  },
};

const colorStyle = css`
  ${({ name }) => css`
    background: ${options[name].color};
  `}
`;

const shapeStyle = css`
  grid-template-columns: repeat(3, minmax(100px, 100px));
  grid-template-rows: repeat(2, minmax(100px, 100px));
  ${({ name }) => {
    return (
      name === "square" &&
      css`
        grid-template-columns: repeat(2, minmax(100px, 100px));
        grid-template-rows: repeat(2, minmax(100px, 100px));
      `
    );
  }}
  ${({ name }) => {
    return (
      name === "stick" &&
      css`
        grid-template-columns: repeat(4, minmax(100px, 100px));
        grid-template-rows: repeat(1, minmax(100px, 100px));
      `
    );
  }}
`;

const TetrisBox = styled.div`
  display: inline-grid;
  gap: 10px;
  padding: 5px;

  ${shapeStyle};
`;
const Block = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background: gray;
  ${colorStyle}
`;

// L -> letterL 3x2 default
// J -> letterJ 3x2
// S -> letterS 3x2
// Z -> letterZ 3x2
// 네모 -> square 2x2
// 일자 -> stick 1x4
// 뻐큐 -> hat 3x2

function Tetris({ name }) {
  // let blocks = [];
  // const makeBlock = () => {
  //   for (let i = 1; (i = shape[name].number); i++) {
  //     blocks.push(<Block name={name} />);
  //   }
  //   return blocks;
  // };
  return (
    <TetrisBox name={name}>
      <Block name={name}></Block>
      <Block name={name}></Block>
      <Block name={name}></Block>
      <Block name={name}></Block>
    </TetrisBox>
  );
}

export default Tetris;
