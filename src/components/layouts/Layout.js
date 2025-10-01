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
      <div>
        <Flex direction="row" gap={4}>
          <Sidebar />
          <div>
            <Topbar />
            <main>{children}</main>
          </div>
        </Flex>
      </div>
    </div>
  );
}
