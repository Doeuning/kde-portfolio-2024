import Header from "@layouts/Header";
import Container from "@layouts/Container";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { createBrowserHistory } from "history";

export default function Index({ children }) {
  const router = useRouter();
  const direction = "right";
  const transitionRef = useRef(null);
  // useEffect(() => {
  //   const history = createBrowserHistory();
  //   console.log("history", history);
  //   history.listen(({ action, location }) => {
  //     console.log("action", action);
  //     console.log("location", location);
  //   });
  // }, []);
  return (
    <div>
      <Header />
      <TransitionGroup className="transitions-wrapper">
        <CSSTransition
          key={router.pathname}
          classNames={direction}
          timeout={{
            enter: 300,
            exit: 300,
          }}
          nodeRef={transitionRef}
        >
          <div ref={transitionRef}>
            <Container>{children}</Container>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}
