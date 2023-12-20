import { css } from "styled-components";

const customMediaQuery = ({ maxWidth }) =>
  css`
    @media (max-width: ${maxWidth}px);
  `;

const theme = {
  COLORS: {
    white: "#fff",
    black: "#111",
    red: "red",
    coral: "coral",
    blue: "#3C44ED",
    green: "#00A76A",
    main: "#F1CC2F",
    gray10: "#343a40",
    gray20: "#495057",
    gray30: "#868e96",
    gray40: "#adb5bd",
    gray50: "#ced4da",
    gray60: "#dee2e6",
    gray70: "#e9ecef",
    gray80: "#f1f3f5",
    gray90: "#f8f9fa",
  },
  MEDIA: {
    /* custom: customMediaQuery, */
    pc: customMediaQuery(1440),
    tablet: customMediaQuery(768),
    mobile: customMediaQuery(576),
  },
  MIXINS: {
    fontRaleway: css`
      font-family: "Raleway", sans-serif;
    `,
    fontOleoScript: css`
      font-family: "Oleo Script Swash Caps", cursive;
    `,
    D2Coding: css`
      font-family: "D2Coding", sans-serif;
    `,
    clearFix: css`
      &:after {
        content: "";
        display: block;
        clear: both;
      }
    `,
    safeBottom: (px = "0") => `
      bottom: calc(#${px} + env(safe-area-inset-bottom));
    `,
    safeTop: (px = "0") => `
      top: calc(#${px} + env(safe-area-inset-top));
    `,
    ellipsis: (lines = "1") => `
      overflow: hidden;
      text-overflow: ellipsis;
      @if ${lines} == 1 {
        display: block;
        white-space: nowrap;
      } @else {
        -webkit-line-clamp: $lines;
        -webkit-box-orient: vertical;
        display: -webkit-box;
      }
    `,
    hidden: css`
      position: absolute !important;
      z-index: -1;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(1px, 1px, 1px, 1px);
    `,
    boxShadow: {
      normal: "0 3px 8px 0 rgb(0 0 0 / 10%)",
      purple: "0 3px 8px 0 #d6c9ff",
      blue: "0 3px 8px 0 #b3e2e6",
    },
    positionCenter: css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `,
    noVisibleScroll: css`
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    `,

    bullet: (shape = "circle") => `
      position: relative;
      padding-left: 10px;
      &:after {
        position: absolute;
        left: 0;
        top: 0.5rem;
        content: "";
        display: inline-block;
        @if ${shape} == circle {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: #999;
        }
        @if ${shape} == dash {
          width: 6px;
          height: 1px;
          background-color: #999;
        }
      }
    `,
    sprite: (url, repeat = "no-repeat", position = "0  0") => css`
      background-image: url("#${url}");
      background-repeat: ${repeat};
      background-position: ${position};
      background-size: 500px auto;
    `,
  },
};

export default theme;
