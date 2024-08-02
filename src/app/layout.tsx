import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Srila Prabhupada Vyasapuja Offerings 2024",
  description: "Offerings to Srila Prabhupada by disciples and well wishers.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="mx-auto my-0">{children}</body>
    </html>
  );
}
