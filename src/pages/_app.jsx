import "@root/wdyr";
import "@styles/globals.scss";
import { ThemeProvider } from "styled-components";
import usDetectDevice from "@src/hooks/usDetectDevice";
import Layout from "@layouts/Layout";
import CleanLayout from "@layouts/CleanLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const theme = require('sass-extract-loader?{"plugins":["sass-extract-js"],"options": {camelCase: true}}!../styles/_variables.scss');
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

  return (
    <ThemeProvider theme={theme}>
      <div className={mobile ? "mobile" : "pc"}>
        <SetLayout>
          <Component {...{ ...pageProps }} />
          {/*history, prev */}
        </SetLayout>
      </div>
    </ThemeProvider>
  );
};

export default MyApp;
