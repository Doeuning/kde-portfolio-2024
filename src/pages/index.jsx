import Link from "next/link";

function Index(props) {
  return (
    <div>
      <h1>Doeun Kim</h1>
      <Link href="/portfolio">포트폴리오</Link>
    </div>
  );
}

Index.layout = "clean";

export default Index;
