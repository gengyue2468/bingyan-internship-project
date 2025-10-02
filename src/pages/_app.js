import "@/styles/globals.css";
import "@/styles/normalize.css";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
