import styled from "styled-components";
import { useRouter } from "next/router";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";

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

function Container({ bgColor, children }) {
  const router = useRouter();
  return (
    <AnimatePresence
      mode="wait"
      onEnterComplete={() => window.scrollTo(0, 0)}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <LayoutGroup>
        <motion.div
          key={router.asPath}
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 0, opacity: 0 }}
          transition={{
            stiffness: 260,
            damping: 20,
            duration: 1,
          }}
          // {...direction}
        >
          <Wrap className="container" bgColor={bgColor}>
            <Inner>{children}</Inner>
          </Wrap>
        </motion.div>
      </LayoutGroup>
    </AnimatePresence>
  );
}

export default Container;
