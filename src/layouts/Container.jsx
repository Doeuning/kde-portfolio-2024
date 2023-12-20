import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${(props) => props.bgColor};
`;

const Inner = styled.div`
  box-sizing: border-box;
  max-width: 1200px;
  margin: 0 auto;
  .mobile & {
    padding: 20px;
  }
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
function Container({ bgColor, children }) {
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
        <Wrap className="container" bgColor={bgColor}>
          <Inner>{children}</Inner>
        </Wrap>
      </motion.div>
    </AnimatePresence>
  );
}

export default Container;
