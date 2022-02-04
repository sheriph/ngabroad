import React, { useEffect } from "react";
import { Container } from "@mui/material";
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
import { isDialogOpen_, userData_, user_ } from "../state/recoil";
import { Auth } from "aws-amplify";
import useSWR from "swr";
import axios from "axios";
import useSWRImmutable from "swr/immutable";

export const SleekTheme = ({
  pageTitle = "",
  jsx = <></>,
  title = "",
  subtitle = "",
  seo = null,
  page = null,
  pageDesc = "",
  pageUrl = "",
  isAmp,
}) => {
  // const classes = styles();

  const [cookies, setCookie] = useCookies(["ngabroadoptin"]);
  const [isModalOpen, setModalOpen] = useRecoilState(isDialogOpen_);
  const [user, setUser] = useRecoilState(user_);
  const [userData, setUserData] = useRecoilState(userData_);

  useEffect(() => {
    if (!cookies.ngabroadoptin) {
      setTimeout(() => {
        setModalOpen(true);
        setCookie(
          "ngabroadoptin",
          JSON.stringify(Math.ceil(Math.random() * 1000 + 1000)),
          {
            maxAge: 172800,
            sameSite: true,
            path: "/",
          }
        );
      }, 30000);
    }
  }, [null]);

  async function fetchUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
    } catch (error) {
      console.log("error getting user: ", error);
      throw new Error(error);
    }
  }

  const fetchUserData = async (email) => {
    try {
      console.log(`fetching with email `, email);
      const userData = await axios.post("/api/getuserdata", { email });
      console.log(`userData`, userData);
      setUserData(userData.data);
      return userData.data;
    } catch (error) {
      console.log(`error`, error);
    }
  };

  const { data, error } = useSWR("1", fetchUser, {
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnMount: true,
    revalidateOnReconnect: true,
    errorRetryCount: 2,
    onError: (error) => {
      console.log("error", error);
      setUser(null);
    },
  });

  const email = user?.attributes?.email;
  const { data: userDataReceived, error: userDataError } = useSWRImmutable(
    email,
    fetchUserData
  );

  return (
    <React.Fragment>
      {page ? (
        // @ts-ignore
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
                url: "/images/icon32.png",
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
          title={seo?.title || ""}
          titleTemplate="%s | NGabroad"
          description={seo?.metaDesc || ""}
          canonical={seo?.canonical || ""}
          openGraph={{
            url: `${seo?.opengraphUrl || ""}`,
            type: "website",
            locale: "en_NG",
            title: `${seo?.opengraphTitle || ""}`,
            description: `${seo?.opengraphDescription || ""}`,
            images: [
              {
                url: `${seo?.opengraphImage?.sourceUrl || ""}`,
                alt: `${seo?.opengraphImage?.altText || ""}`,
              },
            ],
            site_name: `${seo?.opengraphSiteName || ""}`,
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
        sx={{
          backgroundColor: "primary.main",
        }}
        disableGutters
        maxWidth={false}
      >
        {isAmp ? <AmpHeader /> : <MyHeader />}
      </Container>
      <Container>{jsx}</Container>
      <Container
        sx={{
          backgroundColor: "primary.main",
        }}
        disableGutters
        maxWidth={false}
      >
        <Footer isAmp={isAmp} />
      </Container>
      {!isAmp && (
        <Modal
          // @ts-ignore
          jsx={<Newsletter />}
        />
      )}
    </React.Fragment>
  );
};
