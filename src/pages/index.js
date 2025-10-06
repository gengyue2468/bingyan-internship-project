import Layout from "@/components/layouts/Layout";
import Image from "@/components/ui/Image";
import { useState } from "react";
import { InView } from "react-intersection-observer";

export default function Home() {
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Layout title="Pinterest | Bingyan Studio Internship Project">
      <div className="waterfall-container">
        {Array.from({ length: 32 + 16 * counter }).map((item, index) => (
          <Image key={index} index={index + 1} />
        ))}
      </div>

      <InView
        onChange={() => {
          setCounter((prev) => prev + 1);
        }}
      >
        {({ ref }) => <div ref={ref} />}
      </InView>
    </Layout>
  );
}
