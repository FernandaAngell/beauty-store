"use client";
import Link from "next/link";
import { useCart } from "../app/context/CartContext";

type ProductProps = { id: number; name: string; price: number; image: string };

export default function ProductCard({ id, name, price, image }: ProductProps) {
  const { addToCart } = useCart();

  return (
    <div
      className="card-enter"
      style={{
        background: "#fff9f5",
        border: "1px solid #e8ddd4",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "border-color 0.3s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease"
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "#c4724a";
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 16px 40px rgba(201,169,110,0.08)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "#e8ddd4";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
   <Link href={`/products/${id}`}>
  {image ? (
    <div style={{ overflow: "hidden" }}>
      <img
        src={image}
        alt={name}
        style={{
          width: "100%",
          height: "220px",
          objectFit: "cover",
          display: "block",
          transition:
            "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </div>
  ) : (
    <div
      style={{
        width: "100%",
        height: "220px",
        background: "#f0e8e0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      SIN IMAGEN
    </div>
  )}
</Link>

      <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
        <Link href={`/products/${id}`}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "20px", fontWeight: 400, color: "#2e1e16", marginBottom: "8px",
            transition: "color 0.2s ease"
          }}
            onMouseEnter={e => e.currentTarget.style.color = "#c4724a"}
            onMouseLeave={e => e.currentTarget.style.color = "#2e1e16"}
          >
            {name}
          </h2>
        </Link>

        <p style={{ fontSize: "12px", color: "#c4724a", letterSpacing: "0.1em", marginBottom: "auto", paddingBottom: "20px" }}>
          ${price.toLocaleString()}
        </p>

        <button
          className="btn-press"
          onClick={() => addToCart({ id, name, price, image })}
          style={{
            width: "100%",
            background: "transparent",
            border: "1px solid #c4724a",
            color: "#c4724a",
            padding: "12px",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.18em",
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "background 0.25s ease, color 0.25s ease"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "#c4724a";
            e.currentTarget.style.color = "#faf6f1";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#c4724a";
          }}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}