import Layout from "@/components/layouts/Layout";
import Image from "@/components/ui/Image";

export default function Home() {
  return (
    <Layout title="Pinterest | Bingyan Studio Internship Project">
      <div className="waterfall-container">
        {Array.from({ length: 32 }).map((item, index) => (
          <Image key={index} index={index + 1} />
        ))}
      </div>
    </Layout>
  );
}
