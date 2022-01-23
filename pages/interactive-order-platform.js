import React from "react";
import { SleekTheme } from "../component/themes";
import Order from "../component/order";

export default function OrderPage() {
  const [selectedOrders, setOrderSelected] = React.useState(null);
  console.log("selectedOrders", selectedOrders);

  return (
    <SleekTheme
      subtitle="Order Now"
      title="Order your travel documents online"
      jsx={<Order />}
      pageTitle="Documents Order"
      page={true}
      pageDesc="Order your travel documents here"
      pageUrl="http://naijagoingabroad.com/interactive-order-platform"
      isAmp={undefined}
    />
  );
}
