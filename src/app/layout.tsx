import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Yuvraj Tripathy | Research & Engineering",
  description: "Research, projects, and technical notes by Yuvraj Tripathy: process engineering, machine learning, knowledge graphs, and biomedical computer vision.",
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

