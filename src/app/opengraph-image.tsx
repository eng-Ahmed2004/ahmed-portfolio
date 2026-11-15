import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = "Ahmed Srour — Flutter Developer and Smart Systems Engineering Student";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social sharing card, generated at build time. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#f8fafc",
          backgroundColor: "#080b14",
          backgroundImage:
            "radial-gradient(circle at 12% 0%, rgba(59,130,246,0.38), transparent 46%), radial-gradient(circle at 100% 100%, rgba(6,182,212,0.3), transparent 48%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
              backgroundImage: "linear-gradient(135deg, #3b82f6, #06b6d4)",
            }}
          >
            {profile.initials}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#94a3b8" }}>
            {profile.location.en}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, letterSpacing: -2.5 }}>
            {profile.name.en}
          </div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 32, color: "#cbd5e1" }}>
            Smart Systems &amp; Computer Engineering Student · Flutter Developer · AI Enthusiast
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: 220,
            height: 6,
            borderRadius: 6,
            backgroundImage: "linear-gradient(90deg, #3b82f6, #06b6d4)",
          }}
        />
      </div>
    ),
    size,
  );
}
