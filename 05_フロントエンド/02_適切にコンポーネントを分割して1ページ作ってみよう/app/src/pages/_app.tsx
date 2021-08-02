import type { AppProps } from "next/app";
import "modern-css-reset";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <Component {...pageProps} />
);
export default MyApp;
