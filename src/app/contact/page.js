// src/app/home/page.js
import './contact.css';
import './contact-tablet.css';
import './contact-smartphone.css';
import { M_PLUS_1p } from 'next/font/google';

// Import et configuration de la police
const mPlus1p = M_PLUS_1p({
  weight: ['400', '700'], // poids que tu veux utiliser
  subsets: ['latin'],
});

export default function Home() {
  return (
    <main className={`contact-container ${mPlus1p.className}`}>
      <div className="contact-text-top">
        <div className="contact-social">
          <h1 className="contact-social-name">Instagram</h1>
          <h1 className="contact-arrow arrow">→</h1>
          <h1 className="contact-username">
            <a className="contact-link" href="https://www.instagram.com/caclont" target="_blank" rel="noopener noreferrer">@caclont</a>
          </h1>
        </div>

        <div className="contact-social">
          <h1 className="contact-social-name">Linkedin</h1>
          <h1 className="contact-arrow arrow">→</h1>
          <h1 className="contact-username">
            <a className="contact-link" href="https://www.linkedin.com/in/alexandre-gambarini-93509b381/" target="_blank" rel="noopener noreferrer">@alexandregambarini</a>
          </h1>
        </div>

        <div className="contact-social">
          <h1 className="contact-social-name">Email</h1>
          <h1 className="contact-arrow arrow">→</h1>
          <h1 className="contact-username">
            <a className="contact-link"  href="mailto:a.gambarini.2001@gmail.com" target="_blank" rel="noopener noreferrer">a.gambarini.2001@gmail.com</a>
          </h1>
        </div>
      </div>

      <div className="contact-video">
        <p style={{ color: 'white' }}>Video / GIF</p>
      </div>

      <div className="contact-text-bottom">
        <div className="contact-social">
          <h1 className="contact-social-name">Commission</h1>
          <h1 className="contact-arrow arrow">→</h1>
          <h1 className="contact-username">
            Open
          </h1>
        </div>

        <div className="contact-social">
          <h1 className="contact-social-name">Freelance</h1>
          <h1 className="contact-arrow arrow">→</h1>
          <h1 className="contact-username">
            Open
          </h1>
        </div>
      </div>
    </main>
  );
}
