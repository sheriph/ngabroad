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

const styles = makeStyles((theme) => ({
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
  return (
    <>
      <Container disableGutters style={{ padding: "1px" }}>
        <Paper style={{ cursor: "pointer" }}>
          <Grid container justify="center">
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
    </>
  );
};

export default ResultCard;
