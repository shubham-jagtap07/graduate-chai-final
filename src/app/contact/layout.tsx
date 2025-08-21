import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Graduate Chai & Products. We'd love to hear from you about our premium tea products, franchise opportunities, or any questions you may have.",
  keywords: [
    "contact",
    "graduate chai",
    "tea company",
    "customer service",
    "support",
  ],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
