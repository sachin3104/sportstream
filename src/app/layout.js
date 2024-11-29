// src/app/layout.js
import "./globals.css";
// import QueryProvider from "@/utils/providers/QueryProvider";
import { MatchProvider } from "@/utils/context/MatchContext";

export const metadata = {
  title: "Sport is Important For Good Health",
  description:
    "A website dedicated to promoting the importance of sports for health.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <QueryProvider> */}
        <MatchProvider>
          <main>{children}</main>
        </MatchProvider>
        {/* </QueryProvider> */}
      </body>
    </html>
  );
}
