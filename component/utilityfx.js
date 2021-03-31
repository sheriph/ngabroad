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
