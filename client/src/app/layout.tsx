import "./globals.css";
import "material-symbols";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { Providers } from "@/redux/provider";

const lexend = Lexend({ subsets: ["latin"] });

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
      <body className={lexend.className}>
        <ToastContainer
          limit={1}
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
          className={"text-[14px]"}
        />

        <Providers>{
          children}
        </Providers>
      </body>
    </html>
  );
}
