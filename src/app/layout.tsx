import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "@/styles/globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

// Resolve a safe app URL for metadata
const RAW_APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const SAFE_APP_URL = !RAW_APP_URL || RAW_APP_URL === 'null' || RAW_APP_URL === 'undefined'
  ? 'http://localhost:3000'
  : RAW_APP_URL;

export const metadata: Metadata = {
  // Ensure Next.js can construct absolute URLs during SSR for icons, OG, etc.
  // Avoids "Invalid URL" when metadataBase would otherwise be undefined/null
  metadataBase: new URL(SAFE_APP_URL),
  title: {
    default: "Graduate Chai & Products – Premium Indian Tea",
    template: "%s | Graduate Chai & Products",
  },
  description:
    "Experience the authentic taste of premium Indian tea, crafted with tradition and served with innovation. Graduate Chai – The Educated Taste!",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
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
