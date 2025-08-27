// src/app/utils/EscapeRedirect.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EscapeRedirect({ to }) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        router.push(to);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, to]);

  return null;
}
