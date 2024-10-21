import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { Header } from "@/components/Header";
import logo from '../../public/logoo.jpg'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevMotors - sua oficina especializada",
  description: "Oficina de carros",
  keywords: ["oficina", "oficina carros", "carros"],
  openGraph: {
    title: "DevMotors - sua oficina especializada",
    images: [`${process.env.NEXT_PUBLIC_URL}/logo.jpg`]
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <p style={{textAlign: "center", marginTop: 54, marginBottom: 24}}>
                Todos direitos reservados Dev Motors @{`${new Date().getFullYear()}`}
        </p>
      </body>
    </html>
  );
}
