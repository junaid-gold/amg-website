import React from "react";
import OrderView from "./order.view";
import { OrderItem } from "@/types";

interface OrdersProps {
  items: OrderItem[]
}

const Orders = ({ items }: OrdersProps) => {
  return <OrderView orderItems={items} />;
};

export default Orders;
