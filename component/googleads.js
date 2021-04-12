// @ts-nocheck
import { useEffect } from "react";

const GoogleAds = () => {
  const isScriptLoaded = (url) => {
    let scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i].src === url) return true;
    }
    return false;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      if (!isScriptLoaded(url)) {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script["data-ad-client"] = "ca-pub-9023491735769338";
        script.src = url;
        document.head.prepend(script);

        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    }
  }, [null]);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", textAlign: "center" }}
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client="ca-pub-9023491735769338"
      data-ad-slot="8519630377"
    ></ins>
  );
};

export default GoogleAds;
