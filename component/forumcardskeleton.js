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
import { Badge, Box, Button, Skeleton, Stack } from "@mui/material";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import FileOpenOutlinedIcon from "@mui/icons-material/FileOpenOutlined";

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

export default function ForumCardSkeleton() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{}}>
      <CardHeader
        avatar={
          <Skeleton variant="circular">
            <Avatar sx={{}} aria-label="recipe">
              R
            </Avatar>
          </Skeleton>
        }
        action={
          <IconButton aria-label="settings">
            <ShareIcon />
          </IconButton>
        }
        title={<Skeleton sx={{ width: "100px" }} variant="text"></Skeleton>}
        subheader={<Skeleton sx={{ width: "150px" }} variant="text"></Skeleton>}
      />
      <Stack sx={{ px: 2 }}>
        <Skeleton sx={{ width: "300px" }} variant="text"></Skeleton>
      </Stack>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton>
            <Badge
              anchorOrigin={{ horizontal: "left", vertical: "top" }}
              badgeContent={0}
              color="primary"
            >
              <ThumbUpOffAltOutlinedIcon color="action" />
            </Badge>
          </IconButton>
          <IconButton>
            <Badge
              anchorOrigin={{ horizontal: "left", vertical: "top" }}
              badgeContent={0}
              color="primary"
            >
              <ThumbDownOutlinedIcon color="action" />
            </Badge>
          </IconButton>
          <IconButton>
            <Badge badgeContent={0} color="primary">
              <CommentOutlinedIcon color="action" />
            </Badge>
          </IconButton>
        </Stack>
        <Button
          color="inherit"
          onClick={handleExpandClick}
          endIcon={<FileOpenOutlinedIcon />}
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}
