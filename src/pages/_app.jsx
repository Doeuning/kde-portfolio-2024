import "@root/wdyr";
import "@styles/globals.scss";
import { ThemeProvider } from "styled-components";
import usDetectDevice from "@src/hooks/usDetectDevice";
import Layout from "@layouts/Layout";
import CleanLayout from "@layouts/CleanLayout";
import theme from "@styles/theme.js";
import ErrorBoundary from "@layouts/ErrorBoundary";

const layouts = {
  default: Layout,
  clean: CleanLayout,
};

const MyApp = ({ Component, pageProps }) => {
  const mobile = usDetectDevice();
  const SetLayout = layouts[Component.layout] || layouts["default"];
  const SetBgColor = Component.bgColor || "#fff";

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <div className={`smooth-wrap${mobile ? " mobile" : " pc"}`}>
          <SetLayout bgColor={SetBgColor} classNam="layout">
            <Component {...{ ...pageProps }} />
            {/*history, prev */}
          </SetLayout>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default MyApp;
