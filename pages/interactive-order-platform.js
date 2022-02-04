import React from "react";
import { SleekTheme } from "../component/themes";
import Order from "../component/order";
import { useRecoilState } from "recoil";
import { showLogin_ } from "../state/recoil";
import LoginWrapper from "../component/loginwrapper";

export default function OrderPage() {

  const [showLogin, setShowLogin] = useRecoilState(showLogin_);

  if (showLogin) {
    return <LoginWrapper setShowLogin={setShowLogin} />;
  }
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
