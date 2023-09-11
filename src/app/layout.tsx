import "./globals.css";
import type { Metadata } from "next";
import { Signika } from "next/font/google";

const signika = Signika({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Upwork clone",
  description: "Generated by Wesam Abutaima",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/upwork_favicon.jpeg" sizes="any" />
      </head>
      <body className={signika.className}>{children}</body>
    </html>
  );
}
