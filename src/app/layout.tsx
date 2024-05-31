import { Inter } from "next/font/google";
import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import "./globals.css";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <Breadcrumb />
        {children}      
        <Footer />
      </body>
    </html>
  );
}
