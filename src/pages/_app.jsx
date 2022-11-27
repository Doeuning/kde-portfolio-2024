import "../styles/globals.scss";
import { ThemeProvider } from "styled-components";
import Layout from "../layouts/Layout";
const theme = require('sass-extract-loader?{"plugins":["sass-extract-js"]}!../styles/_variables.scss');

const layouts = {
  default: Layout,
};

const MyApp = ({ Component, pageProps }) => {
  const SetLayout = layouts[Component.layout] || layouts["default"];
  return (
    <ThemeProvider theme={theme}>
      <SetLayout>
        <Component {...pageProps} />
      </SetLayout>
    </ThemeProvider>
  );
};

export default MyApp;
