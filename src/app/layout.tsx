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
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
      </style>
      <body className={"font-roboto"}>
        {/* <Navbar /> */}
        <Breadcrumb />
        {children}
        <Footer />
      </body>
    </html>
  );
}
