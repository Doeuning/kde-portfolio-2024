import Header from "@layouts/Header";
import Container from "@layouts/Container";

export default function Index({ children }) {
  return (
    <div>
      <Header />
      <Container>{children}</Container>
    </div>
  );
}
