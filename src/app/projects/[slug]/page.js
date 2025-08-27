"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchProjects } from "../../../utils/fetchProjects";
import "./projectSlug.css";
import "./projectSlug-tablet.css";
import "./projectSlug-smartphone.css";
import "./gridVariant.css";
import Lightbox from "../../../utils/lightbox";
import EscapeRedirect from "../../../utils/EscapeRedirect";
import { M_PLUS_1p } from "next/font/google";
const mPlus1p = M_PLUS_1p({
  weight: ["400", "700"],
  subsets: ["latin"],
});
const gridVariantsByCount = {
  1: ["grid-1-variant-1", "grid-1-variant-2", "grid-1-variant-3"],
  2: ["grid-2-variant-1", "grid-2-variant-2", "grid-2-variant-3"],
  3: ["grid-3-variant-1", "grid-3-variant-2", "grid-3-variant-3"],
  4: ["grid-4-variant-1", "grid-4-variant-2", "grid-4-variant-3"],
  5: ["grid-5-variant-1", "grid-5-variant-2", "grid-5-variant-3"],
  6: ["grid-6-variant-1", "grid-6-variant-2", "grid-6-variant-3"],
  7: ["grid-7-variant-1", "grid-7-variant-2", "grid-7-variant-3"],
  8: ["grid-8-variant-1", "grid-8-variant-2", "grid-8-variant-3"],
  9: ["grid-9-variant-1", "grid-9-variant-2", "grid-9-variant-3"],
  10:["grid-10-variant-1","grid-10-variant-2","grid-10-variant-3"]
};

export default function ProjectPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [projet, setProjet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjet() {
      const projets = await fetchProjects();
      const found = projets.find((p) => p.slug === slug);
      setProjet(found || null);
      setLoading(false);
    }
    loadProjet();
  }, [slug]);

  if (loading) return <div className="loader"></div>;
  if (!projet) return <p>Projet introuvable</p>;

  const mediaItems = [...(projet.images || []), ...(projet.videos || [])];
  const limitedMedia = mediaItems.slice(0, 10);
  const gridClass = gridVariantsByCount[limitedMedia.length]?.[
    Math.floor(Math.random() * gridVariantsByCount[limitedMedia.length].length)
  ] || "";

  const handleBack = () => {
    const scrollY = sessionStorage.getItem("projectsScroll") || 0;
    router.push("/projects", { scroll: parseInt(scrollY, 10) });
  };

  return (
    <main className="project-page-wrapper">
  <EscapeRedirect to="/projects" />

  <button className="back-button" onClick={handleBack}>←</button>

  <div className="project-slug-container">
    <div className="project-slug-text">
      <h1 className="project-slug-title">{projet.titre}</h1>
      <div className="project-slug-category-container">
        {projet.categories?.map((cat, idx) => (
          <p key={idx} className="project-slug-category">{cat}</p>
        ))}
      </div>
      <p className="project-slug-description">
        {projet.explication || "Pas d’explication disponible."}
      </p>
      <div className="project-slug-bottom-meta">
        {projet.collaboration && <p className="collab">{projet.collaboration}</p>}
        <span><span className="arrow">→</span> {projet.annees?.[0] || "?"}</span>
      </div>
    </div>

    <div className="project-slug-media">
      <div className={`project-slug-images ${gridClass}`}>
        {limitedMedia.length ? limitedMedia.map((media, index) => {
          const gridArea = `img${index + 1}`;
          const zIndex = Math.random() < 0.5 ? 9 : 11;

          if (media.type === "image") {
            return (
              <img
                key={index}
                src={media.url}
                alt={media.alt || `Média ${index + 1}`}
                className="clickable-img"
                style={{ gridArea, zIndex }}
              />
            );
          }

          if (media.type === "video") {
            const vimeoUrl = `${media.url}?autoplay=1&loop=1&muted=1&background=1`;
            return (
              <div
                key={index}
                className="clickable-iframe-container"
                style={{ gridArea, zIndex }}
              >
                <div className="iframe-cover-wrapper">
                  <iframe
                    src={vimeoUrl}
                    title={media.titre || `Video ${index + 1}`}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  />
                </div>
              </div>
            );
          }

          return null;
        }) : <p>Aucun média</p>}
      </div>
    </div>
  </div>

  <Lightbox />
</main>

  );
}
