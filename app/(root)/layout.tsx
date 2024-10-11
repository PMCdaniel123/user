import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/NavBar";
import ToastProvider from "@/lib/providers/ToastProvider";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Habseligkeit Store",
  description: "Habseligkeit Store",
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
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
