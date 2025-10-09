import Layout from "@/components/layouts/Layout";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useSession } from "next-auth/react";
import { trackWindowScroll } from "react-lazy-load-image-component";
import { useImageData } from "@/hooks/useImageData";
import WaterfallContainer from "@/components/layouts/WaterfallContainer";
import UnsignedHomePage from "@/contents/UnsignedHomePage";

const Home = () => {
  const screenType = useScreenSize();
  const column = screenType;
  const { data: session } = useSession();

  const {
    data: displayData,
    isLoading,
    isError,
    fetchMore,
  } = useImageData(column);

  return (
    <Layout title="Pinterest | Bingyan Studio Internship Project">
      {session && (
        <WaterfallContainer
          displayData={displayData}
          isLoading={isLoading}
          isError={isError}
          fetchMore={fetchMore}
          column={column}
        />
      )}

      {!session && <UnsignedHomePage />}
    </Layout>
  );
};

export default trackWindowScroll(Home);