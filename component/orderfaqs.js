import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  makeStyles,
  Paper,
  Typography,
  useTheme,
} from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons";

const styles = makeStyles((theme) => ({
  box: {
    width: "80%",
    [theme.breakpoints.down("xs")]: { width: "100%" },
  },
}));

export const InsuranceFaqs = ({ setOpenModal }) => {
  const theme = useTheme();
  const classes = styles();

  return (
    <Box
      css={{ bgcolor: "white", p: "10px", width: "80%" }}
      className={classes.box}
    >
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={() => setOpenModal(false)} color="primary">
          <CloseRounded />
        </IconButton>
      </Box>
      <Typography variant="h6" align="center" gutterBottom>
        All About Our Travel Insurance
      </Typography>
      <Typography>
        Our travel health Insurance is a piece of e-documents issued by one of
        our insurance partners namely; <br />
        <ul>
          <li>Axa Mansard </li>
          <li>Mutual Benefits Assurance Plc </li>
        </ul>
        This documents is required by various embassies and airlines to fulfil
        an obligation. It is also required before you can submit any schengen
        visa application.
        <br />
      </Typography>
      <Typography gutterBottom>
        Features:
        <br />
        <ul>
          <li>Minimum coverage of 30,000 euros</li>
          <li>Instant certificates</li>
          <li>International Acceptance accross all embassies and airlines</li>
          <li>Global Partnerships</li>
          <li>24/7 Support</li>
        </ul>
      </Typography>
    </Box>
  );
};

export const HotelFaqs = ({ setOpenModal }) => {
  const classes = styles();
  return (
    <Box
      css={{ bgcolor: "white", p: "10px", width: "80%" }}
      className={classes.box}
    >
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={() => setOpenModal(false)} color="primary">
          <CloseRounded />
        </IconButton>
      </Box>
      <Typography variant="h6" align="center" gutterBottom>
        All About Our Hotel Reservation For Visa services
      </Typography>
      <Typography>
        Hotel reservation for visa is a piece of documents issued by an hotel
        which confirms that an accomodation has been reserved in the name of the
        recipient. This is required by most embassies as a requirement for visa
        application.
        <strong>
          Note that you are not required to pay upfront for hotel accomodation
          as the outcome of visa in most instances are not guarnateed,
          therefore, no embassy as ever requested for a paid hotel except in
          some instances when visa is about to be approved and the applicant was
          specifically called to bring a paid hotel
        </strong>
      </Typography>
      <Typography gutterBottom>
        Features:
        <br />
        <ul>
          <li>Valid and verifiable by the embassy or the applicant</li>
          <li>
            Full contact details of the issuing hotel which can be used by
            either the embassy or the applicant to verify its authenticity
          </li>
          <li>Instant confirmation</li>
          <li>International Acceptance accross all embassies and airlines</li>
          <li>Global Partnerships</li>
          <li>24/7 Support</li>
        </ul>
      </Typography>
    </Box>
  );
};

export const FlightFaqs = ({ setOpenModal }) => {
  const classes = styles();
  return (
    <Box
      css={{ bgcolor: "white", p: "10px", width: "80%" }}
      className={classes.box}
    >
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={() => setOpenModal(false)} color="primary">
          <CloseRounded />
        </IconButton>
      </Box>
      <Typography variant="h6" align="center" gutterBottom>
        All About Our Flight Reservation For Visa services
      </Typography>
      <Typography>
        Flight reservation for visa is a piece of documents issued by an airline
        which confirms the itinerary of the traveller. This is needed by most
        embassies as a requirement for visa application. This service is free
        when you have purchased another item.
        <strong>
          Note that you are not required to pay upfront for flight booking when
          applying for visa as the outcome of visa in most instances are not
          guarnateed, therefore, no embassy as ever requested for a paid flight
          itinerary except in some instances when visa is about to be approved
          and the applicant was specifically called to bring a paid flight
          booking. Also, this confirmation sent to you is an itinerary which can
          be verified on the airline's website usually within 72 hours. Beyond
          this period, it may not be valid. However, embassy do not need a valid
          itinerary to issue
        </strong>
      </Typography>
      <Typography gutterBottom>
        Features:
        <br />
        <ul>
          <li>issued by the airline</li>
          <li>Instant confirmation</li>
          <li>International Acceptance accross all embassies</li>
          <li>Global Partnerships</li>
          <li>24/7 Support</li>
        </ul>
      </Typography>
      <Typography>
        This service is free if you have purchase other items, if not, please
        select the paid version of this item
      </Typography>
    </Box>
  );
};

export const FormFaqs = ({ setOpenModal }) => {
  const classes = styles();
  return (
    <Box
      css={{ bgcolor: "white", p: "10px", width: "80%" }}
      className={classes.box}
    >
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={() => setOpenModal(false)} color="primary">
          <CloseRounded />
        </IconButton>
      </Box>
      <Typography variant="h6" align="center" gutterBottom>
        All About Our Visa Application Form Filling Services
      </Typography>
      <Typography>
        With the help of this services, a proffesional visa expert will assist
        you in filling your application form to ensure it has no errors and meet
        the specifications of the embassy requirements.
      </Typography>
      <Typography gutterBottom>
        Features:
        <br />
        <ul>
          <li>Form will be fill by a proffesional visa expert</li>
          <li>Advise on documentations for visa</li>
          <li>
            Review by applicant before submission to ensure that your profile
            has been properly entered
          </li>
          <li>24/7 Support</li>
        </ul>
      </Typography>
    </Box>
  );
};

export const CoverFaqs = ({ setOpenModal }) => {
  const classes = styles();
  return (
    <Box
      css={{ bgcolor: "white", p: "10px", width: "80%" }}
      className={classes.box}
    >
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={() => setOpenModal(false)} color="primary">
          <CloseRounded />
        </IconButton>
      </Box>
      <Typography variant="h6" align="center" gutterBottom>
        All About Our Cover Letter
      </Typography>
      <Typography>
        With this product, you will receive a proffesionally crafted embassy
        standard cover letter for your visa application. If you do not know what
        a cover letter for visa is, then you should know that it is a letter
        written in support of your application detailing additional information
        about your social ties, economic ties, travel plans etc. These
        information assist the consular officer in visa decision.
      </Typography>
      <Typography gutterBottom>
        Features:
        <br />
        <ul>
          <li>
            Cover Letter will be written following the best guidelines that work
            for your specific visa category and profile.
          </li>
          <li>Advise on documentations for visa</li>
          <li>24/7 Support</li>
        </ul>
      </Typography>
    </Box>
  );
};

export const LoadingScreen = ({ setOpenModal }) => {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress size="150px" color="secondary" />
      <Typography
        variant="caption"
        style={{ position: "absolute", color: "white" }}
      >
        Please wait...
      </Typography>
    </Box>
  );
};

export const FreeGiftsFaqs = ({ setOpenModal }) => {
  const classes = styles();
  return (
    <Box
      css={{ bgcolor: "white", p: "10px", width: "80%" }}
      className={classes.box}
    >
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={() => setOpenModal(false)} color="primary">
          <CloseRounded />
        </IconButton>
      </Box>
      <Typography variant="h6" align="center" gutterBottom>
        FREE GIFTS
      </Typography>

      <Typography gutterBottom>
        Features:
        <br />
        <ul>
          <li>
            Flight Reservation For Visa: This is required by embassies to
            understand your planned itinerary
          </li>
          <li>
            Documents Checklist: This is a detailed list of visa requirements
            that you are expected to bring in order to successfully lodge your
            application
          </li>
          <li>
            Appointment Booking: Many embassies have an appointment booking
            system and you are expected to schedule and appointment before
            coming for submission
          </li>
          <li>
            Consultaion Services: Would you like to talk to an expert on
            how to acheive success with your visa application? If so, this
            service is available for you for free. <br />
            **minimum order of NGN 10,000 mandatory
          </li>
        </ul>
      </Typography>
    </Box>
  );
};
