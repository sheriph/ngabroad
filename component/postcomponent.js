// @ts-nocheck
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import BlogCard from "./blogcard";

const styles = makeStyles((theme) => ({
  root: {
    img: {
      //   width: "100%",
    },
    "&.MuiBox-root img": {
      width: "100%",
      height: "auto",
      position: "relative",
      transform: "translateX(-50%)",
      left: "50%",

      //  maxHeight: "300px",
    },
    "&.MuiBox-root a": {
      display: "inline-block !important",
      // overflow: "scroll",
    },
  },
}));

const SinglePost = (props) => {
  const classes = styles();
  // console.log(post);

  const { content, relatedPosts, isAmp } = props;
  // console.log(content);
  let renderContent = "";

  if (isAmp && content) {
    let imgFinder = /<img([\w\W]+?)[\/]?>/;
    let matches = content.match(imgFinder);
    // console.log("matches", matches)
    let filteredMatch = matches.filter((item) => item.includes("<img"));
    console.log("filteredMatch", filteredMatch);
    filteredMatch.forEach((item) => {
      renderContent = item.replace(
        item,
        `<i-amphtml-sizer-intrinsic>${item}</i-amphtml-sizer-intrinsic>`
      );
    });
  }
  // console.log("content", content);

  return (
    <Container disableGutters style={{ marginTop: "20px" }}>
      <Grid container>
        <Grid item xs={12}>
          <Box
            className={classes.root}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Grid>

        <Grid
          item
          container
          spacing={5}
          style={{ marginTop: "30px", marginBottom: "40px" }}
          justify="center"
        >
          {relatedPosts.length > 0 && (
            <Grid item xs={12}>
              <Typography align="center">Related Posts</Typography>
            </Grid>
          )}
          {relatedPosts.map((post, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <BlogCard isAmp={isAmp} post={post} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SinglePost;
