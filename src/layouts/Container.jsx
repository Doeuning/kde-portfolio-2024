import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Wrap = styled.div`
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: ${(p) => p.theme.gray80};
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
  const router = useRouter();
  // const handleRouteChange = (url, { shallow }) => {
  //   console.log(url, shallow);
  // };
  const ex = (url, { shallow }) => {
    console.log(url, shallow);
  };
  useEffect(() => {
    router.events.on("beforeHistoryChange", ex);
  }, []);
  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={router.asPath}
        variants={variants}
        animate="in"
        initial="next"
        exit="prev"
      >
        <Wrap>{children}</Wrap>
      </motion.div>
    </AnimatePresence>
  );
}

export default Container;
