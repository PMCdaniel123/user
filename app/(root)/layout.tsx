import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/NavBar";
import ToastProvider from "@/lib/providers/ToastProvider";

export const metadata: Metadata = {
  title: "Borcelle Store",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`antialiased`}>
          <ToastProvider />
          <NavBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
