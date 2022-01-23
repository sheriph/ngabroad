/* export const insurancePrice = [
  { country: "Australia", "7 days": 2000, "14 days": 2500 },
  { country: "Nigeria", "7 days": 14000, "14 days": 2500 },
  { country: "Sweden", "7 days": 14001, "14 days": 2500 },
]; */

export const insuranceDuration = [
  { duration: "7 days" },
  { duration: "10 days" },
  { duration: "15 days" },
  { duration: "21 days" },
  { duration: "30 days" },
  { duration: "60 days" },
  { duration: "92 days" },
  { duration: "180 days" },
  { duration: "365 days" },
];

export const countries = [
  {
    CountryID: "1",
    countryName: "Afghanistan",
    isSchengen: false,
  },
  {
    CountryID: "2",
    countryName: "Albania",
    isSchengen: false,
  },
  {
    CountryID: "3",
    countryName: "Algeria",
    isSchengen: false,
  },
  {
    CountryID: "4",
    countryName: "Angola",
    isSchengen: false,
  },
  {
    CountryID: "5",
    countryName: "Argentina",
    isSchengen: false,
  },
  {
    CountryID: "6",
    countryName: "Armenia",
    isSchengen: false,
  },
  {
    CountryID: "7",
    countryName: "Australia",
    isSchengen: false,
  },
  {
    CountryID: "8",
    countryName: "Austria",
    isSchengen: true,
  },
  {
    CountryID: "9",
    countryName: "Azerbaijan",
    isSchengen: false,
  },
  {
    CountryID: "10",
    countryName: "Bahamas",
    isSchengen: false,
  },
  {
    CountryID: "11",
    countryName: "Bahrain",
    isSchengen: false,
  },
  {
    CountryID: "12",
    countryName: "Bangladesh",
    isSchengen: false,
  },
  {
    CountryID: "13",
    countryName: "Barbados",
    isSchengen: false,
  },
  {
    CountryID: "14",
    countryName: "Belarus",
    isSchengen: false,
  },
  {
    CountryID: "15",
    countryName: "Belgium",
    isSchengen: true,
  },
  {
    CountryID: "16",
    countryName: "Belize",
    isSchengen: false,
  },
  {
    CountryID: "17",
    countryName: "Benin",
    isSchengen: false,
  },
  {
    CountryID: "18",
    countryName: "Bhutan",
    isSchengen: false,
  },
  {
    CountryID: "19",
    countryName: "Bolivia",
    isSchengen: false,
  },
  {
    CountryID: "20",
    countryName: "Bosnia and Herzegovina",
    isSchengen: false,
  },
  {
    CountryID: "21",
    countryName: "Botswana",
    isSchengen: false,
  },
  {
    CountryID: "22",
    countryName: "Brazil",
    isSchengen: false,
  },
  {
    CountryID: "186",
    countryName: "Brunei Darussalam",
    isSchengen: false,
  },
  {
    CountryID: "23",
    countryName: "Bulgaria",
    isSchengen: false,
  },
  {
    CountryID: "24",
    countryName: "Burkina Faso",
    isSchengen: false,
  },
  {
    CountryID: "25",
    countryName: "Burma",
    isSchengen: false,
  },
  {
    CountryID: "26",
    countryName: "Burundi",
    isSchengen: false,
  },
  {
    CountryID: "27",
    countryName: "Cambodia",
    isSchengen: false,
  },
  {
    CountryID: "28",
    countryName: "Cameroon",
    isSchengen: false,
  },
  {
    CountryID: "29",
    countryName: "Canada",
    isSchengen: false,
  },
  {
    CountryID: "30",
    countryName: "Cabo Verde",
    isSchengen: false,
  },
  {
    CountryID: "31",
    countryName: "Central African Republic",
    isSchengen: false,
  },
  {
    CountryID: "32",
    countryName: "Chad",
    isSchengen: false,
  },
  {
    CountryID: "33",
    countryName: "Chile",
    isSchengen: false,
  },
  {
    CountryID: "34",
    countryName: "China",
    isSchengen: false,
  },
  {
    CountryID: "35",
    countryName: "Colombia",
    isSchengen: false,
  },
  {
    CountryID: "36",
    countryName: "Comoros",
    isSchengen: false,
  },
  {
    CountryID: "37",
    countryName: "Congo, Democratic Republic of the Congo",
    isSchengen: false,
  },
  {
    CountryID: "38",
    countryName: "Congo, Republic of",
    isSchengen: false,
  },
  {
    CountryID: "39",
    countryName: "Costa Rica",
    isSchengen: false,
  },
  {
    CountryID: "40",
    countryName: "Cote d'Ivoire",
    isSchengen: false,
  },
  {
    CountryID: "41",
    countryName: "Croatia",
    isSchengen: false,
  },
  {
    CountryID: "42",
    countryName: "Cuba",
    isSchengen: false,
  },
  {
    CountryID: "43",
    countryName: "Cyprus",
    isSchengen: false,
  },
  {
    CountryID: "44",
    countryName: "Czech Republic",
    isSchengen: true,
  },
  {
    CountryID: "45",
    countryName: "Denmark",
    isSchengen: true,
  },
  {
    CountryID: "46",
    countryName: "Djibouti",
    isSchengen: false,
  },
  {
    CountryID: "47",
    countryName: "Dominica",
    isSchengen: false,
  },
  {
    CountryID: "48",
    countryName: "Dominican Republic",
    isSchengen: false,
  },
  {
    CountryID: "49",
    countryName: "Ecuador",
    isSchengen: false,
  },
  {
    CountryID: "50",
    countryName: "Egypt",
    isSchengen: false,
  },
  {
    CountryID: "51",
    countryName: "El Salvador",
    isSchengen: false,
  },
  {
    CountryID: "52",
    countryName: "Equatorial Guinea",
    isSchengen: false,
  },
  {
    CountryID: "53",
    countryName: "Eritrea",
    isSchengen: false,
  },
  {
    CountryID: "54",
    countryName: "Estonia",
    isSchengen: true,
  },
  {
    CountryID: "156",
    countryName: "Eswatini",
    isSchengen: false,
  },
  {
    CountryID: "55",
    countryName: "Ethiopia",
    isSchengen: false,
  },
  {
    CountryID: "56",
    countryName: "Fiji",
    isSchengen: false,
  },
  {
    CountryID: "57",
    countryName: "Finland",
    isSchengen: true,
  },
  {
    CountryID: "58",
    countryName: "France",
    isSchengen: true,
  },
  {
    CountryID: "59",
    countryName: "Gabon",
    isSchengen: false,
  },
  {
    CountryID: "60",
    countryName: "Gambia",
    isSchengen: false,
  },
  {
    CountryID: "61",
    countryName: "Georgia",
    isSchengen: false,
  },
  {
    CountryID: "62",
    countryName: "Germany",
    isSchengen: true,
  },
  {
    CountryID: "63",
    countryName: "Ghana",
    isSchengen: false,
  },
  {
    CountryID: "64",
    countryName: "Greece",
    isSchengen: true,
  },
  {
    CountryID: "65",
    countryName: "Guatemala",
    isSchengen: false,
  },
  {
    CountryID: "66",
    countryName: "Guinea",
    isSchengen: false,
  },
  {
    CountryID: "67",
    countryName: "Guinea-Bissau",
    isSchengen: false,
  },
  {
    CountryID: "68",
    countryName: "Guyana",
    isSchengen: false,
  },
  {
    CountryID: "69",
    countryName: "Haiti",
    isSchengen: false,
  },
  {
    CountryID: "70",
    countryName: "Honduras",
    isSchengen: false,
  },
  {
    CountryID: "71",
    countryName: "Hong Kong",
    isSchengen: false,
  },
  {
    CountryID: "72",
    countryName: "Hungary",
    isSchengen: true,
  },
  {
    CountryID: "73",
    countryName: "Iceland",
    isSchengen: true,
  },
  {
    CountryID: "74",
    countryName: "India",
    isSchengen: false,
  },
  {
    CountryID: "75",
    countryName: "Indonesia",
    isSchengen: false,
  },
  {
    CountryID: "76",
    countryName: "Iran",
    isSchengen: false,
  },
  {
    CountryID: "77",
    countryName: "Iraq",
    isSchengen: false,
  },
  {
    CountryID: "78",
    countryName: "Ireland",
    isSchengen: false,
  },
  {
    CountryID: "79",
    countryName: "Israel",
    isSchengen: false,
  },
  {
    CountryID: "80",
    countryName: "Italy",
    isSchengen: true,
  },
  {
    CountryID: "81",
    countryName: "Jamaica",
    isSchengen: false,
  },
  {
    CountryID: "82",
    countryName: "Japan",
    isSchengen: false,
  },
  {
    CountryID: "83",
    countryName: "Jordan",
    isSchengen: false,
  },
  {
    CountryID: "84",
    countryName: "Kazakhstan",
    isSchengen: false,
  },
  {
    CountryID: "85",
    countryName: "Kenya",
    isSchengen: false,
  },
  {
    CountryID: "86",
    countryName: "Kiribati",
    isSchengen: false,
  },
  {
    CountryID: "87",
    countryName: "Korea, North",
    isSchengen: false,
  },
  {
    CountryID: "88",
    countryName: "Korea, South",
    isSchengen: false,
  },
  {
    CountryID: "185",
    countryName: "Kosovo",
    isSchengen: false,
  },
  {
    CountryID: "89",
    countryName: "Kuwait",
    isSchengen: false,
  },
  {
    CountryID: "90",
    countryName: "Kyrgyz Republic",
    isSchengen: false,
  },
  {
    CountryID: "91",
    countryName: "Laos",
    isSchengen: false,
  },
  {
    CountryID: "92",
    countryName: "Latvia",
    isSchengen: true,
  },
  {
    CountryID: "93",
    countryName: "Lebanon",
    isSchengen: false,
  },
  {
    CountryID: "94",
    countryName: "Lesotho",
    isSchengen: false,
  },
  {
    CountryID: "95",
    countryName: "Liberia",
    isSchengen: false,
  },
  {
    CountryID: "96",
    countryName: "Libya",
    isSchengen: false,
  },
  {
    CountryID: "97",
    countryName: "Liechtenstein",
    isSchengen: true,
  },
  {
    CountryID: "98",
    countryName: "Lithuania",
    isSchengen: true,
  },
  {
    CountryID: "99",
    countryName: "Luxembourg",
    isSchengen: true,
  },
  {
    CountryID: "100",
    countryName: "Macau",
    isSchengen: false,
  },
  {
    CountryID: "101",
    countryName: "North Macedonia",
    isSchengen: false,
  },
  {
    CountryID: "102",
    countryName: "Madagascar",
    isSchengen: false,
  },
  {
    CountryID: "103",
    countryName: "Malawi",
    isSchengen: false,
  },
  {
    CountryID: "104",
    countryName: "Malaysia",
    isSchengen: false,
  },
  {
    CountryID: "105",
    countryName: "Maldives",
    isSchengen: false,
  },
  {
    CountryID: "106",
    countryName: "Mali",
    isSchengen: false,
  },
  {
    CountryID: "107",
    countryName: "Malta",
    isSchengen: true,
  },
  {
    CountryID: "108",
    countryName: "Mauritania",
    isSchengen: false,
  },
  {
    CountryID: "109",
    countryName: "Mauritius",
    isSchengen: false,
  },
  {
    CountryID: "110",
    countryName: "Mexico",
    isSchengen: false,
  },
  {
    CountryID: "111",
    countryName: "Micronesia",
    isSchengen: false,
  },
  {
    CountryID: "112",
    countryName: "Moldova",
    isSchengen: false,
  },
  {
    CountryID: "113",
    countryName: "Mongolia",
    isSchengen: false,
  },
  {
    CountryID: "114",
    countryName: "Montenegro",
    isSchengen: false,
  },
  {
    CountryID: "115",
    countryName: "Morocco",
    isSchengen: false,
  },
  {
    CountryID: "116",
    countryName: "Mozambique",
    isSchengen: false,
  },
  {
    CountryID: "117",
    countryName: "Namibia",
    isSchengen: false,
  },
  {
    CountryID: "118",
    countryName: "Nepal",
    isSchengen: false,
  },
  {
    CountryID: "119",
    countryName: "Netherlands",
    isSchengen: true,
  },
  {
    CountryID: "120",
    countryName: "New Zealand",
    isSchengen: false,
  },
  {
    CountryID: "121",
    countryName: "Nicaragua",
    isSchengen: false,
  },
  {
    CountryID: "122",
    countryName: "Niger",
    isSchengen: false,
  },
  {
    CountryID: "123",
    countryName: "Nigeria",
    isSchengen: false,
  },
  {
    CountryID: "124",
    countryName: "Norway",
    isSchengen: false,
  },
  {
    CountryID: "125",
    countryName: "Oman",
    isSchengen: false,
  },
  {
    CountryID: "126",
    countryName: "Pakistan",
    isSchengen: false,
  },
  {
    CountryID: "127",
    countryName: "Panama",
    isSchengen: false,
  },
  {
    CountryID: "128",
    countryName: "Papua New Guinea",
    isSchengen: false,
  },
  {
    CountryID: "129",
    countryName: "Paraguay",
    isSchengen: false,
  },
  {
    CountryID: "130",
    countryName: "Peru",
    isSchengen: false,
  },
  {
    CountryID: "131",
    countryName: "Philippines",
    isSchengen: false,
  },
  {
    CountryID: "132",
    countryName: "Poland",
    isSchengen: true,
  },
  {
    CountryID: "133",
    countryName: "Portugal",
    isSchengen: true,
  },
  {
    CountryID: "134",
    countryName: "Qatar",
    isSchengen: false,
  },
  {
    CountryID: "135",
    countryName: "Romania",
    isSchengen: false,
  },
  {
    CountryID: "136",
    countryName: "Russia",
    isSchengen: false,
  },
  {
    CountryID: "137",
    countryName: "Rwanda",
    isSchengen: false,
  },
  {
    CountryID: "138",
    countryName: "Saint Lucia",
    isSchengen: false,
  },
  {
    CountryID: "139",
    countryName: "Saint Vincent and the Grenadines",
    isSchengen: false,
  },
  {
    CountryID: "140",
    countryName: "Samoa",
    isSchengen: false,
  },
  {
    CountryID: "141",
    countryName: "S�o Tom� and Pr�ncipe",
    isSchengen: false,
  },
  {
    CountryID: "142",
    countryName: "Saudi Arabia",
    isSchengen: false,
  },
  {
    CountryID: "143",
    countryName: "Senegal",
    isSchengen: false,
  },
  {
    CountryID: "144",
    countryName: "Serbia",
    isSchengen: false,
  },
  {
    CountryID: "145",
    countryName: "Seychelles",
    isSchengen: false,
  },
  {
    CountryID: "146",
    countryName: "Sierra Leone",
    isSchengen: false,
  },
  {
    CountryID: "147",
    countryName: "Singapore",
    isSchengen: false,
  },
  {
    CountryID: "148",
    countryName: "Slovakia",
    isSchengen: true,
  },
  {
    CountryID: "149",
    countryName: "Slovenia",
    isSchengen: true,
  },
  {
    CountryID: "150",
    countryName: "Solomon Islands",
    isSchengen: false,
  },
  {
    CountryID: "184",
    countryName: "Somalia",
    isSchengen: false,
  },
  {
    CountryID: "151",
    countryName: "South Africa",
    isSchengen: false,
  },
  {
    CountryID: "152",
    countryName: "Spain",
    isSchengen: true,
  },
  {
    CountryID: "153",
    countryName: "Sri Lanka",
    isSchengen: false,
  },
  {
    CountryID: "154",
    countryName: "Sudan",
    isSchengen: false,
  },
  {
    CountryID: "155",
    countryName: "Suriname",
    isSchengen: false,
  },
  {
    CountryID: "157",
    countryName: "Sweden",
    isSchengen: true,
  },
  {
    CountryID: "158",
    countryName: "Switzerland",
    isSchengen: true,
  },
  {
    CountryID: "159",
    countryName: "Syria",
    isSchengen: false,
  },
  {
    CountryID: "160",
    countryName: "Taiwan",
    isSchengen: false,
  },
  {
    CountryID: "161",
    countryName: "Tajikistan",
    isSchengen: false,
  },
  {
    CountryID: "162",
    countryName: "Tanzania",
    isSchengen: false,
  },
  {
    CountryID: "163",
    countryName: "Thailand",
    isSchengen: false,
  },
  {
    CountryID: "164",
    countryName: "Timor-Leste",
    isSchengen: false,
  },
  {
    CountryID: "165",
    countryName: "Togo",
    isSchengen: false,
  },
  {
    CountryID: "166",
    countryName: "Tonga",
    isSchengen: false,
  },
  {
    CountryID: "167",
    countryName: "Trinidad and Tobago",
    isSchengen: false,
  },
  {
    CountryID: "168",
    countryName: "Tunisia",
    isSchengen: false,
  },
  {
    CountryID: "169",
    countryName: "Turkey",
    isSchengen: false,
  },
  {
    CountryID: "170",
    countryName: "Turkmenistan",
    isSchengen: false,
  },
  {
    CountryID: "171",
    countryName: "Uganda",
    isSchengen: false,
  },
  {
    CountryID: "172",
    countryName: "Ukraine",
    isSchengen: false,
  },
  {
    CountryID: "173",
    countryName: "United Arab Emirates",
    isSchengen: false,
  },
  {
    CountryID: "174",
    countryName: "United Kingdom",
    isSchengen: false,
  },
  {
    CountryID: "175",
    countryName: "United States",
    isSchengen: false,
  },
  {
    CountryID: "176",
    countryName: "Uruguay",
    isSchengen: false,
  },
  {
    CountryID: "177",
    countryName: "Uzbekistan",
    isSchengen: false,
  },
  {
    CountryID: "178",
    countryName: "Vanuatu",
    isSchengen: false,
  },
  {
    CountryID: "179",
    countryName: "Venezuela",
    isSchengen: false,
  },
  {
    CountryID: "180",
    countryName: "Vietnam",
    isSchengen: false,
  },
  {
    CountryID: "181",
    countryName: "Yemen",
    isSchengen: false,
  },
  {
    CountryID: "182",
    countryName: "Zambia",
    isSchengen: false,
  },
  {
    CountryID: "183",
    countryName: "Zimbabwe",
    isSchengen: false,
  },
];

export const schenghenPrice = {
  "7 days": 3250,
  "10 days": 4750,
  "15 days": 5250,
  "21 days": 7750,
  "30 days": 8750,
  "60 days": 14280,
  "92 days": 21800,
  "180 days": 25750,
  "365 days": 30500,
};

export const nonSchenghenPrice = {
  "7 days": 6300,
  "10 days": 6900,
  "15 days": 8200,
  "21 days": 9900,
  "30 days": 11200,
  "60 days": 19400,
  "92 days": 31200,
  "180 days": 43000,
  "365 days": 58000,
};
