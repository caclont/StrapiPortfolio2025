import axios from "axios";

const API_BASE = "https://passionate-basketball-dd3892aea3.strapiapp.com";

export async function fetchProjects() {
  const res = await axios.get(`${API_BASE}/api/projets`, {
    params: {
      populate: ["Image", "Video", "categories", "annees"],
      "pagination[pageSize]": 200,
      "filters[Titre][$notNull]": true,
    },
  });

  return res.data.data.map((project) => {
    return {
      id: project.id,
      titre: project.Titre,
      slug: project.Slug,
      description: project.Description,
      lien: project.Lien,
      collaboration: project.Collaboration,
      explication: project.Explications,

      // On prend toutes les années et on extrait AnneeType
      annees: (project.annees || []).map((a) => a.AnneeType),

      // On prend toutes les catégories et on extrait CategorieType
      categories: (project.categories || []).map((c) => c.CategorieType),

      // Images
      images: (project.Image || []).map((img) => ({
        type: "image",
        url: img.URL,
        alt: img.alt || "",
      })),

      // Vidéos
      videos: (project.Video || []).map((vid) => ({
        type: "video",
        provider: vid.provider,
        url: vid.URL,
        titre: vid.Titre,
      })),
    };
  });
}
