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
import Image from "next/image";

const styles = makeStyles((theme) => ({
  grid: {
    marginTop: "20px",
    marginBottom: "30px",
  },
}));

const StudyAbroadComponent = ({ isAmp }) => {
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
      {!isAmp && (
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
      )}
      <Grid container className={classes.grid}>
        <Grid item container spacing={2} justify="center" xs={12}>
          <Grid item xs={12}>
            <StudyTab
              searchForm={<SearchForm />}
              searchForm2={<SearchForm2 isAmp={isAmp} />}
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
                          </>
                        ) : (
                          <>
                            <ResultCard result={school} />
                          </>
                        )}
                      </LazyLoad>
                      {index > 0 && index % 3 === 0 && (
                        <GoogleAds
                          slot={`${slot[Math.ceil(Math.random() * 10)]}`}
                        />
                      )}
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
              {isAmp ? (
                <amp-img
                  src="/images/stepup.svg"
                  alt="study abroad"
                  width="320"
                  height="300"
                  layout="responsive"
                ></amp-img>
              ) : (
                <img
                  src="/images/stepup.svg"
                  alt="study abroad"
                  width="100%"
                  height="300px"
                />
              )}
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

            <Grid item xs={12} style={{ marginTop: "30px" }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Study Abroad FAQs that will help you…
              </Typography>
              {isAmp ? (
                <amp-img
                  src="/images/studyabroadfaqs.jpg"
                  alt="study abroad"
                  width="320"
                  height="300"
                  layout="responsive"
                ></amp-img>
              ) : (
                <Box display="flex" justifyContent="center" py={2}>
                  <Image
                    src="/images/studyabroadfaqs.jpg"
                    alt="study abroad"
                    width="640"
                    height="427"
                    layout="intrinsic"
                  />
                </Box>
              )}
              <Typography gutterBottom>
                It is particularly common to hear students ask questions as it
                regards their study abroad mission. Getting an abroad education
                is becoming interesting day by day especially, as it is one of
                the best ways of migrating to another country. To study abroad,
                you need adequate information that would help you have a smooth
                sail getting admission and visa approved. As a result of this, I
                present to you some study abroad frequently asked questions you
                should know. Despite that the tuition fee is always higher as
                compared to what one can get in his or her home country, many
                international students prefer studying abroad. Obtaining a
                foreign degree can be expensive in some countries especially
                top-tier countries like Canada, the United States, UK, and
                Australia, however, you can find cheap tuition fee universities
                in Europe and Asia. Now, let’s see some of the study abroad
                frequently asked questions (FAQs) and answers.
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Why study abroad?
              </Typography>

              <Typography gutterBottom>
                Are you among those asking this question “why study abroad?
                Well, ‘to each is his own as what may interest you may not
                interest another. Generally, a large number of students who seek
                abroad education desire to earn a foreign degree. Among the top
                reasons for study abroad, enthusiasts are obtaining a degree
                with global recognition. For example, a degree obtained from
                Canadian, UK, US, and German universities is internationally
                recognized. What this means is that you can present your B.sc or
                M.sc obtained from any of these countries for work purpose, and
                it will be accepted. Secondly, students perceive studying abroad
                as a route for migration. Although there are different types of
                visas one can apply for, the study visa which comes with a
                longer validity period seems the best option that in the end, a
                student can apply for a post-study visa that could lead to
                permanent residency, also, most schools abroad offer study and
                work opportunity, with this student earn while studying.
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Where should I study (best study abroad countries)
              </Typography>
              <Typography gutterBottom>
                Although, some countries are rated higher in terms of offering
                quality education. nevertheless, your destination however
                depends on your budget- tuition fee, and general cost of living,
                choice of program, medium of instruction, acceptance rate, ease
                of getting a visa, etc. You need to put these factors into
                consideration when looking for a place to study. If you’re
                looking for affordable tuition fee universities in the world,
                then schools in Europe should be your best bet, but the language
                barrier is another issue you may want to consider. Even though
                you can find some English-taught programs in your chosen school,
                the tuition shoots up, apart from that, it may take you time to
                adapt as you’re expected to communicate in their language, that
                could take you years to learn which can also affect your chance
                of getting a part-time job while studying. On the other hand, if
                you’re not overly bothered about cost, the United States,
                Canada, Australia, UK can be considered as the best study abroad
                destinations for international students. The decision is yours.
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Where are the cheapest destinations to study?
              </Typography>
              <Typography gutterBottom>
                This is one of the study abroad frequently asked questions. The
                word cheap looks ‘vague’ in the sense that you may find a cheap
                tuition fee university but the country’s standard of living will
                be pretty high. However, some countries are cheaper. If you’re
                looking for the cheapest destination to study abroad, here are
                countries you should ty Latvia Latvia is one of the Baltic
                countries bordering Lithuania and Estonia. The country houses
                some of the most affordable tuition fee universities in Europe.
                Some of its best universities are the University of Latvia, Riga
                Technical University, and Latvia University of Life Sciences and
                Technologies. Lithuania This is another cheap destination for
                study abroad fans. Lithuania is positioned in the South-Eastern
                region of the Baltic Sea, sharing borders with Sweden and
                Denmark. The has country has some cheap universities like
                Klaipeda University, Mykolas Romeris University, Vytautas Magnus
                University, and more. France Tuition fees in most French
                universities are cheap but studying in cities like Paris, Lyon,
                Marseille, Nice, and Bordeaux can attract higher costs. Here are
                some cheap tuition fee universities in France: University of
                Orleans University of Strasbourg University of Burgundy
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Can I study abroad with only NECO/GCE?
              </Typography>
              <Typography gutterBottom>
                The National Examinations Council (NECO) is a written
                examination for graduating classes in Nigeria. This certificate
                is similar to the West African School Certificate Examinations
                (WAEC) which is recognized within the West African countries and
                other countries. To study abroad, you need either a WAEC or NECO
                result. To answer the question if one can study abroad with a
                NECO/GCE result, yes you can. But first, you should check the
                entry requirements of the school and program. GCE is far
                recognized especially, for schools in the UK, Canada, and the
                United States.
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Can I study abroad without IELTS?
              </Typography>
              <Typography gutterBottom>
                IELTS is otherwise known as the International English Language
                Testing System is one of the language proficiency tests
                international students are expected to write as a prerequisite
                for abroad education. The essence of the test to check a
                student’s ability in the areas of speaking, writing, hearing,
                and reading. Sometimes, the IELTS test can be waived depending
                on the student’s nationality, country of study program type, and
                work experience. Nigeria is regarded as an english speaking
                country, since the official language is English. This has led
                many institutions to waive the test of english such as IELTS,
                TOEFL etc.
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography variant="h5" component="h2" gutterBottom>
                How do I get started?
              </Typography>
              {isAmp ? (
                <amp-img
                  src="/images/study abroad.jpg"
                  alt="study abroad"
                  width="320"
                  height="300"
                  layout="responsive"
                ></amp-img>
              ) : (
                <Box display="flex" justifyContent="center" py={2}>
                  <Image
                    src="/images/study abroad.jpg"
                    alt="study abroad"
                    width="640"
                    height="427"
                    layout="intrinsic"
                  />
                </Box>
              )}
              <Typography gutterBottom>
                simple response: start by using the school finder application
                available at the top of this page to find schools, courses, and
                figure out tuition fees, requirements and course content. If
                you’re planning to study abroad, the first step is to prepare
                your study abroad goals. You should ask yourself questions like
                what do you intend to achieve after completing your studies? Are
                you planning to stay back after your studies? After you’ve been
                able to set your goals, the next step is to research schools
                offering the course you intend to study. By so doing, you need
                to check the tuition fee, acceptance rate, university ranking,
                the possibility of getting a part-time job, stay back options
                that’s if you are interested in remaining in the country after
                completing your education.
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography variant="h5" component="h2" gutterBottom>
                When can I start applying for study abroad programs?
              </Typography>
              <Typography gutterBottom>
                The intake period for some schools differs. For most schools in
                Europe, admission starts by September, which means, you should
                start applying for admission early enough. To prevent any
                last-minute problems, students can always apply well ahead of
                the deadline. Students aiming for the September intake should
                start preparing their application as of May but if you’re yet to
                write any of the language tests, February may be a better
                option. It is better to apply early as most schools consider
                early applicants. Some schools operate 2-3 intake periods,
                namely, Fall, Spring, Autumn, meaning that the application
                deadlines vary by school.
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography variant="h5" component="h2" gutterBottom>
                What are the entry requirements for study abroad programs?
              </Typography>
              <Typography gutterBottom>
                To study abroad, students must fulfill all the admission
                requirements. The Entry requirements vary based on the school,
                study level, and at times, student’s nationality. For example,
                the entry requirements for non-EU students and that of EU
                students planning to study in any European country differs. It
                is, therefore, important to check the entry requirements before
                hitting the ‘apply button’ on the school website, go to the
                right section. International students should only click on the
                box meant for foreign students, from there, other information
                like a choice of program, study level would be selected. The
                entry requirements are just lists of documents a student is
                required to provide for admission. Every document listed out
                there is important, do not ignore any unless it is specified
                ‘optional’ on the website.
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography variant="h5" component="h2" gutterBottom>
                What documents should I submit with my application when applying
                for schools abroad?
              </Typography>
              <Typography gutterBottom>
                Depending on the school, and type of program, you’re expected to
                provide some valid documents and other supporting documents that
                would be used to process your admission. The documentation also
                varies from school to school, and program type. The documents
                for domestic and international students are not the same. For
                example, international students planning to study in Canada, or
                Australia, will most likely write a proficiency test as they are
                not regarded as native English speakers. Here are the common
                documents most schools require A valid international document
                <br />
                Passport photographs
                <br /> Motivational letter (masters and Ph.D. students)
                <br /> Academic results
                <br /> A statement of purpose
                <br /> CV
                <br /> Official transcripts <br />
                Language Test scores (GMAT, GRE, TOEFL, IELTS, SAT, CAMBRIDGE)
                <br />
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Do I have to speak a second language to study abroad?
              </Typography>
              {isAmp ? (
                <amp-img
                  src="/images/Do I have to speak a second language to study abroad.jpg"
                  alt="study abroad"
                  width="320"
                  height="300"
                  layout="responsive"
                ></amp-img>
              ) : (
                <Box display="flex" justifyContent="center" py={2}>
                  <Image
                    src="/images/Do I have to speak a second language to study abroad.jpg"
                    alt="study abroad"
                    width="640"
                    height="427"
                    layout="intrinsic"
                  />
                </Box>
              )}
              <Typography gutterBottom>
                Speaking a second language is an advantage for you, but before
                you apply for a proficiency exam, check the school website to
                know if it is among the admission requirements. The importance
                of a second language/ language test is to evaluate a student’s
                comprehension skills, written, hearing, and speaking. Some
                countries and programs waive it. For schools that make it
                mandatory, it is vital you write the exam now so that if the
                score is low, you can as well write again.
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Will I need to attend an admission interview?
              </Typography>
              <Typography gutterBottom>
                Every school sets its standard. There is no fixed law that
                states that students must attend an admission interview,
                however, some universities consider this as a necessity which is
                usually done via SKYPE. You can as well check your intending
                school to see if an admission interview is a must. Even at that,
                the interview section is just asking a few questions as it
                relates to your study plans with common questions, like why did
                you choose this university? why the course? what do you intend
                to achieve after completing the program etc.?
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography variant="h5" component="h2" gutterBottom>
                After gaining a letter of acceptance, what else should I do?
              </Typography>
              <Typography gutterBottom>
                Gaining a letter of acceptance is the first hurdle solved, so,
                hats off as you enter the next phase, which is the main. You
                should know that a conditional admission letter or a letter of
                acceptance does not mean you should just jump into the plane.
                After you’ve got your letter, the next step is to arrange all
                your required documents to start processing your visa. Depending
                on the country where you are planning to travel to, you may or
                may not need a visa, so, it is important you check the school
                website and immigration laws before you start the visa
                processing. However, if you will need a visa, start the process
                immediately, as the processing time for some visas takes longer
                period. It can take between 1 month- 3 months to know the visa
                condition- whether it is approved or denied.
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Can I get financial aid to study abroad?
              </Typography>
              <Typography gutterBottom>
                You can get financial aid to study abroad, but such an offer is
                not available in all countries and not open to all nationals.
                For more information, check school websites and top scholarship
                providers.
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Where can I find scholarships?
              </Typography>
              {isAmp ? (
                <amp-img
                  src="/images/scholarships study abroad.jpg"
                  alt="study abroad"
                  width="320"
                  height="300"
                  layout="responsive"
                ></amp-img>
              ) : (
                <Box display="flex" justifyContent="center" py={2}>
                  <Image
                    src="/images/scholarships study abroad.jpg"
                    alt="study abroad"
                    width="640"
                    height="427"
                    layout="intrinsic"
                  />
                </Box>
              )}
              <Typography gutterBottom>
                Schools, governments, and individuals provide scholarship
                opportunities to eligible candidates. To find a scholarship, you
                must constantly check the website of your intending school for
                scholarship updates. Apart from the school website, you can try
                study abroad blog websites like study-domain.com,
                worldscholarshipforum.com, scholarshipposition.com for
                scholarship updates. Better still, sign up for a scholarship
                alert on any of these websites.
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Where will I stay during my study abroad?
              </Typography>
              <Typography gutterBottom>
                There’re available options for students on where to live while
                studying abroad. It is your choice, and budget too. Some schools
                have accommodation options for students which comes inform of
                halls/dormitories. It is cheaper to live in a school hostel, but
                the convenience may be a factor to consider. Freshmen are
                advised to stay in the school-provided accommodation until they
                get to their second or third year in the university. The
                benefits include no transportation cost as dormitories are cited
                on campus, you meet friends with different cultural backgrounds.
                Other accommodation options include: Shared apartment You can
                choose to stay in a shared apartment. It is provided by schools,
                where students live in a separate room but share either kitchen.
                The cost of a shared apartment is a bit higher than school
                dormitories because they are usually furnished by the school.
                So, you don’t need to spend buying furniture unless, you need
                one for yourself, and can go along with it when leaving. Private
                apartment Here, you can look for a house within or outside the
                school. Private accommodation is expensive; you will cater for
                all the utility bills. It is not the best option for many
                students, but if money is never the problem, then, it is a
                perfect place to stay especially, for students who want privacy.
                Homestay If you fancy the idea of staying with a family, then
                this option may be for you. A homestay accommodation helps a
                student learn a language and the local culture faster, also,
                students get to botherless on food, because breakfast and dinner
                are included in the offer but the price for these services
                attract a higher price than staying in a school dormitory or
                shared apartment.
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Can I work during my studies abroad?
              </Typography>
              <Typography gutterBottom>
                One of the study abroad frequently asked questions is can I work
                during my studies abroad? As a matter of fact, most schools
                allow students to work and study which is among the top reasons
                for an oversee education. Work and study opportunities is not a
                general rule for all schools, it all depends on the country, as
                some schools do not allow students to involve in such. For
                countries that permit study and work, students- domestic and
                international students can work for 20 hours per week during an
                academic session, while during the holiday, they are allowed to
                work for 40 hours or more as the case may be. To be eligible for
                a student part-time job abroad, you must be a registered
                student. Sometimes, you are allowed to apply from your second
                year in the university. Work and study opportunities are mainly
                open to master's and bachelor's students. Many schools do not
                grant students enrolled in short courses study and work
                opportunities.
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Conclusion
              </Typography>
              <Typography gutterBottom>
                If you’re planning to study abroad, these study abroad
                frequently asked questions, and answers provided will guide you.
                To kick start your journey, write down the lists of countries
                you want to study at, check the lists of top universities in the
                country, then visit the websites respectively.
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default StudyAbroadComponent;
