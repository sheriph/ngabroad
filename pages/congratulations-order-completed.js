import React from "react";
import { SleekTheme } from "../component/themes";
import OrderSuccess from "../component/ordersuccess";

export default function () {
  return (
    <SleekTheme
      subtitle="Congratulations !!!"
      title=""
      jsx={<OrderSuccess />}
      pageTitle="Order Completed"
      page={true}
      pageUrl="http://naijagoingabroad.com/congratulations-order-completed"
      pageDesc="Order success acknowledgement page"
      seo
      isAmp={undefined}
    />
  );
}
