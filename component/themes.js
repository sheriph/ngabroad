// @ts-nocheck
import React from "react";
import MyHeader from "./header";
import { Container, makeStyles } from "@material-ui/core";
import Footer from "./footer";
import IntroHeader from "./introheader";
import { NextSeo } from "next-seo";

const styles = makeStyles((theme) => ({
  baseContainer: {
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
}) => {
  const classes = styles();

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
        <MyHeader />
        <IntroHeader title={title} subtitle={subtitle} />
      </Container>
      <Container>{jsx}</Container>
      <Container
        className={classes.baseContainer}
        disableGutters
        maxWidth={false}
      >
        <Footer />
      </Container>
    </React.Fragment>
  );
};
