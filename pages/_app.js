// @ts-nocheck
import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import { RecoilRoot } from "recoil";
import "firebase/firestore";
import "firebase/auth";
import { Fuego, FuegoProvider } from "@nandorojo/swr-firestore";
import { SnackbarProvider } from "notistack";
import { useAmp } from "next/amp";

const firebaseConfig = {
  apiKey: "AIzaSyDnWq5tSHBtRn7Y83WyNHzZoIqY0xpCBzQ",
  authDomain: "ngabroad-f348c.firebaseapp.com",
  projectId: "ngabroad-f348c",
  storageBucket: "ngabroad-f348c.appspot.com",
  messagingSenderId: "1035539676049",
  appId: "1:1035539676049:web:bb175380d94dca1b2af830",
  measurementId: "G-6S1V47J894",
};

const fuego = new Fuego(firebaseConfig);

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const isAmp = useAmp();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {!isAmp && (
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        )}

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/icon16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/icon32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link
          href="/icons/icon72.png"
          rel="icon"
          type="image/png"
          sizes="72x72"
        />
        <meta name="theme-color" content="#5348dc" />

        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/icons/appleIcons/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/icons/appleIcons/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/icons/appleIcons/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/icons/appleIcons/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/icons/appleIcons/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/icons/appleIcons/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/icons/appleIcons/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/appleIcons/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/appleIcons/apple-icon-180x180.png"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/icons/appleIcons/ms-icon-144x144.png"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <RecoilRoot>
            <CssBaseline />
            <FuegoProvider fuego={fuego}>
              <Component {...pageProps} />
            </FuegoProvider>
          </RecoilRoot>
        </SnackbarProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
