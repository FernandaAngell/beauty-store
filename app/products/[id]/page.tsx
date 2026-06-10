import Link from "next/link";

async function getProduct(id: string) {
  const res = await fetch(
    `https://beauty-store-ea6m.onrender.com/products/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProduct(id);

  return (
    <section className="page-enter max-w-5xl mx-auto px-10 py-16">

      <Link
        href="/products"
        style={{
          fontSize: "12px",
          color: "#a08878",
          letterSpacing: "0.08em",
        }}
      >
        ← Volver al catálogo
      </Link>

      <div
        style={{
          marginTop: "24px",
          background: "#fff9f5",
          border: "1px solid #e8ddd4",
          borderRadius: "32px",
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,0.04)",
        }}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[420px] object-cover"
          />
        ) : (
          <div
            className="flex items-center justify-center"
            style={{
              height: "420px",
              background: "#f5ede8",
              color: "#a08878",
            }}
          >
            Sin imagen
          </div>
        )}

        <div className="p-10">

          <p
            style={{
              fontSize: "10px",
              letterSpacing: "0.25em",
              color: "#a08878",
              marginBottom: "12px",
            }}
          >
            BEAUTY STORE
          </p>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "52px",
              fontWeight: 300,
              color: "#2e1e16",
              lineHeight: 1.1,
            }}
          >
            {product.name}
          </h1>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "38px",
              color: "#c4724a",
              marginTop: "12px",
            }}
          >
            ${product.price.toLocaleString()}
          </p>

          <p
            style={{
              marginTop: "24px",
              color: "#9a7e72",
              fontSize: "13px",
              lineHeight: 1.9,
              letterSpacing: "0.04em",
            }}
          >
            Producto premium diseñado para resaltar tu belleza
            natural, ofreciendo calidad, elegancia y una
            experiencia excepcional en cada uso.
          </p>

          <button
            style={{
              marginTop: "32px",
              width: "100%",
              background: "#c4724a",
              color: "#faf6f1",
              border: "none",
              padding: "16px",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Agregar al carrito
          </button>

        </div>
      </div>

    </section>
  );
}