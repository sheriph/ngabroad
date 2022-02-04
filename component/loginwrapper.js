import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
import awsExports from "../src/aws-exports";
import Amplify, { Auth } from "aws-amplify";
import { useRecoilState } from "recoil";
import dynamic from "next/dynamic";
import { user_ } from "../state/recoil";
import { useEffect } from "react";
Amplify.configure({ ...awsExports, ssr: true });

export default function LoginWrapper({ setShowLogin }) {
  const [user, setUser] = useRecoilState(user_);
  const components = {
    Header() {
      const LoginHead = dynamic(() => import("../component/loginhead"));
      return <LoginHead setShowLogin={setShowLogin} />;
    },
  };

  useEffect(() => {
    let interval = setInterval(() => {
      if (window.document.getElementById("auth")) {
        setShowLogin(false);
      } else {
        console.log("not found auth element");
      }
    }, 500);

    return () => {
      console.log("unmounting auth element");
      clearInterval(interval);
    };
  }, []);

  return (
    <Authenticator
      variation="modal"
      components={components}
      // @ts-ignore
    >
      {({ signOut, user }) => {
        //   window.location.reload();
        return <div id="auth"></div>;
      }}
    </Authenticator>
  );
}
