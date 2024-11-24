import "./globals.css";

export const metadata = {
  title: "SportStream",
  description: "Get details about cricket",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
