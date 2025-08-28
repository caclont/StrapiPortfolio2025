"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchMyLife } from "@/utils/fetchMyLife";
import Lightbox from "@/utils/lightbox";
import "./mylife.css";
import "./mylife-tablet.css";
import "./mylife-smartphone.css";
import "./gridVariantMyLife.css";

import { M_PLUS_1p } from "next/font/google";

const mPlus1p = M_PLUS_1p({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const gridVariantsByCount = {
  1: [
    "mylife-grid-1-variant-1",
    "mylife-grid-1-variant-2",
    "mylife-grid-1-variant-3",
  ],
  2: [
    "mylife-grid-2-variant-1",
    "mylife-grid-2-variant-2",
    "mylife-grid-2-variant-3",
  ],
  3: [
    "mylife-grid-3-variant-1",
    "mylife-grid-3-variant-2",
    "mylife-grid-3-variant-3",
  ],
  4: [
    "mylife-grid-4-variant-1",
    "mylife-grid-4-variant-2",
    "mylife-grid-4-variant-3",
  ],
  5: [
    "mylife-grid-5-variant-1",
    "mylife-grid-5-variant-2",
    "mylife-grid-5-variant-3",
  ],
  6: [
    "mylife-grid-6-variant-1",
    "mylife-grid-6-variant-2",
    "mylife-grid-6-variant-3",
  ],
  7: [
    "mylife-grid-7-variant-1",
    "mylife-grid-7-variant-2",
    "mylife-grid-7-variant-3",
  ],
  8: [
    "mylife-grid-8-variant-1",
    "mylife-grid-8-variant-2",
    "mylife-grid-8-variant-3",
  ],
  9: [
    "mylife-grid-9-variant-1",
    "mylife-grid-9-variant-2",
    "mylife-grid-9-variant-3",
  ],
  10: [
    "mylife-grid-10-variant-1",
    "mylife-grid-10-variant-2",
    "mylife-grid-10-variant-3",
  ],
};

const HARDCODED_YEARS = Array.from(
  { length: 2025 - 2016 + 1 },
  (_, i) => 2016 + i
);

export default function MylifePage() {
  const [mylifeData, setMylifeData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchMyLife();
        setMylifeData(Array.isArray(data) ? data : []);

        if (data.length > 0) {
          const firstEntry = data.find((e) => e.annees && e.annees.length > 0);
          // console.log(firstEntry.annees[0])
          if (firstEntry) {
            const firstYear = firstEntry.annees[0];
            // console.log(firstYear);
            setSelectedYear(firstYear);
            const firstAction =
              data.find((e) => e.annees.includes(firstYear))?.action || null;
            setSelectedAction(firstAction);
          }
        }
      } catch (e) {
        console.error("fetchMyLife error", e);
      }
    })();
  }, []);

  const entriesForYear = selectedYear
    ? mylifeData.filter((item) =>
        item.annees.map((a) => Number(a)).includes(Number(selectedYear))
      )
    : [];

  const actionsForYear = [...new Set(entriesForYear.map((e) => e.action))];

  const actionDetails = selectedAction
    ? entriesForYear.find((e) => e.action === selectedAction)
    : null;

  const media = useMemo(() => {
    const imgs = actionDetails?.images || [];
    const vids = actionDetails?.videos || [];
    return [...imgs, ...vids].slice(0, 6);
  }, [actionDetails]);

  const gridClass = useMemo(() => {
    const count = media.length;
    const variants = gridVariantsByCount[count] || [];
    return variants.length
      ? variants[Math.floor(Math.random() * variants.length)]
      : "";
  }, [media]);

  return (
    <div className={`mylife-layout ${mPlus1p.className}`}>

      <aside className="mylife-years">
        {HARDCODED_YEARS.map((year) => (
          <button
            key={year}
            className={`year-item ${selectedYear == year ? "active" : ""}`}
            onClick={() => {
              setSelectedYear(year);
              const firstAction =
                mylifeData.find((e) =>
                  e.annees.map((a) => Number(a)).includes(Number(year))
                )?.action || null;
              setSelectedAction(firstAction);
            }}
          >
            <span className="arrow">→</span> {year}
          </button>
        ))}
      </aside>

      <div className="mylife-actions">
        {actionsForYear.map((action) => (
          <div
            key={`${selectedYear}-${action}`}
            className={`action-item ${
              selectedAction === action ? "active" : ""
            }`}
            onMouseEnter={() => setSelectedAction(action)}
          >
            {action}
          </div>
        ))}
      </div>

      <div className="mylife-explication">
        {actionDetails?.description && <p>{actionDetails.description}</p>}
      </div>

      <div className={`mylife-images-grid ${gridClass}`}>
        {media.map((media, i) => {
          const randomZIndex = Math.random() < 0.5 ? 9 : 11;
          const extraClass = randomZIndex === 11 ? "z11-shadow" : "";

          if (media.type === "image") {
            return (
              <img
                key={i}
                src={media.url}
                alt={selectedAction || `image-${i}`}
                className={extraClass}
                style={{
                  position: "relative",
                  zIndex: randomZIndex,
                }}
              />
            );
          }

          if (media.type === "video") {
            return (
              <video
                key={i}
                src={media.url}
                controls
                className={extraClass}
                style={{
                  position: "relative",
                  zIndex: randomZIndex,
                  maxWidth: "100%",
                }}
              />
            );
          }

          return null;
        })}
      </div>

      <Lightbox />
    </div>
  );
}
