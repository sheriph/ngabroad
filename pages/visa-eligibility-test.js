// @ts-nocheck
import React from "react";
import { SleekTheme } from "../component/themes";
import { useAmp } from "next/amp";
import { Box, Container, Typography } from "@mui/material";

export const config = { amp: false };

export default function VisaEligibilityTest() {
  const isAmp = useAmp();

  return (
    <SleekTheme
      isAmp={isAmp}
      subtitle="Check your eligibility for visa"
      title="Visa Eligibility Test"
      jsx={
        <Container sx={{height:"500px", pt:5}}>
          <Typography variant="h5">UNDER MAINTENANCE</Typography>
          <Typography variant="h5">PLEASE CHECK BACK LATER</Typography>
        </Container>
      }
      pageTitle="Visa Eligibility Test"
      pageDesc="Visa Eligibility Test"
      pageUrl="http://naijagoingabroad.com/visa-eligibility-test"
      page={true}
      seo
    />
  );
}
