// src/app/components/navbar.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // pour récupérer la route actuelle (Next.js 13+ App Router)
import './navbar.css';
import './navbar-smartphone.css';
import './navbar-tablet.css';

export default function Navbar() {
  const pathname = usePathname(); // <- récupère la route actuelle

  return (
    <nav className="navbar">
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
