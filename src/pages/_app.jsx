import "../../wdyr";
import "../styles/globals.scss";
import { ThemeProvider } from "styled-components";
import Layout from "../layouts/Layout";
import usDetectDevice from "../hooks/usDetectDevice";
const theme = require('sass-extract-loader?{"plugins":["sass-extract-js"],"options": {camelCase: true}}!../styles/_variables.scss');

const layouts = {
  default: Layout,
};

const MyApp = ({ Component, pageProps }) => {
  const mobile = usDetectDevice();
  // console.log(mobile);
  const SetLayout = layouts[Component.layout] || layouts["default"];
  return (
    <ThemeProvider theme={theme}>
      <div className={mobile ? "mobile" : "pc"}>
        <SetLayout>
          <Component {...pageProps} />
        </SetLayout>
      </div>
    </ThemeProvider>
  );
};

export default MyApp;
