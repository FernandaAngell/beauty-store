"use client";

import { useCart } from "../context/CartContext";
import { useState } from "react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [success, setSuccess] = useState(false);
  const [orderSummary, setOrderSummary] = useState<{
  items: typeof cart;
  total: number;
}>({
  items: [],
  total: 0,
});
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    direccion: "",
    ciudad: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const total = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.nombre.trim()) newErrors.nombre = "Requerido";
    if (!form.correo.trim() || !form.correo.includes("@")) newErrors.correo = "Correo inválido";
    if (!form.direccion.trim()) newErrors.direccion = "Requerido";
    if (!form.ciudad.trim()) newErrors.ciudad = "Requerido";
    return newErrors;
  };

 const handleSubmit = async () => {
  const newErrors = validate();

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    await fetch(
      "https://beauty-store-ea6m.onrender.com/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: form.nombre,
          total,
          cart,
          email: form.correo,
          address: form.direccion,
          city: form.ciudad,
        }),
      }
    );

    setOrderSummary({
      items: [...cart],
      total,
    });

    clearCart();

    setSuccess(true);

  } catch (error) {
    console.error(error);

    alert(
      "Ocurrió un error al registrar el pedido"
    );
  }
};

  if (success) {
    return (
      <section className="page-enter max-w-2xl mx-auto px-10 py-24 text-center">

        <div style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          border: "1.5px solid #c4724a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 32px",
          fontSize: "28px",
          color: "#c4724a"
        }}>
          ✓
        </div>

        <p style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#c4724a", marginBottom: "12px" }}>
          PEDIDO CONFIRMADO
        </p>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "42px",
          fontWeight: 300,
          color: "#2e1e16",
          marginBottom: "20px",
          lineHeight: 1.2
        }}>
          ¡Gracias por tu compra,<br />
          <em>{form.nombre}</em>!
        </h1>

        <p style={{
          fontSize: "12px",
          color: "#9a7e72",
          letterSpacing: "0.08em",
          lineHeight: 1.9,
          maxWidth: "420px",
          margin: "0 auto 16px"
        }}>
          Tu pedido ha sido recibido con éxito. En breve nos pondremos en contacto contigo a través de{" "}
          <span style={{ color: "#c4724a" }}>{form.correo}</span> para coordinar la entrega.
        </p>

        <p style={{
          fontSize: "11px",
          color: "#a08878",
          letterSpacing: "0.06em",
          marginBottom: "48px"
        }}>
          Dirección de entrega: {form.direccion}, {form.ciudad}
        </p>

        <div style={{
          background: "#fff9f5",
          border: "1px solid #e8ddd4",
          padding: "24px 32px",
          maxWidth: "380px",
          margin: "0 auto 48px"
        }}>
          <p style={{ fontSize: "9px", letterSpacing: "0.2em", color: "#a08878", marginBottom: "16px" }}>
            RESUMEN
          </p>
          {orderSummary.items.map((product) => (
  <div
    key={product.id}
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px",
      fontSize: "12px",
      color: "#9a7e72",
    }}
  >
    <span>
      {product.name} x{product.quantity}
    </span>

    <span>
      $
      {(product.price * product.quantity).toLocaleString()}
    </span>
  </div>
))}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "12px",
            borderTop: "1px solid #e8ddd4"
          }}>
            <span style={{ fontSize: "9px", letterSpacing: "0.2em", color: "#a08878" }}>TOTAL PAGADO</span>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "24px",
              fontWeight: 300,
              color: "#c4724a"
            }}>
              ${orderSummary.total.toLocaleString()}
            </span>
          </div>
        </div>

        <Link href="/products">
          <button
            className="btn-press"
            style={{
              background: "#c4724a",
              color: "#faf6f1",
              border: "none",
              padding: "14px 48px",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.2em",
              cursor: "pointer",
              textTransform: "uppercase" as const
            }}
          >
            Seguir comprando
          </button>
        </Link>

      </section>
    );
  }

  return (
    <section className="page-enter max-w-5xl mx-auto px-10 py-16">

      <p style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#c4724a", marginBottom: "8px" }}>
        FINALIZAR PEDIDO
      </p>
      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "42px",
        fontWeight: 300,
        color: "#2e1e16",
        marginBottom: "48px"
      }}>
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-12">

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>

          {[
            { key: "nombre", placeholder: "Nombre completo" },
            { key: "correo", placeholder: "Correo electrónico" },
            { key: "direccion", placeholder: "Dirección" },
            { key: "ciudad", placeholder: "Ciudad" },
          ].map(({ key, placeholder }) => (
            <div key={key} style={{ marginBottom: "8px" }}>
              <input
                type="text"
                placeholder={placeholder.toUpperCase()}
                value={form[key as keyof typeof form]}
                onChange={e => {
                  setForm({ ...form, [key]: e.target.value });
                  setErrors({ ...errors, [key]: "" });
                }}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  borderBottom: errors[key] ? "1px solid #c4724a" : "1px solid #e8ddd4",
                  color: "#2e1e16",
                  padding: "14px 0",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  outline: "none",
                  transition: "border-color 0.2s ease"
                }}
                onFocus={e => e.currentTarget.style.borderBottomColor = "#c4724a"}
                onBlur={e => e.currentTarget.style.borderBottomColor = errors[key] ? "#c4724a" : "#e8ddd4"}
              />
              {errors[key] && (
                <p style={{ fontSize: "10px", color: "#c4724a", letterSpacing: "0.08em", marginTop: "4px" }}>
                  {errors[key]}
                </p>
              )}
            </div>
          ))}

          <button
            type="button"
            className="btn-press"
            onClick={handleSubmit}
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
              textTransform: "uppercase" as const,
              width: "100%",
              transition: "opacity 0.2s ease"
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Finalizar compra
          </button>

        </div>

        <div style={{
          background: "#fff9f5",
          border: "1px solid #e8ddd4",
          padding: "32px"
        }}>
          <p style={{ fontSize: "10px", letterSpacing: "0.25em", color: "#a08878", marginBottom: "6px" }}>
            DETALLE
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "26px",
            fontWeight: 300,
            color: "#2e1e16",
            marginBottom: "28px"
          }}>
            Resumen del pedido
          </h2>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {cart.map((product) => (
              <div key={product.id} style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #f0e8e0",
                fontSize: "12px",
                letterSpacing: "0.05em"
              }}>
                <span style={{ color: "#9a7e72" }}>
                  {product.name} x{product.quantity}
                </span>
                <span style={{ color: "#2e1e16" }}>
                  ${(product.price * product.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            paddingTop: "24px"
          }}>
            <span style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#a08878" }}>TOTAL</span>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "32px",
              fontWeight: 300,
              color: "#c4724a"
            }}>
              ${total.toLocaleString()}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}