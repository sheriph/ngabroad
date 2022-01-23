// @ts-nocheck
import {
  Button,
  ButtonBase,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import {
  BookmarkBorderOutlined,
  LanguageOutlined,
  LocationOnOutlined,
  ScheduleOutlined,
  SchoolOutlined,
} from "@mui/icons-material";
import React from "react";
import AvatarList from "./avatarlist";
import { makeStyles } from "@mui/styles";

const styles = makeStyles(() => ({
  avatar: {
    width: "50px",
    height: "50px",
  },
}));

const ResultCard = ({ result }) => {
  const {
    applicationFee,
    country,
    description,
    selection6: durationLevel,
    level: field,
    location,
    selection4_name: title,
    selection5: tuitionFee,
    uni_contact,
    uni_image: logo,
    uni_name,
  } = result;
  return <>
    <Container disableGutters style={{ padding: "1px" }}>
      <Paper style={{ cursor: "pointer" }}>
        <Grid container justifyContent="center">
          <AvatarList
            primaryText={title}
            secondaryText={uni_name}
            imgSrc={logo}
            avatarStyle={{
              width: "60px",
              height: "60px",
              marginRight: "5px",
            }}
            listChildren={<SchoolOutlined />}
            variant="rounded"
          />
        </Grid>
        <Grid container>
          {durationLevel && (
            <Grid item>
              <ButtonBase
                centerRipple
                style={{ textTransform: "none" }}
                component={Button}
                startIcon={<BookmarkBorderOutlined color="primary" />}
              >
                {durationLevel}
              </ButtonBase>
            </Grid>
          )}
          {location && (
            <Grid item>
              <ButtonBase
                centerRipple
                style={{ textTransform: "none" }}
                component={Button}
                startIcon={<LocationOnOutlined color="primary" />}
              >
                {location}
              </ButtonBase>
            </Grid>
          )}

          {tuitionFee && (
            <Grid item>
              <ButtonBase
                centerRipple
                style={{ textTransform: "none" }}
                component={Button}
                startIcon={<LanguageOutlined color="primary" />}
              >
                {tuitionFee}
              </ButtonBase>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  </>;
};

export default ResultCard;
