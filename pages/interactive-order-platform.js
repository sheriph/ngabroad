// @ts-nocheck
import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Footer from "../component/footer";
import { SleekTheme } from "../component/themes";
import Homepage from "../component/homepagecomponent";
import Order from "../component/order";

const styles = makeStyles((theme) => ({
  baseContainer: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function OrderPage() {
  return (
    <SleekTheme
      subtitle="Order Now"
      title="Order your travel documents online"
      jsx={<Order />}
      pageTitle="Documents Order"
      page={true}
      pageDesc="Order your travel documents here"
      pageUrl="http://naijagoingabroad.com/interactive-order-platform"
    />
  );
}
