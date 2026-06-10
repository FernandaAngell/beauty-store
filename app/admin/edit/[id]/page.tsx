"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`https://beauty-store-ea6m.onrender.com/products/${params.id}`);
        const product = await res.json();

        if (!product || product.price === undefined) {
          alert("Producto no encontrado");
          router.push("/products");
          return;
        }

        setName(product.name ?? "");
        setPrice(product.price?.toString() ?? "");
        setImage(product.image ?? "");
      } catch (error) {
        console.error(error);
        alert("Error cargando producto");
      } finally {
        setLoading(false);
      }
    }

    if (params.id) loadProduct();
  }, [params.id, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch(`https://beauty-store-ea6m.onrender.com/products/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price: Number(price), image }),
      });
      alert("Producto actualizado");
      router.push("/products");
    } catch (error) {
      console.error(error);
      alert("Error actualizando producto");
    }
  }

  if (loading) {
    return (
      <section className="page-enter min-h-screen flex items-center justify-center">
        <p style={{ fontSize: "11px", letterSpacing: "0.3em", color: "#c4724a" }}>
          CARGANDO PRODUCTO...
        </p>
      </section>
    );
  }

  return (
    <section className="page-enter min-h-screen flex items-center justify-center px-8">
      <div style={{ width: "100%", maxWidth: "440px" }}>

        <p style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#c4724a", marginBottom: "8px" }}>
          ADMINISTRACIÓN
        </p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "42px",
          fontWeight: 300,
          color: "#2e1e16",
          marginBottom: "48px"
        }}>
          Editar producto
        </h1>

    <button
  type="button"
  onClick={() => router.push("/admin/orders")}
  style={{
    background: "transparent",
    border: "none",
    color: "#c4724a",
    fontSize: "11px",
    letterSpacing: "0.18em",
    cursor: "pointer",
    marginBottom: "40px",
    padding: 0,
  }}
>
  VER PEDIDOS →
</button>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>

          {[
            { placeholder: "Nombre del producto", value: name, onChange: setName, type: "text" },
            { placeholder: "Precio", value: price, onChange: setPrice, type: "number" },
            { placeholder: "URL de imagen", value: image, onChange: setImage, type: "text" },
          ].map(({ placeholder, value, onChange, type }) => (
            <div key={placeholder} style={{ marginBottom: "16px" }}>
              <input
                type={type}
                placeholder={placeholder.toUpperCase()}
                value={value}
                onChange={e => onChange(e.target.value)}
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
                  transition: "border-color 0.2s ease"
                }}
                onFocus={e => e.currentTarget.style.borderBottomColor = "#c4724a"}
                onBlur={e => e.currentTarget.style.borderBottomColor = "#e8ddd4"}
              />
            </div>
          ))}

          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            <button
              type="button"
              onClick={() => router.push("/products")}
              className="btn-press"
              style={{
                flex: 1,
                background: "transparent",
                border: "1px solid #e8ddd4",
                color: "#a08878",
                padding: "14px",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.2em",
                cursor: "pointer",
                textTransform: "uppercase" as const,
                transition: "border-color 0.2s ease"
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#c4724a"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#e8ddd4"}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="btn-press"
              style={{
                flex: 2,
                background: "#c4724a",
                color: "#faf6f1",
                border: "none",
                padding: "14px",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.2em",
                cursor: "pointer",
                textTransform: "uppercase" as const,
                transition: "opacity 0.2s ease"
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              Actualizar producto
            </button>
          </div>

        </form>
      </div>
    </section>
  );
}