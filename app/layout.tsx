// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content="3600" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0C5A4B" />
      </head>
      <body className={`${inter.className} bg-mosqueGreen w-screen h-screen flex justify-center items-center`}>
        <div className="digital-signage-content w-full h-full flex flex-col justify-between">
          {children}
        </div>
      </body>
    </html>
  );
}



