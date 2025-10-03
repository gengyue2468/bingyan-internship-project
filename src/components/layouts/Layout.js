import Head from "next/head";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Flex from "./Flex";

export default function Layout({ title, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Sidebar />
      <div style={{ display: "flex", justifyContent: "end" }}>
        <div style={{ position: "relative", width: "calc(100% - 4.5rem)" }}>
          <Topbar />
          <main
            style={{
              paddingBlock: "6rem",
              paddingInline: "1rem",
              transitionProperty: "all",
              transitionDuration: "500ms",
            }}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
