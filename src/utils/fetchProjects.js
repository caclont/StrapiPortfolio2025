// src/utils/fetchProjects.js
import axios from "axios";

// const API_BASE = "https://phenomenal-boat-7e7ba709d3.strapiapp.com";
const API_BASE = "https://passionate-basketball-dd3892aea3.strapiapp.com";
// Transforme une URL Strapi potentiellement relative en URL absolue
const toAbsoluteUrl = (u) => {
  if (!u) return null;
  return u.startsWith("http") ? u : `${API_BASE}${u}`;
};

// Normalise un champ média Strapi (images + vidéos)
const normalizeMediaList = (media) => {
  if (!media) return [];
  const arr = Array.isArray(media) ? media : media.data || [];

  return arr
    .map((file) => {
      const f = file.attributes || file; // Strapi v4: parfois { attributes: {...} }
      const mime = f?.mime || "";
      const originalUrl = toAbsoluteUrl(f?.url || f?.formats?.original?.url);
      const mediumUrl = toAbsoluteUrl(f?.formats?.medium?.url);

      // Images
      if (mime.startsWith("image/")) {
        const looksGif =
          mime === "image/gif" || originalUrl?.toLowerCase().endsWith(".gif");
        return {
          type: "image",
          url: looksGif ? originalUrl : (mediumUrl || originalUrl),
        };
      }

      // Vidéos
      if (mime.startsWith("video/")) {
        return {
          type: "video",
          url: originalUrl,
        };
      }

      // Autres types (audio, pdf...) -> ignorés ici
      return null;
    })
    .filter(Boolean);
};

// 📌 FETCH PROJECTS
export async function fetchProjects() {
  const res = await axios.get(`${API_BASE}/api/projets`, {
    params: {
      populate: "*",
      "pagination[pageSize]": 200,
      "filters[Titre][$notNull]": true,
    },
  });

  return res.data.data.map((item) => ({
    ...item,
    Media: normalizeMediaList(item.Image), // ton champ Image dans Strapi
  }));
}

// 📌 FETCH MYLIFE (inchangé)
export async function fetchMylife() {
const res = await axios.get(`${API_BASE}/api/projets`, {
  params: {
    populate: "*",
    "pagination[pageSize]": 200 // un nombre suffisamment grand
  }
});
  return res.data.data
    .filter(
      (item) =>
        item?.mylifeAnnee ||
        item?.mylifeAction ||
        item?.mylifeExplication
    )
    .map((item) => ({
      annee: item?.mylifeAnnee || null,
      action: item?.mylifeAction || null,
      explication: item?.mylifeExplication || null,
      images: normalizeMediaList(item.mylifeImages),
    }));
}
