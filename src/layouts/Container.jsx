import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Wrap = styled.div`
  // position: absolute;
  width: 100%;
  min-height: 100vh;
  // background: ${(p) => p.theme.gray80};
`;

const Inner = styled.div`
  box-sizing: border-box;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const variants = {
  in: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.2,
    },
  },
  next: {
    opacity: 0,
    scale: 1,
    x: 40,
    transition: {
      duration: 0.2,
    },
  },
  prev: {
    opacity: 0,
    scale: 1,
    x: -40,
    transition: {
      duration: 0.2,
    },
  },
};
function Container({ children }) {
  // const router = useRouter();
  // const history = children.props.history;
  // const prev = children.props.prev;
  // console.log(prev, history, history.current === prev ? "prev" : "next");
  // const direction =
  //   history.current === prev
  //     ? {
  //         initial: "prev",
  //         exit: "next",
  //       }
  //     : {
  //         initial: "next",
  //         exit: "prev",
  //       };
  return (
    <AnimatePresence initial={false}>
      <motion.div
      // key={router.asPath}
      // variants={variants}
      // animate="in"
      // {...direction}
      >
        <Wrap>
          <Inner>{children}</Inner>
        </Wrap>
      </motion.div>
    </AnimatePresence>
  );
}

export default Container;
