import React from "react";
import PropTypes from "prop-types";
import { useRecoilState } from "recoil";
import { allUni_, schools_ } from "../state/recoil";
import { AppBar, Box, createTheme, Tab, Tabs } from "@mui/material";
import { makeStyles } from "@mui/styles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box mt={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.default,
  },
}));

export default function StudyTab(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [allUni, setAllUniView] = useRecoilState(allUni_);
  const [schools, setSchools] = useRecoilState(schools_);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { searchForm, searchForm2 } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab
            onClick={() => {
              setAllUniView(true);
              setSchools(null);
            }}
            label="All Universities"
            {...a11yProps(0)}
          />
          {/* <Tab
            onClick={() => {
              setAllUniView(false);
              setSchools(null);
            }}
            label="Partner Universities"
            {...a11yProps(1)}
          /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {searchForm2}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {searchForm}
      </TabPanel>
    </div>
  );
}
