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

    const openImage = (src) => {
      imgElement.src = src;
      imgElement.style.display = 'block';
      videoElement.style.display = 'none';
      iframeElement.style.display = 'none';
      videoElement.pause();
      overlay.classList.add('active');
      document.documentElement.style.overflow = 'hidden';
    };

    const openVideo = (src) => {
      videoElement.src = src;
      videoElement.style.display = 'block';
      imgElement.style.display = 'none';
      iframeElement.style.display = 'none';
      imgElement.src = '';
      overlay.classList.add('active');
      document.documentElement.style.overflow = 'hidden';
    };

    const openIframe = (src) => {
      iframeElement.src = src;
      iframeElement.style.display = 'block';
      imgElement.style.display = 'none';
      videoElement.style.display = 'none';
      imgElement.src = '';
      videoElement.pause();
      videoElement.src = '';
      overlay.classList.add('active');
      document.documentElement.style.overflow = 'hidden';
    };

    const close = () => {
      overlay.classList.remove('active');
      imgElement.src = '';
      videoElement.pause();
      videoElement.src = '';
      iframeElement.src = '';
      document.documentElement.style.overflow = '';
    };

    const isAllowedMedia = (el) =>
      containerSelectors.some((sel) => Boolean(el.closest(sel)));

    const onDocumentClick = (e) => {
      const target = e.target;

      // Clic hors média
      if (overlay.contains(target) &&
          !target.closest('.lightbox-image') &&
          !target.closest('.lightbox-video') &&
          !target.closest('.lightbox-iframe')) {
        close();
        return;
      }

      const img = target.closest('img');
      const vid = target.closest('video');
      const iframeContainer = target.closest('.clickable-iframe-container');

      if (img && isAllowedMedia(img)) {
        e.preventDefault();
        const src = img.currentSrc || img.src || img.dataset?.src || '';
        if (src) openImage(src);
      }

      if (vid && isAllowedMedia(vid)) {
        e.preventDefault();
        const src = vid.currentSrc || vid.src || vid.dataset?.src || '';
        if (src) openVideo(src);
      }

      if (iframeContainer && isAllowedMedia(iframeContainer)) {
        e.preventDefault();
        const iframe = iframeContainer.querySelector('iframe');
        if (iframe) openIframe(iframe.src);
      }
    };

    document.addEventListener('click', onDocumentClick, true);

    return () => {
      document.removeEventListener('click', onDocumentClick, true);
      if (created && overlay.parentNode) overlay.remove();
    };
  }, []);

  return null;
}
