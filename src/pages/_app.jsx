import "@root/wdyr";
import "@styles/globals.scss";
import { ThemeProvider } from "styled-components";
import usDetectDevice from "@src/hooks/usDetectDevice";
import Layout from "@layouts/Layout";
import CleanLayout from "@layouts/CleanLayout";
import { useRouter } from "next/router";
import theme from "@styles/theme.js";
import { useEffect } from "react";
// import scrollbar from "smooth-scrollbar";
import ErrorBoundary from "@layouts/ErrorBoundary";

const layouts = {
  default: Layout,
  clean: CleanLayout,
};

const MyApp = ({ Component, pageProps }) => {
  const mobile = usDetectDevice();
  // console.log(mobile);
  const SetLayout = layouts[Component.layout] || layouts["default"];

  const router = useRouter();

  // const [history, setHistory] = useState({
  //   previous: null,
  //   current: router.asPath,
  // });
  // const [prev, setPrev] = useState(router.asPath);

  // useEffect(() => {
  //   setHistory((oldHistory) => ({
  //     ...oldHistory,
  //     previous: oldHistory.current,
  //     current: router.asPath,
  //   }));
  //   router.events.on("routeChangeComplete", (url, { shallow }) => {
  //     console.log("url", url);
  //     setPrev(router.asPath);
  //   });
  // }, [router.asPath]);

  useEffect(() => {
    // scrollbar.init(document.querySelector(".smooth-wrap"));
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <div className={`smooth-wrap ${mobile ? "mobile" : "pc"}`}>
          <SetLayout>
            <Component {...{ ...pageProps }} />
            {/*history, prev */}
          </SetLayout>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default MyApp;
