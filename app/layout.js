
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Get me a Chai - Fund your projects with chai",
  description: "This website is a crowdfunding platform for creators",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en" >
        <body className="min-h-full flex flex-col">
      <SessionWrapper>
      <Navbar/>
      <div className="min-h-[87vh]">  {children}</div>
    
      <Footer/>
      </SessionWrapper>
         </body>
    </html>
  );
}
