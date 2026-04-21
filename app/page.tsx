"use client";
import TextInput from "./components/TextInput";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "#F2F2F2", padding: "40px" }}>

      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "28px", color: "#1E2826", marginBottom: "4px" }}>
          TextInput
        </h1>
        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", color: "#5E5E5E" }}>
          Carrot · Generated from Figma
        </p>
      </div>

      <section style={{ background: "white", borderRadius: "16px", padding: "32px", marginBottom: "24px" }}>
        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#5E5E5E", marginBottom: "28px" }}>
          Default
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "32px", maxWidth: "400px" }}>
          <TextInput label="Label" showOptional placeholder="Placeholder" hint="Hint" />
          <TextInput label="Label" placeholder="Placeholder" />
          <TextInput placeholder="Placeholder" hint="Hint" />
        </div>
      </section>

      <section style={{ background: "white", borderRadius: "16px", padding: "32px", marginBottom: "24px" }}>
        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#5E5E5E", marginBottom: "28px" }}>
          Error
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "32px", maxWidth: "400px" }}>
          <TextInput label="Label" placeholder="Placeholder" error="This field is required" />
        </div>
      </section>

      <section style={{ background: "white", borderRadius: "16px", padding: "32px" }}>
        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#5E5E5E", marginBottom: "28px" }}>
          Disabled
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "32px", maxWidth: "400px" }}>
          <TextInput label="Label" showOptional placeholder="Placeholder" hint="Hint" disabled />
        </div>
      </section>

    </main>
  );
}
