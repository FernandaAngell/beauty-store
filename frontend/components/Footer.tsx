import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #ede5dc",
        background: "#f2ebe3",
        marginTop: "0",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-12">
        <div className="flex flex-col items-center gap-6">

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "20px",
              fontWeight: 300,
              letterSpacing: "0.35em",
              color: "#c4724a",
            }}
          >
            BEAUTY STORE
          </h2>

          <div
            className="flex flex-wrap justify-center gap-4 md:gap-10"
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
            }}
          >
            <Link
              href="/"
              style={{ color: "#a08878" }}
              className="hover:text-[#c4724a] transition-colors"
            >
              INICIO
            </Link>

            <Link
              href="/products"
              style={{ color: "#a08878" }}
              className="hover:text-[#c4724a] transition-colors"
            >
              PRODUCTOS
            </Link>

            <Link
              href="/cart"
              style={{ color: "#a08878" }}
              className="hover:text-[#c4724a] transition-colors"
            >
              CARRITO
            </Link>
          </div>

          <div
            style={{
              width: "40px",
              height: "1px",
              background: "#e8ddd4",
            }}
          />

          <p
            className="text-center px-4"
            style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              color: "#9c7a63",
              lineHeight: "1.8",
            }}
          >
            © 2026 BEAUTY STORE · MARIA FERNANDA TOLOSA · TODOS LOS DERECHOS RESERVADOS
          </p>

        </div>
      </div>
    </footer>
  );
}