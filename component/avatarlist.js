// @ts-nocheck
import {
  Avatar,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

const AvatarList = ({
  primaryText = "",
  secondaryText = "",
  imgSrc = "",
  avatarStyle,
  listChildren = <></>,
  variant = "rounded",
}) => {
  return (
    <Container disableGutters>
      <Grid container>
        <Grid item xs={12}>
          <List>
            <ListItem>
              <ListItemAvatar sx={{}}>
                <Avatar
                  children={listChildren}
                  style={avatarStyle}
                  alt="schoollogo"
                  src={imgSrc}
                  variant={variant}
                />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography>{primaryText}</Typography>}
                secondary={
                  <Typography variant="caption">{secondaryText}</Typography>
                }
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AvatarList;
