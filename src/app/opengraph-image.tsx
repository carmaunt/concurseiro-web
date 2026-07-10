import { ImageResponse } from "next/og";

export const alt = "O Concurseiro — sua aprovação começa aqui";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: "72px",
          color: "#ffffff",
          background: "linear-gradient(135deg, #102b4e, #0d6a79)",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>O Concurseiro</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 800, lineHeight: 1.05 }}>
            Sua aprovação começa aqui.
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#d9eff4" }}>
            Conteúdos, concursos e questões para a sua preparação.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
