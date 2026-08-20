import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Yuvraj Tripathy | Portfolio",
  description: "Personal portfolio and resume of Yuvraj Tripathy",
};

import { ThemeProvider } from "@/components/theme-provider";

import { BackgroundSnippets } from "@/components/ui/background-snippets";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" style={{ position: 'relative' }}>
        <BackgroundSnippets />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main style={{ minHeight: '100vh', position: 'relative', zIndex: 1, paddingTop: '80px' }}>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
