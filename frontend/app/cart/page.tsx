"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

  return (
    <section className="page-enter max-w-7xl mx-auto px-10 py-16">

      <p style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#c4724a", marginBottom: "8px" }}>
        TU SELECCIÓN
      </p>
      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "42px",
        fontWeight: 300,
        color: "#2e1e16",
        marginBottom: "48px"
      }}>
        Carrito de compras
      </h1>

      {cart.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <p style={{ fontSize: "12px", letterSpacing: "0.2em", color: "#a08878" }}>
            NO HAY PRODUCTOS EN EL CARRITO
          </p>
          <Link href="/products">
            <button className="btn-press" style={{
              marginTop: "32px",
              background: "transparent",
              border: "1px solid #c4724a",
              color: "#c4724a",
              padding: "12px 40px",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "10px",
              letterSpacing: "0.2em",
              cursor: "pointer",
              textTransform: "uppercase" as const
            }}>
              Explorar productos
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {cart.map((product) => (
              <div
                key={product.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  padding: "24px 0",
                  borderBottom: "1px solid #f0e8e0"
                }}
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      flexShrink: 0,
                      border: "1px solid #e8ddd4"
                    }}
                  />
                ) : (
                  <div style={{
                    width: "80px",
                    height: "80px",
                    background: "#f0e8e0",
                    border: "1px solid #e8ddd4",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "9px",
                    letterSpacing: "0.1em",
                    color: "#c4b0a4"
                  }}>
                    SIN IMAGEN
                  </div>
                )}

                <div style={{ flex: 1 }}>
                  <h2 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "18px",
                    fontWeight: 400,
                    color: "#2e1e16",
                    marginBottom: "6px"
                  }}>
                    {product.name}
                  </h2>
                  <p style={{ fontSize: "11px", color: "#c4724a", letterSpacing: "0.1em", marginBottom: "4px" }}>
                    ${product.price.toLocaleString()}
                  </p>
                  <p style={{ fontSize: "11px", color: "#a08878", letterSpacing: "0.08em" }}>
                    Subtotal: ${(product.price * product.quantity).toLocaleString()}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <button
                    className="btn-press"
                    onClick={() => decreaseQuantity(product.id)}
                    style={{
                      width: "32px", height: "32px",
                      border: "1px solid #e8ddd4",
                      background: "transparent",
                      color: "#a08878",
                      cursor: "pointer",
                      fontSize: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    −
                  </button>
                  <span style={{ fontSize: "14px", color: "#2e1e16", minWidth: "20px", textAlign: "center" }}>
                    {product.quantity}
                  </span>
                  <button
                    className="btn-press"
                    onClick={() => increaseQuantity(product.id)}
                    style={{
                      width: "32px", height: "32px",
                      border: "1px solid #e8ddd4",
                      background: "transparent",
                      color: "#a08878",
                      cursor: "pointer",
                      fontSize: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn-press"
                  onClick={() => removeFromCart(product.id)}
                  style={{
                    width: "32px", height: "32px",
                    border: "1px solid #3a1818",
                    background: "transparent",
                    color: "#7a3030",
                    cursor: "pointer",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "#c0392b";
                    e.currentTarget.style.color = "#c0392b";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "#3a1818";
                    e.currentTarget.style.color = "#7a3030";
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div style={{ paddingTop: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#a08878", marginBottom: "8px" }}>
                TOTAL
              </p>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "36px",
                fontWeight: 300,
                color: "#c4724a"
              }}>
                ${total.toLocaleString()}
              </p>
            </div>

            <Link href="/checkout">
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
                Continuar compra
              </button>
            </Link>
          </div>
        </>
      )}
    </section>
  );
}