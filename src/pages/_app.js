import "@/styles/globals.css";
import "@/styles/normalize.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <SessionProvider session={session}>
      {ready && <Component {...pageProps} />}
    </SessionProvider>
  );
}
