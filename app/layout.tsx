import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "./globals.css";
import { HeaderSearch } from "@/components/HeaderSearch";
import Provider from "./Provider";
import ReactChatbot from "@/components/Chatbot/ReactChatbot";
import Chatbot from "@/components/Chatbot/Chatbot";
import { FooterLinks } from "@/components/Footer/FooterLinks";


const inter = Inter({ subsets: ["latin"] });

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
      <body>
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
