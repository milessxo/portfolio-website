import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const poppins = localFont({
  src: [
    { path: "../../public/fonts/Poppins-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Poppins-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Poppins-SemiBold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "Aw Sheng You — Digital Designer & Developer", template: "%s | Aw Sheng You" },
  description: "Portfolio of Aw Sheng You, a Singapore-based digital designer and developer building thoughtful websites, apps, and interactive experiences.",
  openGraph: { title: "Aw Sheng You — Digital Designer & Developer", description: "Designing and developing thoughtful digital experiences.", type: "website", locale: "en_SG" },
};

const themeScript = `(function(){try{var s=localStorage.getItem('asy-theme');var t=s||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})()`;
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body className={poppins.variable}><Script id="theme-init" strategy="beforeInteractive">{themeScript}</Script><a className="skip-link" href="#main-content">Skip to main content</a><ThemeProvider>{children}</ThemeProvider></body></html>;
}
