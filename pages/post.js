
import { makeStyles } from "@material-ui/core";
import React from "react";
import SinglePost from "../component/postcomponent";
import { SleekTheme } from "../component/themes";


const styles = makeStyles((theme) => ({

}));



export default function () {
  return (
    <SleekTheme
      subtitle="Events"
      title="How tom plan a wedding in Lagos"
      jsx={<SinglePost />}
      pageTitle="How tom plan a wedding in Lagos"
    />
  );
}
