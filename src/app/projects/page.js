"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { fetchProjects } from "../../utils/fetchProjects";
import "./projects.css";
import "./projects-smartphone.css";
import "./projects-tablet.css";

export default function Projects() {
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoverImage, setHoverImage] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeCategory, setActiveCategory] = useState(null);

  const containerRef = useRef(null);
  const prevPositionsRef = useRef({});

  // ----------------------------
  // Load projects
  // ----------------------------
  useEffect(() => {
    async function loadProjects() {
      const data = await fetchProjects();
      // Trier par année croissante
      data.sort((a, b) => (a.annees?.[0] || 0) - (b.annees?.[0] || 0));
      setProjets(data);
      setLoading(false);
    }
    loadProjects();
  }, []);

  // ----------------------------
  // Hover image handlers
  // ----------------------------
  const handleMouseEnter = (project) => {
    if (project.images?.length > 0) setHoverImage(project.images[0].url);
  };
  const handleMouseLeave = () => setHoverImage(null);
  const handleMouseMove = (e) => {
    if (!hoverImage) return;

    const img = document.querySelector(".hover-image");
    if (!img) return;

    const sidePadding = 20;
    const topPadding = 20;
    const bottomPadding = 20;

    const imgWidth = img.offsetWidth;
    const imgHeight = img.offsetHeight;

    let x = e.clientX - imgWidth / 2;
    let y = e.clientY - imgHeight / 2;

    x = Math.min(Math.max(x, sidePadding), window.innerWidth - imgWidth - sidePadding);
    y = Math.min(Math.max(y, topPadding), window.innerHeight - imgHeight - bottomPadding);

    setCursorPos({ x, y });
  };

  // ----------------------------
  // Category filter toggle
  // ----------------------------
  const toggleCategoryFilter = (category) =>
    setActiveCategory((prev) => (prev === category ? null : category));

  // ----------------------------
  // FLIP animation
  // ----------------------------
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const children = Array.from(containerRef.current.children);
    const firstRects = children.map((child) => child.getBoundingClientRect());

    children.forEach((child, i) => {
      const key = child.dataset.key;
      const prev = prevPositionsRef.current[key];
      if (prev) {
        const dx = prev.left - firstRects[i].left;
        const dy = prev.top - firstRects[i].top;
        if (dx || dy) {
          child.style.transform = `translate(${dx}px, ${dy}px)`;
          child.style.transition = "transform 0s";
          requestAnimationFrame(() => {
            child.style.transition = "transform 0.4s ease";
            child.style.transform = "";
          });
        }
      }
    });

    // Update previous positions
    children.forEach((child, i) => {
      prevPositionsRef.current[child.dataset.key] = firstRects[i];
    });
  }, [activeCategory, projets]);

  if (loading) {
    return (
      <div className="projects-loader-container">
        <div className="projects-loader"></div>
       <div className="projects-loader-text">Almost there ! <br></br> Just convincing my data to cooperate</div>
      </div>
    );
  }

  // ----------------------------
  // Render
  // ----------------------------
  return (
    <div className="page-wrapper">
    <div className="projects-table" ref={containerRef}>
      {projets.map((projet) => {
        const isVisible =
          !activeCategory || projet.categories?.includes(activeCategory);

        return (
          <div
            key={projet.id}
            data-key={projet.id}
            className={`project-row ${isVisible ? "visible" : "hidden"}`}
            onMouseEnter={() => handleMouseEnter(projet)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <div className="project-year">{projet.annees?.join(", ") || "?"}</div>
            <div className="project-title">
              <Link href={`/projects/${projet.slug}`}>{projet.titre}</Link>
            </div>

            <div className="project-category">
              {projet.categories?.map((cat, index) => (
                <span
                  key={index}
                  className={`project-category-button ${
                    activeCategory === cat ? "active" : ""
                  }`}
                  onClick={() => toggleCategoryFilter(cat)}
                >
                  {cat}
                </span>
              ))}
            </div>

            <div className="project-description">
              {projet.description?.[0]?.children?.[0]?.text ||
                "My CMS seems to be broken atm..."}
            </div>
          </div>
        );
      })}

      {hoverImage && (
        <img
          src={hoverImage}
          alt="Preview"
          className="hover-image"
          style={{ top: cursorPos.y, left: cursorPos.x }}
        />
      )}

    </div>
      <div className="contact-bar">
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
              <a className="contact-link"  href="mailto:a.gambarini.2001@gmail.com" target="_blank" rel="noopener noreferrer">agambarini.info@gmail.com</a>
            </h1>
          </div>
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
      </div>
    </div>
  );
}
