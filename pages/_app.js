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
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/icon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/icon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/icons/favicon-32x32.png" />
        <meta name="theme-color" content="#5348dc" />
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
