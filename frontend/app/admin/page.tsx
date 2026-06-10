"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://beauty-store-ea6m.onrender.com/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            price: Number(price),
            image,
          }),
        }
      );

      const data = await res.json();

      console.log(data);

      alert("Producto creado 🎉");

      setName("");
      setPrice("");
      setImage("");
    } catch (error) {
      console.error(error);
      alert("Error creando producto");
    }
  }

  return (
    <section className="page-enter min-h-screen flex items-center justify-center px-8">
      <div style={{ width: "100%", maxWidth: "500px" }}>
        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.3em",
            color: "#c4724a",
            marginBottom: "8px",
          }}
        >
          ADMINISTRACIÓN
        </p>

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "42px",
            fontWeight: 300,
            color: "#2e1e16",
            marginBottom: "16px",
          }}
        >
          Crear producto
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "40px",
          }}
        >
          <Link
            href="/admin/products"
            style={{
              color: "#c4724a",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Gestionar productos →
          </Link>

          <Link
            href="/admin/orders"
            style={{
              color: "#c4724a",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Ver pedidos →
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <input
              type="text"
              placeholder="NOMBRE DEL PRODUCTO"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid #e8ddd4",
                color: "#2e1e16",
                padding: "14px 0",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "12px",
                letterSpacing: "0.08em",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <input
              type="number"
              placeholder="PRECIO"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid #e8ddd4",
                color: "#2e1e16",
                padding: "14px 0",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "12px",
                letterSpacing: "0.08em",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <input
              type="text"
              placeholder="URL DE IMAGEN"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid #e8ddd4",
                color: "#2e1e16",
                padding: "14px 0",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "12px",
                letterSpacing: "0.08em",
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn-press"
            style={{
              marginTop: "16px",
              background: "#c4724a",
              color: "#faf6f1",
              border: "none",
              padding: "16px",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.2em",
              cursor: "pointer",
              textTransform: "uppercase",
              width: "100%",
            }}
          >
            Crear producto
          </button>
        </form>
      </div>
    </section>
  );
}