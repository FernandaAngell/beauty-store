import Link from "next/link";

export default function HomePage() {
  return (
    <section className="page-enter flex flex-col items-center justify-center min-h-[85vh] text-center px-8"
      style={{ background: "linear-gradient(180deg, #faf6f1 0%, #f5f0ea 100%)" }}>

      <p style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#c4724a", marginBottom: "20px" }}>
        NUEVA COLECCIÓN
      </p>

      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(40px, 6vw, 68px)",
        fontWeight: 300,
        color: "#2e1e16",
        lineHeight: 1.15,
        marginBottom: "20px"
      }}>
        Belleza que<br /><em>inspira confianza</em>
      </h1>

      <p style={{ fontSize: "12px", letterSpacing: "0.08em", color: "#9a7e72", maxWidth: "400px", lineHeight: 1.9, marginBottom: "40px" }}>
        Descubre productos de alta calidad diseñados para resaltar tu estilo y acompañarte en cada momento.
      </p>

      <Link href="/products">
        <button className="btn-press" style={{
          background: "#c4724a",
          color: "#faf6f1",
          border: "none",
          padding: "14px 48px",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "11px",
          letterSpacing: "0.2em",
          cursor: "pointer",
          textTransform: "uppercase"
        }}>
          Explorar catálogo
        </button>
      </Link>
    </section>
  );
}