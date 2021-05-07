// @ts-nocheck
import React from "react";
import { SleekTheme } from "../component/themes";
import { SnackbarProvider } from "notistack";
import { useAmp } from "next/amp";
import VisaEligibilityComponent from "../component/visaeligibilityComponent";

export const config = { amp: false };

export default function VisaEligibilityTest() {
  const isAmp = useAmp();

  return (
    <SnackbarProvider maxSnack={3}>
      <SleekTheme
        isAmp={isAmp}
        subtitle="Check your eligibility for visa"
        title="Visa Eligibility Test"
        jsx={<VisaEligibilityComponent isAmp={isAmp} />}
        pageTitle="Visa Eligibility Test"
        pageDesc="Visa Eligibility Test"
        pageUrl="http://naijagoingabroad.com/visa-eligibility-test"
        page={true}
        seo
      />
    </SnackbarProvider>
  );
}
