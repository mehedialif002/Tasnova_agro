// Ei file-e apnar business-er basic info likhun.
// Eta change korle side-er shob jaygay automatic update hoye jabe.

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Tasnova Agro Farm Ltd.",
  tagline: "আমরা দিচ্ছি খামার থেকে সরাসরি আপনার জন্য বিশুদ্ধ ও নিরাপদ দুধ, মুরগি, ডিম ও সবজি।",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801XXXXXXXXX",
  whatsappDefaultText:
    process.env.NEXT_PUBLIC_ORDER_WHATSAPP_TEXT ||
    "Hi, ami apnar product niye order dite chai",
  nav: [
    { label: "Products", href: "#products" },
    { label: "Why Us", href: "#why-us" },
    { label: "Order", href: "#order" },
  ],
};
