import axios from "axios";
import React from "react";
import { SleekTheme } from "../component/themes";
import ThreadComponent from "../component/threadcomponent";
import { useRecoilState } from "recoil";
import { showLogin_ } from "../state/recoil";
import LoginWrapper from "../component/loginwrapper";

const Thread = ({ post }) => {
  const [showLogin, setShowLogin] = useRecoilState(showLogin_);

  if (showLogin) {
    return <LoginWrapper setShowLogin={setShowLogin} />;
  }
  return (
    <SleekTheme
      subtitle="Get in touch"
      title="We love to hear from you"
      jsx={<ThreadComponent post={post} />}
      pageTitle="Contact US"
      pageDesc="Contact US page"
      pageUrl="http://naijagoingabroad.com/contactus"
      page={true}
      isAmp={undefined}
    />
  );
};

export default Thread;

export const getStaticPaths = async () => {
  try {
    const fetching = await fetch("http://localhost:3000/api/getpaths");
    const slugs = await fetching.json();
    const paths = slugs.map((slug) => ({ params: { pid: slug.slug } }));
    //  console.log("slugs", paths);
    return { paths, fallback: "blocking" };
  } catch (error) {
    console.log("error catched", error);
  }
};

export async function getStaticProps({ params }) {
  try {
    const fetching = await fetch("http://localhost:3000/api/getsinglepost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug: params.pid,
      }),
    });
    const post = await fetching.json();
    /*     const post = await axios.post("/api/getsinglepost", {
      slug: params.pid,
    }); */
    if (!post) {
      return {
        notFound: true,
      };
    }
    return { props: { post }, revalidate: 60 };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
}
