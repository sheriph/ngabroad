import { makeStyles } from "@material-ui/core";
import React from "react";
import ArticleComponent from "../component/articlecomponent";

import { SleekTheme } from "../component/themes";

const styles = makeStyles((theme) => ({

}));

export default function () {
  return (
    <SleekTheme
      subtitle="by category"
      title="Collection of interesting articles"
      jsx={<ArticleComponent />}
      pageTitle = "Articles"
    />
  );
}
