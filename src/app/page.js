'use client';

import { useEffect, useRef } from 'react';
import './home.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const PHRASES = ['Alexandre Gambarini', 'Interactive Media Designer'];
const SCRAMBLE_CHARS = '!<>-\\/[]{}—=+*^?#';
const ANIMATION_SPEED = 40;
const DISPLAY_TIME = 2000;

class TextScramble {
  constructor(el, chars = SCRAMBLE_CHARS) {
    this.el = el;
    this.chars = chars;
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));

    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * ANIMATION_SPEED);
      const end = start + Math.floor(Math.random() * ANIMATION_SPEED);
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;

    for (let i = 0; i < this.queue.length; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

export default function Home() {
  const canvasRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {

    const fx = new TextScramble(textRef.current);
    let counter = 0;

    const next = () => {
      fx.setText(PHRASES[counter]).then(() => {
        setTimeout(next, DISPLAY_TIME);
      });
      counter = (counter + 1) % PHRASES.length;
    };

    next();
  }, []);

  return (
    <main className="home-container">
      <canvas ref={canvasRef} className="background-canvas"></canvas>
      <div className="backdrop"></div>

      {/* Zone cliquable élargie : tout le bloc */}
      <Link href="/projects" className="clickable-text">
        <div className="text-block clickable-text">
          <div ref={textRef} className="text clickable-text"></div>
        </div>
      </Link>
    </main>
  );
}
