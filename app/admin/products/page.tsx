"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const res = await fetch("https://beauty-store-ea6m.onrender.com/products");
    const data = await res.json();
    setProducts(data);
  }

  async function deleteProduct(id: number, name: string) {
    const confirmed = window.confirm(
      `¿Eliminar "${name}"?`
    );

    if (!confirmed) return;

    try {
      await fetch(
        `https://beauty-store-ea6m.onrender.com/products/${id}`,
        {
          method: "DELETE",
        }
      );

      setProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );

      alert("Producto eliminado 🗑️");
    } catch (error) {
      console.error(error);
      alert("Error eliminando producto");
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-10 py-16">

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
          marginBottom: "48px",
        }}
      >
        Gestionar productos
      </h1>

      <div
        style={{
          background: "#fff9f5",
          border: "1px solid #e8ddd4",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
              borderBottom: "1px solid #e8ddd4",
            }}
          >
            <div>
              <h3
                style={{
                  color: "#2e1e16",
                  fontSize: "18px",
                  marginBottom: "6px",
                }}
              >
                {product.name}
              </h3>

              <p
                style={{
                  color: "#9a7e72",
                  fontSize: "13px",
                }}
              >
                ${product.price.toLocaleString()}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <Link href={`/admin/edit/${product.id}`}>
                <button
                  style={{
                    background: "#c4724a",
                    color: "#faf6f1",
                    border: "none",
                    padding: "12px 20px",
                    cursor: "pointer",
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  Editar
                </button>
              </Link>

              <button
                onClick={() =>
                  deleteProduct(
                    product.id,
                    product.name
                  )
                }
                style={{
                  background: "transparent",
                  color: "#c4724a",
                  border: "1px solid #c4724a",
                  padding: "12px 20px",
                  cursor: "pointer",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}