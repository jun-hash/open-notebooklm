import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OSS NotebookLM with Voice Cloning",
  description: "Generate synthetic speech from text with optional voice cloning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geist.className} antialiased bg-[#0A0A0A] text-foreground min-h-screen`}
      >
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <div className="w-16 bg-[#111111] border-r border-[#222222] flex flex-col items-center py-4 gap-6">
            <div className="text-2xl font-bold text-white/80">N</div>
            <div className="flex flex-col gap-4">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-white/60">•</span>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 p-8 flex items-center justify-center">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
