'use client';

import { useEffect, useRef } from 'react';
import styles from './cursor.module.css'; // importe le CSS module

export default function Cursor() {
  const cursorRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const posAnimated = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const hoveringClickable = useRef(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    const isClickable = (target) => {
      return (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.hasAttribute('onclick') ||
        target.closest(
          '.project-slug-images img, .mylife-images-grid img, .project-slug-images video, .mylife-images-grid video, .clickable-iframe-container'
        )
      );
    };

    const onMouseOver = (e) => {
      if (isClickable(e.target)) {
        hoveringClickable.current = true;
        cursorRef.current.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        cursorRef.current.style.borderColor = 'black';
        scaleRef.current = 1.5;
      } else if (e.target.tagName === 'IFRAME') {
        hoveringClickable.current = false;
        scaleRef.current = 1;
      }
    };

    const onMouseOut = (e) => {
      if (isClickable(e.target)) {
        hoveringClickable.current = false;
        cursorRef.current.style.backgroundColor = 'rgba(0, 0, 0, 1)';
        cursorRef.current.style.borderColor = 'white';
        scaleRef.current = 1;
      }
    };

    const onMouseDown = () => {
      scaleRef.current = 0.5;
    };

    const onMouseUp = () => {
      scaleRef.current = hoveringClickable.current ? 1.5 : 1;
    };

    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    let animationFrameId;
    const animate = () => {
      posAnimated.current.x = pos.current.x;
      posAnimated.current.y = pos.current.y;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posAnimated.current.x}px, ${posAnimated.current.y}px, 0) translate(-50%, -50%) scale(${scaleRef.current})`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <div ref={cursorRef} className={styles.cursor} />;
}
