import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #ede5dc", background: "#f2ebe3", marginTop: "0" }}>
      <div className="max-w-7xl mx-auto px-10 py-12">
        <div className="flex flex-col items-center gap-6">

          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "20px",
            fontWeight: 300,
            letterSpacing: "0.35em",
            color: "#c4724a"
          }}>
            BEAUTY STORE
          </h2>

          <div className="flex gap-10" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#a08878" }}>
            <Link href="/" style={{ color: "#a08878" }} className="hover:text-[#c4724a] transition-colors">
              INICIO
            </Link>
            <Link href="/products" style={{ color: "#a08878" }} className="hover:text-[#c4724a] transition-colors">
              PRODUCTOS
            </Link>
            <Link href="/cart" style={{ color: "#a08878" }} className="hover:text-[#c4724a] transition-colors">
              CARRITO
            </Link>
          </div>

          <div style={{ width: "40px", height: "1px", background: "#e8ddd4" }} />

          <p style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#e8ddd4" }}>
            © 2026 BEAUTY STORE · TODOS LOS DERECHOS RESERVADOS
          </p>

        </div>
      </div>
    </footer>
  );
}