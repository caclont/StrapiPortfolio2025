'use client';
import { useEffect } from 'react';
import './lightbox.css';

export default function Lightbox() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
  
    const containerSelectors = ['.project-slug-images', '.mylife-images-grid'];
  
    let overlay = document.querySelector('.lightbox-overlay');
    let created = false;
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'lightbox-overlay';
      overlay.innerHTML = `
        <button class="lightbox-close-btn">&times;</button>
        <img class="lightbox-image" alt="Preview" style="display:none;" />
        <video class="lightbox-video" controls autoplay style="display:none; max-width:90%; max-height:90%;"></video>
        <iframe class="lightbox-iframe" style="display:none; max-width:90%; max-height:90%;" allow="autoplay; fullscreen"></iframe>
      `;
      document.body.appendChild(overlay);
      created = true;
    }
  
    const imgElement = overlay.querySelector('.lightbox-image');
    const videoElement = overlay.querySelector('.lightbox-video');
    const iframeElement = overlay.querySelector('.lightbox-iframe');
    const closeBtn = overlay.querySelector('.lightbox-close-btn');
  
    const close = () => {
      overlay.classList.remove('active');
      imgElement.src = '';
      videoElement.pause();
      videoElement.src = '';
      iframeElement.src = '';
      document.documentElement.style.overflow = '';
    };
  
    // Click sur le bouton close
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // éviter de déclencher le click global
      close();
    });
  
    const isAllowedMedia = (el) =>
      containerSelectors.some((sel) => Boolean(el.closest(sel)));
  
    const onDocumentClick = (e) => {
      const target = e.target;
  
      // Clic hors média
      if (target === overlay) {
        close();
        return;
      }
      
  
      const img = target.closest('img');
      const vid = target.closest('video');
      const iframeContainer = target.closest('.clickable-iframe-container');
  
      if (img && isAllowedMedia(img)) {
        e.preventDefault();
        const src = img.currentSrc || img.src || img.dataset?.src || '';
        if (src) {
          imgElement.src = src;
          imgElement.style.display = 'block';
          videoElement.style.display = 'none';
          iframeElement.style.display = 'none';
          videoElement.pause();
          overlay.classList.add('active');
          document.documentElement.style.overflow = 'hidden';
        }
      }
  
      if (vid && isAllowedMedia(vid)) {
        e.preventDefault();
        const src = vid.currentSrc || vid.src || vid.dataset?.src || '';
        if (src) {
          videoElement.src = src;
          videoElement.style.display = 'block';
          imgElement.style.display = 'none';
          iframeElement.style.display = 'none';
          imgElement.src = '';
          overlay.classList.add('active');
          document.documentElement.style.overflow = 'hidden';
        }
      }
  
      if (iframeContainer && isAllowedMedia(iframeContainer)) {
        e.preventDefault();
        const iframe = iframeContainer.querySelector('iframe');
        if (iframe) {
          // Nettoyer l'URL de l'iframe pour reconstruire proprement les paramètres
          const baseUrl = iframe.src.split('?')[0];
      
          // Ajoute les paramètres nécessaires pour activer les contrôles, le son, etc.
          const enhancedUrl = `${baseUrl}?autoplay=1&loop=0&muted=0&controls=0`;
      
          iframeElement.src = enhancedUrl;
          iframeElement.style.display = 'block';
          imgElement.style.display = 'none';
          videoElement.style.display = 'none';
          imgElement.src = '';
          videoElement.pause();
          videoElement.src = '';
      
          overlay.classList.add('active');
          document.documentElement.style.overflow = 'hidden';
        }
      }
      
    };
  
    document.addEventListener('click', onDocumentClick, true);
  
    return () => {
      document.removeEventListener('click', onDocumentClick, true);
      closeBtn.removeEventListener('click', close);
      if (created && overlay.parentNode) overlay.remove();
    };
  }, []);
  

  return null;
}
