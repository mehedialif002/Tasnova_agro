import "./globals.css";
import { Anek_Bangla, Hind_Siliguri } from "next/font/google";

// Clean, modern Bangla sans for headings (variable weight)
const display = Anek_Bangla({
  subsets: ["bengali", "latin"],
  variable: "--font-display",
  display: "swap",
});

// Crisp, highly readable Bangla sans for body copy
const body = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME || "Agro Farm",
  description: "Fresh, farm-direct products — order in one message.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={`${display.variable} ${body.variable}`}>
        {children}
      </body>
    </html>
  );
}
