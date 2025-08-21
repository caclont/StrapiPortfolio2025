"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { fetchProjects } from "../../utils/fetchProjects";
import "./projects.css";

const widthPresets = [
  ["40%", "30%", "30%"],
  ["30%", "50%", "20%"],
  ["50%", "20%", "30%"],
];

// Fonction pour transformer les blocks de description en texte brut
const getDescriptionText = (desc) => {
  if (!desc) return "Pas de description";
  return desc
    .map((block) => block.children?.map((child) => child.text).join("") || "")
    .join("\n");
};

export default function Projects() {
  const [projets, setProjets] = useState([]);
  const containerRef = useRef(null);

  // 📌 Récupération de la position scroll depuis sessionStorage
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("projects-scroll");
    if (savedScroll) {
      window.scrollTo(0, parseInt(savedScroll, 10));
    }
  }, []);

  // Chargement des projets
  useEffect(() => {
    async function loadProjects() {
      const data = await fetchProjects();
      setProjets(data);
      // console.log(data);
    }
    loadProjects();
  }, []);
  // Observer pour l'animation
  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".project-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [projets]);

  // 📌 Sauvegarde automatique de la position scroll
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem("projects-scroll", window.scrollY.toString());
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!projets.length) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <main className="projects-container" ref={containerRef}>
      <div className="graphiqueProject"></div>

      {projets.map((projet, projetIndex) => {
        const mediaItems = [...(projet.images || []), ...(projet.videos || [])];
        const preset = widthPresets[projetIndex % widthPresets.length];

        return (
          <div key={projet.id} className="project-card">
            {/* Texte du projet */}
            <div className="project-text">
              <div className="project-meta">
                <h2 className="project-title">
                  <div className={projet.titre?.length > 9 ? "scroll-wrapper" : ""}>
                    <span className={projet.titre?.length > 9 ? "scroll-text" : ""}>
                      <Link href={`/projects/${projet.slug}`}>{projet.titre}</Link>
                    </span>
                  </div>
                </h2>

                <span className="project-year">
                  <strong>→ {projet.annees?.join(", ") || "?"}</strong>
                </span>
              </div>

              <div className="project-category-container">
                {(projet.categories || []).map((cat, index) => (
                  <p key={index} className="project-category">{cat}</p>
                ))}
              </div>

              <p className="project-description">{getDescriptionText(projet.description)}</p>
            </div>

            {/* Médias du projet */}
            <div className="project-media">
              {mediaItems.length > 0 ? (
                mediaItems.slice(0, 3).map((media, index) => {
                  const randomZIndex = Math.random() < 0.5 ? 9 : 11;
                  const width = preset[index] || "30%";

                  if (media.type === "image") {
                    return (
                      <img
                        key={index}
                        src={media.url}
                        alt={media.alt || `Media ${index + 1}`}
                        style={{ width, position: "relative", zIndex: randomZIndex }}
                        className="hoverable"
                      />
                    );
                  }

                  if (media.type === "video") {
                    const vimeoId = media.url.split("/").pop();
                    const vimeoSrc = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&muted=1&controls=0&background=1`;

                    return (
                      <div
                        key={index}
                        style={{ position: "relative", width, paddingTop: "56.25%", zIndex: randomZIndex }}
                        className="hoverable"
                      >
                        <iframe
                          src={vimeoSrc}
                          title={media.titre || `Video ${index + 1}`}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            border: "none",
                            pointerEvents: "none",
                          }}
                          allow="autoplay; fullscreen"
                          allowFullScreen
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            zIndex: 10,
                          }}
                        />
                      </div>
                    );
                  }

                  return null;
                })
              ) : (
                <p className="text-gray-500">Aucun média</p>
              )}
            </div>
          </div>
        );
      })}
    </main>
  );
}
