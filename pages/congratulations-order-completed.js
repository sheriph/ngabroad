import React from "react";
import { SleekTheme } from "../component/themes";
import OrderSuccess from "../component/ordersuccess";
import { useRecoilState } from "recoil";
import { showLogin_ } from "../state/recoil";
import LoginWrapper from "../component/loginwrapper";

export default function () {
  
  const [showLogin, setShowLogin] = useRecoilState(showLogin_);

  if (showLogin) {
    return <LoginWrapper setShowLogin={setShowLogin} />;
  }
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
