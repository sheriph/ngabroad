import React from "react";
import DiscussionComponent from "../component/discussioncomponent";
import { SleekTheme } from "../component/themes";
import { useRecoilState } from "recoil";
import { showLogin_ } from "../state/recoil";
import LoginWrapper from "../component/loginwrapper";
import CreatePostComponent from "../component/createtopiccomponent";

const CreatePost = () => {
  const [showLogin, setShowLogin] = useRecoilState(showLogin_);

  if (showLogin) {
    return <LoginWrapper setShowLogin={setShowLogin} />;
  }
  return (
    <SleekTheme
      subtitle="Get in touch"
      title="We love to hear from you"
      jsx={<CreatePostComponent />}
      pageTitle="Contact US"
      pageDesc="Contact US page"
      pageUrl="http://naijagoingabroad.com/createpost"
      page={true}
      isAmp={undefined}
    />
  );
};

export default CreatePost;
