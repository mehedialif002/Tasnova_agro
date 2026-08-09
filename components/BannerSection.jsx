"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function BannerSection() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetch("/api/banners")
      .then((res) => res.json())
      .then((data) => setBanners(data.banners || []));
  }, []);

  if (banners.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:px-8">
      <div className="space-y-6">
        {banners.map((banner) => {
          const content = (
            <div className="relative aspect-[21/6] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-md transition hover:shadow-xl md:aspect-[21/5]">
              <Image src={banner.image} alt={banner.title || "Ad banner"} fill className="object-contain" />
              {banner.title && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-base font-semibold text-white md:text-lg">{banner.title}</p>
                </div>
              )}
            </div>
          );

          return banner.link ? (
            <a key={banner.id} href={banner.link}>
              {content}
            </a>
          ) : (
            <div key={banner.id}>{content}</div>
          );
        })}
      </div>
    </section>
  );
}