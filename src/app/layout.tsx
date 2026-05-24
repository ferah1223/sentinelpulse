import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SentinelPulse — AI-Powered DeFi Monitoring",
  description:
    "Real-time DeFi protocol monitoring powered by Xiaomi MiMo V2.5 multi-agent intelligence. Track TVL, detect anomalies, and monitor whale activity.",
  keywords: ["DeFi", "monitoring", "AI", "MiMo", "Xiaomi", "blockchain", "security"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface-void text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
