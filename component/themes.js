// @ts-nocheck
import React, { useEffect } from "react";
//import MyHeader from "./header";
import { Container, makeStyles } from "@material-ui/core";
//import Footer from "./footer";
//import IntroHeader from "./introheader";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import AmpHeader from "./ampheader";
import Modal from "./modal";
import Newsletter from "./newsletter";
const MyHeader = dynamic(() => import("./header"));
const Footer = dynamic(() => import("./footer"));
const IntroHeader = dynamic(() => import("./introheader"));
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { isDialogOpen_ } from "../state/recoil";

//const NextSeo = import("next-seo");

const styles = makeStyles((theme) => ({
  baseContainer: {
    backgroundColor: theme.palette.primary.main,
  },
  ampheader: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export const SleekTheme = ({
  pageTitle = "",
  jsx = <></>,
  title = "",
  subtitle = "",
  seo = {},
  page = null,
  pageDesc = "",
  pageUrl = "",
  isAmp,
}) => {
  const classes = styles();

  const [cookies, setCookie] = useCookies(["optin"]);
  const [isModalOpen, setModalOpen] = useRecoilState(isDialogOpen_);

  useEffect(() => {
    console.log("running effect", cookies.optin);
    if (!cookies.optin) {
      console.log("running effect2", cookies.optin);
      setCookie(
        "optin",
        JSON.stringify(Math.ceil(Math.random() * 1000 + 1000)),
        {
          maxAge: 345600,
          sameSite: true,
          path: "/",
        }
      );
      setTimeout(() => {
        setModalOpen(true);
      }, 30000);
    }
  }, [null]);

  return (
    <React.Fragment>
      {page ? (
        <NextSeo
          title={pageTitle}
          titleTemplate="%s | NGabroad"
          description={pageDesc}
          openGraph={{
            url: { pageUrl },
            type: "website",
            locale: "en_NG",
            title: { pageTitle },
            description: { pageDesc },
            images: [
              {
                url: "/images/favicon32",
                alt: "favicon",
              },
            ],
            site_name: "NGabroad",
          }}
          twitter={{
            handle: "@ng_abroad",
            site: "@ng_abroad",
            cardType: "summary_large_image",
          }}
          //  additionalLinkTags={[
          //     {
          //       rel: "icon",
          //       href: "/images/favicon32.png",
          //      },
          //      ]}
        />
      ) : (
        <NextSeo
          title={seo.title || ""}
          titleTemplate="%s | NGabroad"
          description={seo.metaDesc || ""}
          canonical={seo.canonical || ""}
          openGraph={{
            url: `${seo.opengraphUrl || ""}`,
            type: "website",
            locale: "en_NG",
            title: `${seo.opengraphTitle || ""}`,
            description: `${seo.opengraphDescription || ""}`,
            images: [
              {
                url: `${seo.opengraphImage?.sourceUrl || ""}`,
                alt: `${seo.opengraphImage?.altText || ""}`,
              },
            ],
            site_name: `${seo.opengraphSiteName || ""}`,
          }}
          twitter={{
            handle: "@ng_abroad",
            site: "@ng_abroad",
            cardType: "summary_large_image",
          }}
          //  additionalLinkTags={[
          //     {
          //     rel: "icon",
          //        href: "/images/favicon32.png",
          //      },
          //     ]}
        />
      )}
      <Container
        className={classes.baseContainer}
        disableGutters
        maxWidth={false}
      >
        {isAmp ? <AmpHeader /> : <MyHeader />}
        <IntroHeader title={title} subtitle={subtitle} />
      </Container>
      <Container>{jsx}</Container>
      <Container
        className={classes.baseContainer}
        disableGutters
        maxWidth={false}
      >
        <Footer isAmp={isAmp} />
      </Container>
      {!isAmp && <Modal jsx={<Newsletter />} />}
    </React.Fragment>
  );
};
