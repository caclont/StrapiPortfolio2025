// \src\app\layout.js
import "./globals.css";
import Navbar from './components/navbar';
import Cursor from '../utils/cursor';

export const metadata = {
  title: "AG | Interactive Media Designer",
  description:
    "Portfolio of Alexandre, Media & Interactive Designer graduated from ECAL. Exploring design, interaction, and technology through creative projects.",
  keywords: [
    "Interactive Media Designer",
    "Media Design",
    "ECAL",
    "Portfolio",
    "Creative Technology",
    "UX/UI Design",
    "Visual Design",
    "Digital Art",
    "Alexandre Gambarini",
  ],
  authors: [{ name: "Alexandre G.", url: "https://www.alexandregambarini.ch/" }],
  creator: "Alexandre G.",
  publisher: "Alexandre G.",
  metadataBase: new URL("https://www.alexandregambarini.ch/"), // change par ton domaine

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "AG | Interactive Media Designer",
    description:
      "Discover the portfolio of Alexandre, Media & Interactive Designer graduated from ECAL. A creative journey into design, interaction, and technology.",
    url: "https://www.alexandregambarini.ch/",
    siteName: "AG Portfolio",
    images: [
      {
        url: "/preview.png", // ajoute une image 1200x630px
        width: 1200,
        height: 630,
        alt: "AG Portfolio preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        {children}
        <Cursor />
      </body>
    </html>
  );
}
