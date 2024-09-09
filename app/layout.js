import { Inter } from "next/font/google";
import "./globals.css";
import { Nunito } from '@next/font/google';

const nunito = Nunito({
  subsets: ['latin'], // Subsets to include
  weights: ['200', '400', '600', '800', '1000'], // Add specific weights as needed
  italic: true, // Set to true if you need italic styles
});

export const metadata = {
  title: "Nostriot",
  description: "A Nostr IoT website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
