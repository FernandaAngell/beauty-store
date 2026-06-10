async function getOrders() {
  const res = await fetch(
    "https://beauty-store-ea6m.onrender.com/orders",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function OrdersPage() {
  const orders = await getOrders();

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
        Pedidos
      </h1>

      <div className="space-y-6">

        {orders.map((order: any) => (
          <div
            key={order.id}
            style={{
              background: "#fff9f5",
              border: "1px solid #e8ddd4",
              padding: "24px",
              borderRadius: "12px",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                color: "#2e1e16",
                marginBottom: "8px",
              }}
            >
              Pedido #{order.id}
            </h2>

            <p style={{ color: "#9a7e72" }}>
              Cliente: {order.customer}
            </p>

            <p style={{ color: "#9a7e72" }}>
              Total: $
              {order.total.toLocaleString()}
            </p>

            <p style={{ color: "#9a7e72" }}>
              Productos:
            </p>

            <ul className="mt-2">
              {order.items.map((item: any) => (
                <li
                  key={item.id}
                  style={{
                    color: "#2e1e16",
                    marginBottom: "4px",
                  }}
                >
                  {item.name} x{item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>
    </section>
  );
}