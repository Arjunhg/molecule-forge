"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/style.css";
// import React, { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "./context/UserContext";
import * as Ably from "ably";
import { ChannelProvider, AblyProvider } from "ably/react";
import { Analytics } from '@vercel/analytics/react';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const client = new Ably.Realtime(
    {
      key: process.env.NEXT_PUBLIC_ABLY_API_KEY
    }
  )

  return (
    <html lang="en">

      <script async src="https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.js"></script>
      <body suppressHydrationWarning={true}>

        <SessionProvider>

          <UserProvider>
            <AblyProvider client={client}>
              <ChannelProvider channelName="chat-demo1">
                {children}
                <Analytics/>
              </ChannelProvider>
            </AblyProvider>
          </UserProvider>
        </SessionProvider>
        
      </body>
    </html>
  );
}
