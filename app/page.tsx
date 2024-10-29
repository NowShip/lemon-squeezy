import DownloadFiles from "@/components/download-files";
import { getAllTheOrders, getFiles, getListAllProducts } from "@/lib/action";
import Image from "next/image";

export default async function Home() {
  const product = await getListAllProducts();

  console.log(product.data.data);

  return (
    <div className="py-4">
      <div className="max-w-3xl mx-auto grid grid-cols-3 gap-4">
        {product.data.data
          .filter((product) => product.attributes.status !== "pending")
          .map((product) => (
            <div key={product.id}>
              <Image
                src={product.attributes.large_thumb_url || ""}
                alt={product.attributes.name}
                width={400}
                height={400}
                className="rounded-lg mb-4"
              />
              <h3 className="text-4xl font-bold mb-4">
                {product.attributes.price_formatted}
              </h3>
              <h2 className="text-xl font-bold">{product.attributes.name}</h2>
              <p className="text-sm">
                {product.attributes.description
                  .replace("<p>", "")
                  .replace("</p>", "")}
              </p>
              <Orders productId={product.id} />
              <a href={product.attributes.buy_now_url} target="_blank">
                Buy now
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}

async function Orders({ productId }: { productId: string }) {
  const orders = await getAllTheOrders({ email: "alirs.dev@gmail.com" });

  const order = orders.data.data.find(
    (order) =>
      order.attributes.first_order_item.product_id === Number(productId)
  );

  return (
    <div>
      {order ? (
        <DownloadFiles
          variantId={order.attributes.first_order_item.variant_id.toString()}
        />
      ) : (
        "YOU HAVE TO BUY NOW"
      )}
    </div>
  );
}
