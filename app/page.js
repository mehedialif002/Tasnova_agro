import Header from "@/components/Header";
import VideoAd from "@/components/VideoAd";
import StatementPanel from "@/components/StatementPanel";
import BannerSlider from "@/components/BannerSlider";
import TextSectionsList from "@/components/TextSectionsList";
import ProductsSection from "@/components/ProductsSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-[color:var(--paper)]">
        {/* 1 — cinematic hero */}
        <VideoAd />

        {/* 2 — the story, one line per scroll */}
        <StatementPanel
          index="১"
          kicker="আমাদের অঙ্গীকার"
          words={[
            { t: "আমরা", dir: "left" },
            { t: "দিচ্ছি", dir: "up" },
            { t: "খাঁটি", dir: "zoom", accent: true },
            { t: "খাবার।", dir: "right" },
          ]}
          sub="প্রকৃতির মতো নিখাদ — ঠিক দাদার আমলের সেই স্বাদ।"
          image={{ src: "/products/milk.jpg", alt: "খাঁটি খামারের দুধ" }}
          imageSide="right"
        />

        <StatementPanel
          index="২"
          kicker="উৎস"
          words={[
            { t: "খামার", dir: "left" },
            { t: "থেকে", dir: "up" },
            { t: "সরাসরি", dir: "zoom", accent: true },
            { t: "আপনার", dir: "right" },
            { t: "ঘরে।", dir: "up" },
          ]}
          sub="কোনো মধ্যস্বত্বভোগী নেই, কোনো ভেজাল নেই।"
          image={{ src: "/products/farm-chicken.jpg", alt: "খামারে পালন করা মুরগি" }}
          imageSide="left"
        />

        <StatementPanel
          index="৩"
          kicker="প্রতিশ্রুতি"
          words={[
            { t: "শূন্য", dir: "left" },
            { t: "কেমিক্যাল,", dir: "up" },
            { t: "শূন্য", dir: "right" },
            { t: "হরমোন।", dir: "zoom", accent: true },
          ]}
          sub="শুধু বিশুদ্ধ দুধ, ডিম, মুরগি ও সবজি — যা আপনি নিশ্চিন্তে খাওয়াতে পারেন।"
          image={{ src: "/products/egg.jpg", alt: "খাঁটি খামারের ডিম" }}
          imageSide="right"
        />

        {/* 3 — awareness content, each its own panel */}
        <TextSectionsList />

        {/* 4 — products */}
        <ProductsSection />

        {/* 5 — offers */}
        <BannerSlider />

        {/* 6 — order / footer */}
        <Footer />
      </main>
      <WhatsAppButton />
    </>
  );
}
