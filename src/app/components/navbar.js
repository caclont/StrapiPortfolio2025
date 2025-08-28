'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import './navbar.css';
import './navbar-smartphone.css';
import './navbar-tablet.css';

export default function Navbar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);   // controlle si la navbar doit être affichée
  const [animate, setAnimate] = useState(false);   // controlle si on doit appliquer la transition

  useEffect(() => {
    // Vérifier localStorage (client-only)
    const hasPlayed = typeof window !== 'undefined' && localStorage.getItem('navbarAnimationPlayed') === 'true';

    if (hasPlayed) {
      // Déjà joué => afficher immédiatement, sans animation
      setVisible(true);
      return;
    }

    // Pas encore joué => lancer timer pour afficher + animer après 3s
    let showTimer = null;
    let endTimer = null;

    showTimer = setTimeout(() => {
      // rendre visible
      setVisible(true);
      // appliquer la classe d'animation à la frame suivante pour forcer la transition
      requestAnimationFrame(() => setAnimate(true));

      // après la durée de la transition, marquer comme joué dans localStorage
      // (ici 800ms = durée CSS, adapte si tu changes le CSS)
      endTimer = setTimeout(() => {
        try {
          localStorage.setItem('navbarAnimationPlayed', 'true');
        } catch (e) {
          // fail silently si localStorage bloqué
        }
      }, 800);
    }, 3000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(endTimer);
    };
  }, []);

  const className = [
    'navbar',
    visible ? 'navbar-show' : '',
    animate ? 'navbar-animate' : '',
  ].filter(Boolean).join(' ');

  return (
    <nav className={className}>
      <div className="navbar__mobile-name">
        <span><Link href="/about-me">alexandre</Link></span>
        <span><Link href="/about-me">gambarini</Link></span>
      </div>

      <div className="navbar__left">
        <Link href="/about-me">alexandre</Link>
      </div>

      <div className="navbar__center">
        <Link
          href="/projects"
          className={`navbar__link link_projects ${pathname === '/projects' ? 'active' : ''}`}
        >
          projects
        </Link>
        <Link
          href="/mylife"
          className={`navbar__link link_mylife ${pathname === '/mylife' ? 'active' : ''}`}
        >
          my life
        </Link>
        <Link
          href="/contact"
          className={`navbar__link link_contact ${pathname === '/contact' ? 'active' : ''}`}
        >
          contact
        </Link>
      </div>

      <div className="navbar__right">
        <Link href="/about-me">gambarini</Link>
      </div>
    </nav>
  );
}
