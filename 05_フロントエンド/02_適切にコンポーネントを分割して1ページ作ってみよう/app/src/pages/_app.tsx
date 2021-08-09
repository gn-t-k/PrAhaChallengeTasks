import type { AppProps } from "next/app";
import "modern-css-reset";
import "pages/global-style.css";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <Component {...pageProps} />
);
export default MyApp;
