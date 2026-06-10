"use client";

import Link from "next/link";
import { useCart } from "../app/context/CartContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, p) => acc + p.quantity, 0);

  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      setAtTop(current < 10);
      setVisible(current < lastScroll || current < 60);
      setLastScroll(current);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, [lastScroll]);

  return (
    <nav
      style={{
        borderBottom: atTop
          ? "1px solid #e8ddd4"
          : "1px solid #1a1208",
        background: atTop
          ? "#faf6f1"
          : "rgba(250,246,241,0.92)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        transform: visible
          ? "translateY(0)"
          : "translateY(-100%)",
        transition:
          "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-4 md:py-5 flex justify-between items-center">

        <Link href="/">
          <h1
            style={{
              fontFamily:
                "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 4vw, 22px)",
              fontWeight: 300,
              letterSpacing: "0.35em",
              color: "#c4724a",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.opacity =
                "0.75")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.opacity =
                "1")
            }
          >
            BEAUTY STORE
          </h1>
        </Link>

        <div
          className="flex items-center gap-3 md:gap-10"
          style={{
            fontSize: "10px",
            letterSpacing: "0.18em",
            color: "#a08878",
          }}
        >
          {[
            ["INICIO", "/"],
            ["PRODUCTOS", "/products"],
            ["ADMIN", "/admin"],
            [`CARRITO (${totalItems})`, "/cart"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              style={{
                color: "#a08878",
                position: "relative",
                transition:
                  "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "#c4724a")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "#a08878")
              }
            >
              {label}
            </Link>
          ))}
        </div>

      </div>
    </nav>
  );
}