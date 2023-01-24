import styled, { css } from "styled-components";
// 추후 좌표관리로 수정

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
  },
  letterJ: {
    color: "#D9B41C",
  },
  letterS: {
    color: "#0657DF",
  },
  letterZ: {
    color: "#0657DF",
  },
  hat: {
    color: "#C60BB5",
  },
  square: {
    color: "#3EB016",
  },
  stick: {
    color: "#D46615",
  },
};

const ColorStyle = css`
  ${({ name }) => css`
    background: ${options[name].color};
  `}
`;

const BoxStyle = css`
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

const BlockStyle = css`
  ${({ name }) => {
    return (
      name === "letterJ" &&
      css`
        &:nth-child(4) {
          grid-column: 3;
        }
      `
    );
  }}
  ${({ name }) => {
    return (
      name === "letterS" &&
      css`
        &:nth-child(1) {
          grid-column: 2;
        }
      `
    );
  }}
  ${({ name }) => {
    return (
      name === "letterZ" &&
      css`
        &:nth-child(3) {
          grid-column: 2;
        }
      `
    );
  }}
  ${({ name }) => {
    return (
      name === "hat" &&
      css`
        &:nth-child(1) {
          grid-column: 2;
        }
        &:nth-child(2) {
          grid-column: 1;
        }
      `
    );
  }}
`;
const TetrisBox = styled.div`
  display: inline-grid;
  ${BoxStyle};
`;
const Block = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background: gray;
  ${ColorStyle}
  ${BlockStyle}
  box-shadow: inset 10px 10px 0px 0px rgba(255, 255, 255, 0.5),
    inset -10px -10px 0px 0px rgba(0, 0, 0, 0.5);
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
