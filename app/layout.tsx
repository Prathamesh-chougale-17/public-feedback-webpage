import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "./globals.css";
import { HeaderSearch } from "@/components/HeaderSearch";
import Provider from "./Provider";
import ReactChatbot from "@/components/Chatbot/ReactChatbot";
import Chatbot from "@/components/Chatbot/Chatbot";
import { FooterLinks } from "@/components/Footer/FooterLinks";

import { cn } from "@/lib/utils";
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Police Feedback",
  description: "Made to help police officers get feedback from the public",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Provider>
          <MantineProvider>
            <HeaderSearch />
            {children}
            <FooterLinks />
            <Chatbot />
          </MantineProvider>
        </Provider>
      </body>
    </html>
  );
}
