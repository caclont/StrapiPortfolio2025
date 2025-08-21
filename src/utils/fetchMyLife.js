import axios from "axios";

const API_BASE = "https://passionate-basketball-dd3892aea3.strapiapp.com";

export async function fetchMyLife() {
  const res = await axios.get(`${API_BASE}/api/my-lives`, {
    params: {
      populate: ["Image", "Video", "annees"],
      "pagination[pageSize]": 200,
    },
  });

  return res.data.data.map((entry) => {
    return {
      id: entry.id,
      documentId: entry.documentId,
      action: entry.Action,
      description: entry.Description,

      annees: (entry.annees || []).map((a) => a.AnneeType),

      images: (entry.Image || []).map((img) => ({
        type: "image",
        url: img.URL,
        alt: img.alt || "",
      })),

      videos: (entry.Video || []).map((vid) => ({
        type: "video",
        provider: vid.provider,
        url: vid.URL,
        titre: vid.Titre,
      })),
    };
  });
}
