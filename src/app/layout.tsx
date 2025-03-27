// src/app/layout.tsx
"use client";

import React from "react";
import { Inter, Poppins } from "next/font/google";
import StyledComponentsRegistry from "../lib/registry";
import { AppProvider } from "../contexts";

// Configurar fontes com next/font
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
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <title>FPR Digimon</title>
        <meta
          name="description"
          content="Explore o universo Digimon e descubra informações sobre seus Digimon favoritos"
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
