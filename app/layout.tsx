import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollProgress } from "@/components/Motion";
import { MotionProvider } from "@/components/MotionProvider";
import { googleFontsHref, rootVars, sharedContent as shared } from "@/data/data";

const bodyClass = [
  "flex min-h-full flex-col overflow-x-hidden bg-[#fbf7f5] text-[16px] leading-[1.7] text-[#3d3430]",
  "font-(family-name:--font-body) [text-rendering:optimizeLegibility]",
  "selection:bg-[#8a5230] selection:text-white",
  "[:where(&)_:where(h1,h2,h3,h4,h5,h6)]:font-(family-name:--font-heading) [:where(&)_:where(h1,h2,h3,h4,h5,h6)]:tracking-[-0.015em]",
  "[:where(&)_:where(a,button,summary,[role=button])]:cursor-pointer",
  "[&_:focus-visible]:rounded-sm [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-offset-3 [&_:focus-visible]:outline-[#8a5230]",
].join(" ");

export const metadata: Metadata = {
  title: { default: shared.site.titleDefault, template: shared.site.titleTemplate },
  description: shared.site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning style={rootVars} className="h-full overflow-x-hidden antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={googleFontsHref} />
      </head>
      <body className={bodyClass}>
        <MotionProvider>
          <ScrollProgress />
          <Header />
          <main className="flex-1 overflow-x-hidden pt-(--header-h)">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
