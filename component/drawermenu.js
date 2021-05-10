import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssessmentIcon from "@material-ui/icons/Assessment";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import {
  AccountBalanceOutlined,
  ContactSupportOutlined,
  DescriptionOutlined,
  EmailOutlined,
  ExpandLess,
  ExpandMore,
  LocationCity,
  LocationOnOutlined,
  NotesOutlined,
  PhoneOutlined,
  SchoolOutlined,
  StarBorder,
} from "@material-ui/icons";
import { useRecoilState } from "recoil";
import { drawerOpen_ } from "../state/recoil";
import {
  Box,
  Button,
  ButtonBase,
  Collapse,
  Grid,
  ListSubheader,
} from "@material-ui/core";
import { useRouter } from "next/router";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: theme.zIndex.drawer + 2,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  nested: {
    paddingLeft: theme.spacing(8),
  },
}));

export default function DrawerMenu({ open, handleDrawerClose }) {
  const classes = useStyles();
  const theme = useTheme();
  const [openVisa, setOpenVisa] = React.useState(true);

  const handleClick = () => {
    setOpenVisa(!openVisa);
  };
  const router = useRouter();
  const [openContact, setOpenContact] = React.useState(true);

  const handleContactOpen = () => {
    setOpenContact(!openContact);
  };

  const getIcon = (index) => {
    switch (index) {
      case 0:
        return <NotesOutlined />;
      case 1:
        return <DescriptionOutlined />;
      case 2:
        return <DescriptionOutlined />;
      case 3:
        return <AccountBalanceOutlined />;
      case 4:
        return <LocationOnOutlined />;
      default:
        return "";
    }
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        elevation={25}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List
          subheader={<ListSubheader disableSticky>Menu</ListSubheader>}
          component="nav"
        >
          {["ARTICLES", "GET VISA DOCUMENTS ONLINE"].map((text, index) => (
            <Box
              onClick={() => {
                if (text === "ARTICLES") router.push("/articles");
                if (text === "GET VISA DOCUMENTS ONLINE")
                  router.push("/interactive-order-platform");
              }}
              key={index}
            >
              <ListItem
                button
                onClick={() => {
                  if (index === 1) handleClick();
                }}
              >
                <ListItemIcon>{getIcon(index)}</ListItemIcon>
                <ListItemText primary={text} />

                {index === 1 ? (
                  <>{openVisa ? <ExpandLess /> : <ExpandMore />}</>
                ) : (
                  ""
                )}
              </ListItem>
              {index === 1 ? (
                <Collapse in={openVisa} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem
                      onClick={() => router.push("/interactive-order-platform")}
                      button
                      className={classes.nested}
                    >
                      <ListItemText primary="Travel Insurance" />
                    </ListItem>
                    <ListItem
                      onClick={() => router.push("/interactive-order-platform")}
                      button
                      className={classes.nested}
                    >
                      <ListItemText primary="Hotel Reservation for Visa" />
                    </ListItem>
                    <ListItem
                      onClick={() => router.push("/interactive-order-platform")}
                      button
                      className={classes.nested}
                    >
                      <ListItemText primary="Application Form Filling" />
                    </ListItem>
                  </List>
                </Collapse>
              ) : (
                ""
              )}
            </Box>
          ))}
        </List>
        <Divider />
        <List
          subheader={<ListSubheader disableSticky>Travel Tools</ListSubheader>}
          component="nav"
          onClick={handleContactOpen}
        >
          <ListItem onClick={() => router.push("/studyabroad")} button>
            <ListItemIcon>
              <SchoolOutlined />
            </ListItemIcon>
            <ListItemText primary="SCHOOL FINDER" />
          </ListItem>
          <ListItem onClick={() => router.push("/embassycontact")} button>
            <ListItemIcon>
              <LocationCity />
            </ListItemIcon>
            <ListItemText primary="EMBASSY FINDER" />
          </ListItem>
          <ListItem
            onClick={() => router.push("/visa-eligibility-test")}
            button
          >
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="VISA ELIGIBILITY TEST" />
          </ListItem>
        </List>
        <Divider />
        <List
          subheader={
            <ListSubheader
              style={{
                color: theme.palette.getContrastText(
                  theme.palette.primary.main
                ),
              }}
              disableSticky
            >
              Contact NGabroad
            </ListSubheader>
          }
          component="nav"
          onClick={handleContactOpen}
          style={{
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <ListItem>
            <ListItemText
              primary={
                <Box>
                  <Grid container>
                    <Grid item xs={12}>
                      <ButtonBase
                        component={Button}
                        startIcon={<PhoneOutlined />}
                        //    style={{ textDecoration: "none" }}
                        style={{
                          textTransform: "none",
                          color: theme.palette.getContrastText(
                            theme.palette.primary.main
                          ),
                        }}
                      >
                        09065369929 | 08087164862
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={12}>
                      <ButtonBase
                        component={Button}
                        startIcon={<EmailOutlined />}
                        style={{
                          textTransform: "none",
                          color: theme.palette.getContrastText(
                            theme.palette.primary.main
                          ),
                        }}
                      >
                        info@naijagoingabroad.com
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={12}>
                      <ButtonBase
                        component={Button}
                        startIcon={<LocationOnOutlined />}
                        style={{
                          textTransform: "none",
                          color: theme.palette.getContrastText(
                            theme.palette.primary.main
                          ),
                        }}
                      >
                        65c Opebi Rd, Ikeja, Lagos
                      </ButtonBase>
                    </Grid>
                  </Grid>
                </Box>
              }
            />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
