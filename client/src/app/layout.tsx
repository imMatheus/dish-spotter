import "./globals.css";

export const metadata = {
  title: "Dish spotter",
  description: "Find the best restaurants near you",
};

import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="grid min-h-screen grid-rows-[auto_1fr]">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
