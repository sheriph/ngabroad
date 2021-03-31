// @ts-nocheck
import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import { SleekTheme } from "../component/themes";
import OrderSuccess from "../component/ordersuccess";

const styles = makeStyles((theme) => ({
  baseContainer: {
    backgroundColor: theme.palette.primary.main,
  },
}));

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
    />
  );
}
