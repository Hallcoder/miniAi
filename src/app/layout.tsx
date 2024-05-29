import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <Navbar /> */}
        <Breadcrumb />
        {children}
        <Footer />
      </body>
    </html>
  );
}
