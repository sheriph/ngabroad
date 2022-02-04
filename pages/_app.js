import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";
import { useAmp } from "next/amp";
import { ToastContainer } from "react-toastify";
import "../src/gobal.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const isAmp = useAmp();

  /*   function signOut() {
    Auth.signOut()
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log("error: cant signout", err);
      });
  } */

  /*   async function getUser() {
    try {
      const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
      setUser(user);
    } catch (error) {
      console.log("error getting user: ", error);
    }
  } */

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {!isAmp && (
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        )}

        {!isAmp && (
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-9ZDV1TKBLS"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9ZDV1TKBLS', {
              page_path: window.location.pathname,
            });
            `,
              }}
            />
          </>
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

      <CookiesProvider>
        <RecoilRoot>
          <ToastContainer />
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </RecoilRoot>
      </CookiesProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
