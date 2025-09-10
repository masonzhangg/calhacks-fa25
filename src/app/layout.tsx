import type { Metadata } from "next";
import { Inter, Kantumruy_Pro } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Spool",
  description: "",
};

const kantumruyPro = Kantumruy_Pro({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-kantumruy-pro",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/"
      afterSignUpUrl="/"
      afterSignOutUrl="/logout"
    >
      <html
        lang="en"
        className={`${kantumruyPro.variable} ${inter.variable}`}
        suppressHydrationWarning={true}
      >
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
