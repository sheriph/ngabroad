// @ts-nocheck
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Collapse,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useRecoilValue } from "recoil";
import SearchForm from "../schoolfinder/searchform";
import { schools_, isloading_, allUni_ } from "../state/recoil";
import LazyLoad from "react-lazyload";
import ResultCard from "./resultcard";
import ResultCard2 from "./resultcard2";
import React, { useState } from "react";
import OrderModal from "./ordermodal";
import { SchoolDetails, SchoolDetails2 } from "./orderfaqs";
import { ExpandMoreOutlined } from "@material-ui/icons";
import LinearBuffer from "../schoolfinder/bufferprogress";
import StudyTab from "./studytab";
import SearchForm2 from "./searchForm2";
import GoogleAds from "./googleads";

const styles = makeStyles((theme) => ({
  grid: {
    marginTop: "20px",
    marginBottom: "30px",
  },
}));

const StudyAbroadComponent = () => {
  const classes = styles();
  const [openModal, setOpenModal] = useState(false);
  const schools = useRecoilValue(schools_);
  const [schoolinfo, setschoolinfo] = useState(null);
  const loading = useRecoilValue(isloading_);
  const allUni = useRecoilValue(allUni_);
  const [num, setExpanded] = useState(5);
  //console.log("schools", schools);
  //console.log(openModal);
  const handleExpand = (num) => {
    setExpanded(num);
  };
  const slot = [
    "8519630377",
    "1584472777",
    "2131267688",
    "9212693114",
    "8199828498",
    "3061205970",
    "4657127169",
    "6868341620",
    "5778637149",
    "4242178287",
    "5587065453",
  ];
  return (
    <React.Fragment>
      <OrderModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        jsx={
          allUni ? (
            <SchoolDetails2 school={schoolinfo} setOpenModal={setOpenModal} />
          ) : (
            <SchoolDetails school={schoolinfo} setOpenModal={setOpenModal} />
          )
        }
      />
      <Grid container className={classes.grid}>
        <Grid item container spacing={2} justify="center" xs={12}>
          <Grid item xs={12}>
            <StudyTab
              searchForm={<SearchForm />}
              searchForm2={<SearchForm2 />}
            />
          </Grid>
          <Grid item xs={12}>
            {loading && <LinearBuffer />}
          </Grid>
        </Grid>
        {schools ? (
          <React.Fragment>
            {schools.length > 0 ? (
              <Collapse in={schools !== null}>
                <Grid
                  item
                  container
                  spacing={3}
                  justify="center"
                  style={{ marginTop: "30px" }}
                >
                  {schools.map((school, index) => (
                    <Grid
                      key={index}
                      onClick={() => {
                        setschoolinfo(school);
                        setOpenModal(true);
                      }}
                      item
                      xs={12}
                    >
                      <LazyLoad height={250} offset={300} unmountIfInvisible>
                        {allUni ? (
                          <>
                            <ResultCard2 result={school} />
                            {index > 0 && index % 3 === 0 && (
                              <GoogleAds
                                slot={`${slot[Math.ceil(Math.random() * 10)]}`}
                              />
                            )}
                          </>
                        ) : (
                          <>
                            <ResultCard result={school} />
                            {index > 0 && index % 3 === 0 && (
                              <GoogleAds
                                slot={`${slot[Math.ceil(Math.random() * 10)]}`}
                              />
                            )}
                          </>
                        )}
                      </LazyLoad>
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            ) : (
              <Grid
                item
                container
                spacing={3}
                justify="center"
                style={{
                  marginTop: "30px",
                  marginBottom: "30px",
                  height: "40px",
                }}
              >
                <Grid item>
                  <Typography variant="h6">
                    !Ops!! No study program(s) found. Please, try a new search
                    terms
                  </Typography>
                </Grid>
              </Grid>
            )}
          </React.Fragment>
        ) : (
          <Grid item container justify="center" style={{ marginTop: "40px" }}>
            <Grid item xs={12} sm={6}>
              <img
                src="/images/stepup.svg"
                alt="studyabroad"
                width="100%"
                height="300px"
              />
            </Grid>

            <Grid item container spacing={2} xs={12} sm={6}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Benefits of applying to our partner institutions
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Accordion
                  onChange={() => handleExpand(1)}
                  expanded={num === 1}
                >
                  <AccordionSummary
                    expandIcon={
                      <Box
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleExpand(10);
                        }}
                      >
                        <ExpandMoreOutlined />
                      </Box>
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Free Admission Support</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      We work hand in hand with the school's admission councelor
                      to ensure you qualify for the program that you are
                      applying for. The immediate benefits of this is that your
                      application gets a positive feedback in record time.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12}>
                <Accordion
                  onChange={() => handleExpand(2)}
                  expanded={num === 2}
                >
                  <AccordionSummary
                    expandIcon={
                      <Box
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleExpand(10);
                        }}
                      >
                        <ExpandMoreOutlined />
                      </Box>
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Free Visa Support</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      NGabroad is ranked as the most visited website for visa
                      related issues. With our in-house highly experienced visa
                      consultants helping you to navigate through the often
                      confusing embassy required documents and process, then the
                      possibilities of success is already in your favour
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12}>
                <Accordion
                  onChange={() => handleExpand(3)}
                  expanded={num === 3}
                >
                  <AccordionSummary
                    expandIcon={
                      <Box
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleExpand(10);
                        }}
                      >
                        <ExpandMoreOutlined />
                      </Box>
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Job Opportunities</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      With your study and work permit, you have the opportunity
                      to work certain hours based on the country of destinations
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12}>
                <Accordion
                  onChange={() => handleExpand(4)}
                  expanded={num === 4}
                >
                  <AccordionSummary
                    expandIcon={
                      <Box
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleExpand(10);
                        }}
                      >
                        <ExpandMoreOutlined />
                      </Box>
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>High Rank University</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Our partner universities and colleges comprise of high
                      ranking institutions accross the continent
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default StudyAbroadComponent;
