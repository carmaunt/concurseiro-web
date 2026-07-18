import { ImageResponse } from "next/og";

export const alt = "O Concurseiro — questões e desempenho para estudar com mais direção";
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
            Descubra onde você mais erra.
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#d9eff4" }}>
            Questões filtradas e evolução por disciplina para estudar com mais direção.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
