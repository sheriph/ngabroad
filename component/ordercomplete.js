import { Button, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { formatter, getProductName } from "./utilityfx";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { customerInfo_, formData_, orderData_ } from "../state/recoil";
import { useRecoilState } from "recoil";
import { startCase, lowerCase } from "lodash";
import { usePaystackPayment } from "react-paystack";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(productName, value) {
  return { productName, value };
}

const rows = [
  createData("Travel Insurance", 8250),
  createData("Flight Reservation For Visa", "FREE"),
  createData("Hotel Reservation For Visa", 5000),
  createData("Application Form Filling", 10000),
  createData("Cover Letter", 10000),
];
export default function OrderComplete() {
  const [summaryTable1, setSummaryTable1] = React.useState([]);
  const [summaryTable2, setSummaryTable2] = React.useState([]);

  const [formData, setFormData] = useRecoilState(formData_);
  const [orderData, setOrderData] = useRecoilState(orderData_);
  const [customerInfo, setCustomerInfo] = useRecoilState(customerInfo_);
  React.useEffect(() => {
    let sumTable1 = [];
    let sumTable2 = [];
    for (let item in orderData) {
      const { productName, value } = getProductName(item, orderData);
      if (productName && value) {
        const createdData = createData(productName, value);
        sumTable1.push(createdData);
      }
    }
    for (let item in customerInfo) {
      if (item === "Additional Information") continue;
      const value = customerInfo[item];
      const createdData = createData(item, value);
      sumTable2.push(createdData);
    }
    setSummaryTable1(sumTable1);
    setSummaryTable2(sumTable2);
  }, [null]);

  const config = {
    reference: new Date().getTime().toString(),
    email: formData.Email,
    amount: `${formData.totalPrice + "00"}`,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  };

  // @ts-ignore
  const initializePayment = usePaystackPayment(config);

  return (
    <Stack
      divider={<Divider orientation="horizontal" flexItem />}
      component={Paper}
      spacing={2}
      sx={{ py: 3, my: 2 }}
    >
      <Stack sx={{ px: 2 }} spacing={1}>
        <Typography variant="h5" align="center">
          ORDER ID: {formData?.orderNumber}
        </Typography>
        <Typography align="center">Your order has been confirmed.</Typography>
        <Typography align="center">
          Clik here to make payment online :{" "}
          <Button
            onClick={() => initializePayment(null, null)}
            disableElevation
            variant="contained"
            component="span"
          >
            PAY NOW
          </Button>
        </Typography>
        <Typography align="center">For Bank Deposit/Transfer :</Typography>
        <Typography align="center">Bank Name : Stanbic IBTC</Typography>
        <Typography align="center">
          Account Name : NAIJAGOINGABROAD LTD
        </Typography>
        <Typography align="center">Account Number : 0034136686</Typography>
      </Stack>
      <Stack sx={{ px: 2 }} justifyContent="space-around" direction="row">
        <Stack>
          <Typography align="center">Order Date</Typography>
          <Typography align="center">
            {dayjs(formData?.orderDate || new Date()).format("DD MMMM, YYYY")}
          </Typography>
        </Stack>
        <Stack>
          <Typography align="center">Total Price</Typography>
          <Typography align="center">
            {formatter.format(formData?.totalPrice)}
          </Typography>
        </Stack>
        <Stack>
          <Typography align="center">Name</Typography>
          <Typography align="center">
            {startCase(
              lowerCase(
                `${formData?.Title} ${formData?.Surname} ${formData["First Name"]}`
              )
            )}
          </Typography>
        </Stack>
      </Stack>
      <Stack spacing={2} sx={{ px: 2 }}>
        <Typography variant="h5" align="center">
          Order Summary
        </Typography>
        <TableContainer>
          <Table aria-label="customized table">
            <TableBody>
              {summaryTable1.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.productName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.value}</StyledTableCell>
                </StyledTableRow>
              ))}
              {summaryTable2.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.productName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {dayjs(row.value).isValid()
                      ? dayjs(row.value).format("DD MMMM, YYYY")
                      : row.value}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {customerInfo["Additional Information"] && (
          <Stack>
            <Typography textAlign="center">Additional Information</Typography>
            <Typography>{customerInfo["Additional Information"]}</Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

const orderSummary = {
  hotelReservation: 5000,
  flightReservation: "FREE",
  insuranceCountry: "Canada",
  insuranceDuration: "30 Days",
  travelInsurance: true,
  visaForm: 10000,
  coverLetter: 10000,
  insurancePrice: 8750,
};
