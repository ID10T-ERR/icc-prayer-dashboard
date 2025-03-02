// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MosqueScreen Project by MosqueOS",
  description: "Digital signage for Mosque",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content="3600" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0C5A4B" />
      </head>
      <body className={inter.className}>
        {/* Outer border with arch + pattern */}
        <div className="border-container">
          {/* Inner content with solid background */}
          <div className="inner-content">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}




