import * as yup from "yup";

export const formatMoney = (money) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(money);
};

export const updateData = (data) => {
  // {selection6: "2 Year Master / Specialized Master"}
  if (data.selection6 && data.selection6.length > 1) {
    if (data.selection6.toLowerCase().includes("master")) return "Master";
    if (data.selection6.toLowerCase().includes("bachelor")) return "Bachelor";
    if (data.selection6.toLowerCase().includes("diploma")) return "Diploma";
    if (data.selection6.toLowerCase().includes("dual degree"))
      return "Dual Degree";
    if (data.selection6.toLowerCase().includes("phd")) return "Phd";
    if (data.selection6.toLowerCase().includes("certificate"))
      return "Certificate";
  }
  return "null";
};

export const formatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

export const getProductName = (name, orderData) => {
  switch (name) {
    case "hotelReservation":
      return {
        productName: "Hotel Reservation For Visa",
        value: formatter.format(5000),
      };
    case "flightReservation":
      return { productName: "Flight Reservation for Visa", value: "FREE" };
    case "visaForm":
      return {
        productName: "Visa Application Form Filling",
        value: formatter.format(10000),
      };
    case "coverLetter":
      return { productName: "Cover letter", value: formatter.format(10000) };
    case "insuranceCountry":
      return {
        productName: "Destination Country",
        value: orderData["insuranceCountry"].countryName,
      };
    case "insuranceDuration":
      return {
        productName: "Duration of Insurance",
        value: orderData["insuranceDuration"].duration,
      };
    case "insurancePrice":
      return {
        productName: "Travel Insurance Price",
        value: formatter.format(Number(orderData["insurancePrice"])),
      };
    default:
      return { productName: undefined, value: undefined };
  }
};
