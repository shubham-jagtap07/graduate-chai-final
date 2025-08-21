import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "@/styles/globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

export const metadata: Metadata = {
  title: {
    default: "Graduate Chai & Products – Premium Indian Tea",
    template: "%s | Graduate Chai & Products",
  },
  description:
    "Experience the authentic taste of premium Indian tea, crafted with tradition and served with innovation. Graduate Chai – The Educated Taste!",
};

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-merriweather",
  fallback: ["Georgia", "Cambria", "Times New Roman", "Times", "serif"],
  preload: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${merriweather.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
