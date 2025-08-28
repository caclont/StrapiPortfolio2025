// \src\app\layout.js
import "./globals.css";
import Navbar from './components/navbar';
import Cursor from '../utils/cursor';

export const metadata = {
  title: "AG | Interactive Media Designer",
  description: "I am an Interactive Media Designer graduated from ECAL passionate about creativity, user experience, and learning new technologies.",
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
