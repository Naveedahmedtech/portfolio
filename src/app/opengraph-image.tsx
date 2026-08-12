import { ImageResponse } from "next/og";

export const alt = "Naveed Ahmed — Backend / Product Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: "#111214", color: "#f1f2f3", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", padding: "72px", width: "100%" }}>
      <div style={{ color: "#6ea8fe", display: "flex", fontSize: 24, letterSpacing: 3 }}>BACKEND / PRODUCT ENGINEER</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, letterSpacing: -3 }}>Naveed Ahmed</div>
        <div style={{ color: "#a2a7af", display: "flex", fontSize: 30 }}>Node.js · TypeScript · PostgreSQL · SDKs · Integrations · AI Backend</div>
      </div>
      <div style={{ borderTop: "1px solid #2a2d32", color: "#6f757e", display: "flex", fontSize: 22, paddingTop: 22 }}>naveedahmed.ai</div>
    </div>,
    size,
  );
}
