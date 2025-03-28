"use client";

import React from "react";
import { Inter, Poppins } from "next/font/google";
import StyledComponentsRegistry from "../lib/registry";
import { AppProvider } from "../contexts";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <title>FPR Digimon</title>
        <meta
          name="description"
          content="Explore o universo Digimon e descubra informações sobre seus Digimon favoritos"
        />
        {/* Favicon SVG do caminho personalizado */}
        <link
          rel="icon"
          href="/assets/images/agumon-icon.svg"
          type="image/svg+xml"
        />
        {/* Fallback para navegadores que não suportam SVG */}
        <link rel="icon" href="/assets/images/favicon.ico" sizes="any" />
        {/* Ícone para dispositivos Apple/iOS */}
        <link
          rel="apple-touch-icon"
          href="/assets/images/apple-touch-icon.png"
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <AppProvider>{children}</AppProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
