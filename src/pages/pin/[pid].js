import Layout from "@/components/layouts/Layout";
import { useRouter } from "next/router";
import Flex from "@/components/layouts/Flex";
import { ArrowLeftIcon } from "@/components/ui/Icons";
import IconButton from "@/components/ui/IconButton";
import ImageDetailDisplay from "@/components/layouts/ImageDetail";
import Image from "@/components/ui/Image";

export default function ImageDetail() {
  const router = useRouter();
  const { imageData: imagesStr } = router.query;
  const imageData = imagesStr ? JSON.parse(imagesStr) : [];
  return (
    <Layout title={imageData?.title}>
      <div style={{ paddingInline: "4rem" }}>
        <Flex direction="row" gap={4} disabledCenter={true}>
          <Flex style={{ width: "50%" }} gap={4} disabledCenter={true}>
            <div style={{ marginTop: "1rem", position: "sticky" }}>
              <IconButton
                icon={<ArrowLeftIcon onClick={() => router.push("/")} />}
              />
            </div>
            <ImageDetailDisplay
              imgUrl={imageData?.urls?.original}
              title={imageData?.title}
              author={imageData?.author}
              tags={imageData?.tags}
              date={imageData?.uploadDate}
              rate={imageData?.r18}
            />
          </Flex>

          <div className="sub-waterfall-container" style={{ width: "50%" }}>
            {Array.from({ length: 24 }).map((item, index) => (
              <Image key={index} index={index + 1} />
            ))}
          </div>
        </Flex>
      </div>
    </Layout>
  );
}
