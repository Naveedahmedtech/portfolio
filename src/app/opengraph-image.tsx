import { ImageResponse } from "next/og";
import { themeColors } from "@/config/theme";

export const alt = "Naveed Ahmed — Backend / Product Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: themeColors.background, color: themeColors.text, display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", padding: "72px", width: "100%" }}>
      <div style={{ color: themeColors.accent, display: "flex", fontSize: 24, letterSpacing: 3 }}>BACKEND / PRODUCT ENGINEER</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, letterSpacing: -3 }}>Naveed Ahmed</div>
        <div style={{ color: themeColors.muted, display: "flex", fontSize: 30 }}>Node.js · TypeScript · PostgreSQL · SDKs · Integrations · AI Backend</div>
      </div>
      <div style={{ borderTop: `1px solid ${themeColors.border}`, color: themeColors.subtle, display: "flex", fontSize: 22, paddingTop: 22 }}>naveedahmed.ai</div>
    </div>,
    size,
  );
}
