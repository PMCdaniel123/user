import { getOrders } from "@/lib/actions/actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

const Orders = async () => {
  const { userId } = auth();
  const orders = await getOrders(userId as string);

  return (
    <div className="p-20">
      <p className="text-heading1-bold text-center text-primary mb-12">
        Your Orders
      </p>

      {!orders ||
        (orders.length === 0 && (
          <p className="text-body-bold my-5">You have no orders yet.</p>
        ))}

      <div className="flex flex-col gap-10 text-primary">
        {orders?.map((order: OrderType) => (
          <div
            key={order._id}
            className="flex flex-col gap-8 p-10 hover:bg-quaternary rounded-lg"
          >
            <div className="flex text-heading4-bold gap-20 max-md:flex-col max-md:gap-3">
              <p>Order ID: {order._id}</p>
              <p>Total Amount: ${order.totalAmount}</p>
            </div>

            <div className="flex flex-col gap-5">
              {order.products.map((orderItem: OrderItemType, index) => (
                <div key={index}>
                  <div className="flex gap-4">
                    <Image
                      src={orderItem.product.media[0]}
                      alt={orderItem.product.title}
                      width={100}
                      height={100}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex flex-col justify-between">
                      <p className="text-small-medium">
                        Title:{" "}
                        <span className="text-small-bold">
                          {orderItem.product.title}
                        </span>
                      </p>
                      {orderItem.color && (
                        <p className="text-small-medium">
                          Color:{" "}
                          <span className="text-small-bold">
                            {orderItem.color}
                          </span>
                        </p>
                      )}
                      {orderItem.size && (
                        <p className="text-small-medium">
                          Size:{" "}
                          <span className="text-small-bold">
                            {orderItem.size}
                          </span>
                        </p>
                      )}
                      <p className="text-small-medium">
                        Unit Price:{" "}
                        <span className="text-small-bold">
                          {orderItem.product.price}
                        </span>
                      </p>
                      <p className="text-small-medium">
                        Quantity:{" "}
                        <span className="text-small-bold">
                          {orderItem.quantity}
                        </span>
                      </p>
                    </div>
                  </div>
                  <hr className="w-full text-primary mt-4" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

export const dynamic = "force-dynamic";
