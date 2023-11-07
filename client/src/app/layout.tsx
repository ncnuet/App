import "./globals.css";
import "material-symbols";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";

const inter = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Magic Post",
  description: "Trao gửi trọn niềm tin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
