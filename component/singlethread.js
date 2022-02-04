import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
} from "@mui/material";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import FileOpenOutlinedIcon from "@mui/icons-material/FileOpenOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import dynamic from "next/dynamic";
import AddIcon from "@mui/icons-material/Add";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import ForumPostContent from "./forumpostcontent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { lowerCase, startCase } from "lodash";
import axios from "axios";
import useSWRImmutable from "swr/immutable";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { generateId } from "./utilityfx";
import { useRecoilState, useRecoilValue } from "recoil";
import { showLogin_, userData_, user_ } from "../state/recoil";

const RichEditor = dynamic(() => import("./richeditor"), {
  ssr: false,
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SingleThread({ post }) {
  const [expanded, setExpanded] = React.useState(false);
  const [expandedIndex, setExpandedIndex] = React.useState(10000000);
  const [editor, showEditor] = React.useState(false);
  const [isloading, setLoading] = React.useState(false);
  const [islikesLoading, setislikesLoading] = React.useState(false);
  const [isdislikesLoading, setisdislikesLoading] = React.useState(false);
  const [showLogin, setShowLogin] = useRecoilState(showLogin_);
  const user = useRecoilValue(user_);
  const userData = useRecoilValue(userData_);

  React.useEffect(() => {
    if (window !== undefined) showEditor(true);
  }, [null]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleSetExpandIndex = (index) => {
    if (expandedIndex !== 10000000) {
      setExpandedIndex(10000000);
    } else {
      setExpandedIndex(index);
    }
  };

  const { discussionThread } = post;

  const [myThread, setThread] = React.useState(discussionThread);

  console.log("discussionThread", discussionThread, post);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const handleComment = async (data) => {
    try {
      console.log("data", data);
      if (data.Description.length < 10) {
        toast.error("Comment is too short");
        return;
      }
      const comment = {
        author: {
          ...userData,
        },
        date: new Date(),
        content: data.Description,
        title: discussionThread[0].title,
        likesCount: 0,
        dislikesCount: 0,
        id: generateId(),
      };
      setLoading(true);
      await axios.post("/api/updatecommentandthread", {
        email: userData.email,
        comment: comment,
        slug: post.slug,
      });
      setThread([...myThread, comment]);
      handleExpandClick();
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      toast.error("Error : Check your network");
      setLoading(false);
    }
  };

  const handleReply = async (data, postReplied) => {
    try {
      console.log("data", data);
      if (data.Description.length < 10) {
        toast.error("Comment is too short");
        return;
      }
      const comment = {
        author: {
          ...userData,
        },
        date: new Date(),
        content: data.Description,
        title: discussionThread[0].title,
        likesCount: 0,
        dislikesCount: 0,
        postReplied: postReplied,
        id: generateId(),
      };
      setLoading(true);
      await axios.post("/api/updatecommentandthread", {
        email: userData.email,
        comment: comment,
        slug: post.slug,
      });
      setThread([...myThread, comment]);
      setExpandedIndex(10000000);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      toast.error("Error : Check your network");
      setLoading(false);
    }
  };

  const handleLikesCount = async (postId, commentId, currentCount, index) => {
    try {
      if (!userData) {
        toast.error("Please sign in to like post/comment");
        return;
      }
      setislikesLoading(true);
      const response = await axios.post("/api/updatelikes", {
        postId,
        commentId,
        currentCount,
        email: userData.email,
      });
      console.log("response", response);
      const updateThread = myThread;
      console.log("updateThread", updateThread);
      updateThread[index] = {
        ...updateThread[index],
        likesCount: currentCount + 1,
      };
      console.log("updateThread", updateThread);
      setThread([...updateThread]);
      setislikesLoading(false);
    } catch (error) {
      console.log("error with likes", error);
      // toast.error("Network Error");
      setislikesLoading(false);
    }
  };

  const handleDislikesCount = async (
    postId,
    commentId,
    currentCount,
    index
  ) => {
    console.log("first", postId, commentId, currentCount, index);
    try {
      if (!userData) {
        toast.error("Please sign in to like post/comment");
        return;
      }
      setisdislikesLoading(true);
      const response = await axios.post("/api/updatedislikes", {
        postId,
        commentId,
        currentCount,
        email: userData.email,
      });
      console.log("response", response);
      const updateThread = myThread;
      console.log("updateThread", updateThread);
      updateThread[index] = {
        ...updateThread[index],
        dislikesCount: currentCount + 1,
      };
      console.log("updateThread", updateThread);
      setThread([...updateThread]);
      setisdislikesLoading(false);
    } catch (error) {
      console.log("error with likes", error);
      //toast.error("Network Error");
      setisdislikesLoading(false);
    }
  };

  console.log("myThread", myThread);

  return (
    <Stack spacing={1}>
      {myThread.map(
        (
          {
            author,
            date,
            content,
            title,
            postReplied,
            likesCount,
            dislikesCount,
            id,
          },
          index
        ) => {
          return (
            <Card key={index} sx={{}}>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: "primary.main" }}
                    src={
                      // @ts-ignore
                      author?.avatar
                    }
                  >
                    {
                      // @ts-ignore
                      author.email &&
                        // @ts-ignore
                        author?.email.slice(0, 1).toUpperCase()
                    }
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <ShareIcon />
                  </IconButton>
                }
                title={startCase(lowerCase(author.username))}
                subheader={dayjs(date).format("MMM DD, YYYY | hh:mma")}
              />
              <CardContent>
                <Typography component="h1" variant="h5" gutterBottom>
                  {index === 0 ? title : `Re: ${title}`}
                </Typography>

                <Stack spacing={2}>
                  <ForumPostContent
                    content={postReplied}
                    postReplied={Boolean(postReplied)}
                  />
                  <ForumPostContent content={content} />
                </Stack>
              </CardContent>
              <CardActions
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  {islikesLoading ? (
                    <CircularProgress size={25} color="primary" />
                  ) : (
                    <IconButton
                      onClick={() =>
                        handleLikesCount(post.id, id, likesCount, index)
                      }
                    >
                      <Badge
                        anchorOrigin={{ horizontal: "left", vertical: "top" }}
                        badgeContent={likesCount}
                        color="primary"
                      >
                        <ThumbUpOffAltOutlinedIcon color="action" />
                      </Badge>
                    </IconButton>
                  )}
                  {isdislikesLoading ? (
                    <CircularProgress size={25} color="primary" />
                  ) : (
                    <IconButton
                      onClick={() =>
                        handleDislikesCount(post.id, id, dislikesCount, index)
                      }
                    >
                      <Badge
                        anchorOrigin={{ horizontal: "left", vertical: "top" }}
                        badgeContent={dislikesCount}
                        color="primary"
                      >
                        <ThumbDownOutlinedIcon color="action" />
                      </Badge>
                    </IconButton>
                  )}
                </Stack>
                {index !== 0 && (
                  <Button
                    onClick={() => handleSetExpandIndex(index)}
                    component={Box}
                    startIcon={<ReplyIcon />}
                    endIcon={
                      <ExpandMore
                        expand={expandedIndex === index}
                        aria-expanded={expandedIndex === index}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    }
                  >
                    Reply
                  </Button>
                )}
              </CardActions>
              <Collapse
                in={expandedIndex === index}
                timeout="auto"
                unmountOnExit
              >
                <CardContent
                  onSubmit={handleSubmit((data) => handleReply(data, content))}
                  component="form"
                >
                  {editor && user ? (
                    <Stack alignItems="center">
                      {userData ? (
                        <Stack>
                          <Controller
                            name="Description"
                            defaultValue=""
                            control={control}
                            render={({ value, onChange }) => {
                              return (
                                <RichEditor value={value} onChange={onChange} />
                              );
                            }}
                          />
                          <Button
                            endIcon={
                              isloading ? (
                                <CircularProgress color="inherit" />
                              ) : (
                                ""
                              )
                            }
                            disabled={isloading}
                            type="submit"
                            disableElevation
                            fullWidth
                            variant="contained"
                          >
                            SUBMIT
                          </Button>
                        </Stack>
                      ) : (
                        <CircularProgress size={60} color="primary" />
                      )}
                    </Stack>
                  ) : (
                    <Button
                      startIcon={<AccountCircleIcon />}
                      onClick={() => setShowLogin(true)}
                    >
                      PLEASE LOGIN TO COMMENT
                    </Button>
                  )}
                </CardContent>
              </Collapse>
            </Card>
          );
        }
      )}
      <Stack
        component="form"
        onSubmit={handleSubmit(handleComment)}
        sx={{ backgroundColor: "background.paper" }}
      >
        <Box sx={{}}>
          <Button
            sx={{}}
            onClick={handleExpandClick}
            fullWidth
            variant="outlined"
          >
            ADD COMMENT
          </Button>
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ px: 0 }}>
            <Stack>
              {editor && user ? (
                <Stack alignItems="center">
                  {userData ? (
                    <Stack>
                      <Controller
                        name="Description"
                        defaultValue=""
                        control={control}
                        render={({ value, onChange }) => {
                          return (
                            <RichEditor value={value} onChange={onChange} />
                          );
                        }}
                      />
                      <Button
                        endIcon={
                          isloading ? <CircularProgress color="inherit" /> : ""
                        }
                        disabled={isloading}
                        type="submit"
                        disableElevation
                        fullWidth
                        variant="contained"
                      >
                        SUBMIT
                      </Button>
                    </Stack>
                  ) : (
                    <CircularProgress size={60} color="primary" />
                  )}
                </Stack>
              ) : (
                <Button
                  startIcon={<AccountCircleIcon />}
                  onClick={() => setShowLogin(true)}
                >
                  PLEASE LOGIN TO COMMENT
                </Button>
              )}
            </Stack>
          </CardContent>
        </Collapse>
      </Stack>
    </Stack>
  );
}

/* const cont = `This impressive paella is a perfect party dish and a fun meal to
cook together with your guests. Add 1 cup of frozen peas along
with the mussels, if you like. This impressive paella is a
perfect party dish and a fun meal to cook together with your
guests. Add 1 cup of frozen peas along with the mussels, if you
like.`;

const title = `How To Live and Work in Japan`;

const thread = [
  {
    author: "Adeniyi Sheriff",
    createdAt: new Date(),
    content: cont,
    title: title,
  },
]; */
