import ProductCard from "../../components/ProductCard";

async function getProducts() {
  const res = await fetch("https://beauty-store-ea6m.onrender.com/products", { cache: "no-store" });
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <section className="page-enter max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-16">
      <p style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#c4724a", marginBottom: "8px" }}>
        COLECCIÓN
      </p>
      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(32px, 8vw, 42px)", fontWeight: 300,
        color: "#2e1e16", marginBottom: "48px"
      }}>
        Productos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-stretch">
      {products.map((product: any) => (
  <ProductCard
    key={product.id}
    id={product.id}
    name={product.name}
    price={product.price}
    image={product.image}
  />
))}
      </div>
    </section>
  );
}