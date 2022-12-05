import Header from "@layouts/Header";
import Container from "@layouts/Container";
import {useRouter} from "next/router";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export default function Index({ children }) {
  const router = useRouter();
  console.log(router)
  return (
    <div>
      <Header />
      <TransitionGroup className="transitions-wrapper">
        <CSSTransition
          key={router.pathname}
          classNames={"right"}
          timeout={300}
        >
          <Container>{children}</Container>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}
