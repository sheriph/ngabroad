// @ts-nocheck
import {
  Button,
  ButtonBase,
  Container,
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";
import {
  BookmarkBorderOutlined,
  LanguageOutlined,
  LocationOnOutlined,
  ScheduleOutlined,
  SchoolOutlined,
} from "@material-ui/icons";
import React from "react";
import AvatarList from "./avatarlist";
import LocalLibraryOutlinedIcon from "@material-ui/icons/LocalLibraryOutlined";
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined";

const styles = makeStyles((theme) => ({
  avatar: {
    width: "50px",
    height: "50px",
  },
}));

const ResultCard2 = ({ result }) => {


  const {
    admissionRequirements,
    career,
    content,
    description,
    duration,
    field,
    level,
    location,
    logo,
    outcome,
    programUrl,
    scholarship,
    subject,
    title,
    tuition,
    uniName,
    video,
    delivery,
  } = result;
  return (
    <>
      <Container disableGutters style={{ padding: "1px" }}>
        <Paper style={{ cursor: "pointer" }}>
          <Grid container justify="center">
            <AvatarList
              primaryText={title}
              secondaryText={uniName}
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
            {level && (
              <Grid item>
                <ButtonBase
                  centerRipple
                  style={{ textTransform: "none" }}
                  component={Button}
                  startIcon={<LocalLibraryOutlinedIcon color="primary" />}
                >
                  {level}
                </ButtonBase>
              </Grid>
            )}
            {duration && (
              <Grid item>
                <ButtonBase
                  centerRipple
                  style={{ textTransform: "none" }}
                  component={Button}
                  startIcon={<BookmarkBorderOutlined color="primary" />}
                >
                  {duration}
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
            {delivery && (
              <Grid item>
                <ButtonBase
                  centerRipple
                  style={{ textTransform: "none" }}
                  component={Button}
                  startIcon={<LanguageOutlinedIcon color="primary" />}
                >
                  {delivery}
                </ButtonBase>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default ResultCard2;
