const languagesUnsorted = [
  { key: "al", value: "al", flag: "al", text: "Albanian" },
  { key: "sa", value: "sa", flag: "sa", text: "Arabic" },
  { key: "am", value: "am", flag: "am", text: "Armenian" },
  { key: "bd", value: "bd", flag: "bd", text: "Bengali" },
  { key: "br", value: "br", flag: "br", text: "Portuguese" },
  { key: "us", value: "us", flag: "us", text: "English" },
  { key: "bg", value: "bg", flag: "bg", text: "Bulgarian" },
  { key: "es", value: "es", flag: "es", text: "Spanish" },
  { key: "kh", value: "kh", flag: "kh", text: "Khmer" },
  { key: "fr", value: "fr", flag: "fr", text: "French" },
  { key: "cn", value: "cn", flag: "cn", text: "Mandarin" },
  { key: "hr", value: "hr", flag: "hr", text: "Croatian" },
  { key: "dk", value: "dk", flag: "dk", text: "Danish" },
  { key: "ee", value: "ee", flag: "ee", text: "Estonian" },
  { key: "fi", value: "fi", flag: "fi", text: "Finnish" },
  { key: "de", value: "de", flag: "de", text: "German" },
  { key: "gr", value: "gr", flag: "gr", text: "Greek" },
  { key: "hk", value: "hk", flag: "hk", text: "Cantonese" },
  { key: "in", value: "in", flag: "in", text: "Hindi" },
  { key: "ir", value: "ir", flag: "ir", text: "Farsi" },
  { key: "jp", value: "jp", flag: "jp", text: "Japanese" },
  { key: "kg", value: "kg", flag: "kg", text: "Kyrgyz" },
  { key: "lv", value: "lv", flag: "lv", text: "Latvian" },
  { key: "lt", value: "lt", flag: "lt", text: "Lithuanian" },
  { key: "mk", value: "mk", flag: "mk", text: "Macedonian" },
  { key: "lu", value: "lu", flag: "lu", text: "Luxembourgish" },
  { key: "mu", value: "mu", flag: "mu", text: "Creole" },
  { key: "ba", value: "ba", flag: "ba", text: "Bosnian" },
  { key: "me", value: "me", flag: "me", text: "Montenegrin" },
  { key: "rs", value: "rs", flag: "rs", text: "Serbian" },
  { key: "si", value: "si", flag: "si", text: "Slovenian" },
  { key: "cz", value: "cz", flag: "cz", text: "Czech" },
  { key: "np", value: "np", flag: "np", text: "Nepalese" },
  { key: "nl", value: "nl", flag: "nl", text: "Dutch" },
  { key: "kr", value: "kr", flag: "kr", text: "Korean" },
  { key: "pk", value: "pk", flag: "pk", text: "Urdu" },
  { key: "ph", value: "ph", flag: "ph", text: "Filipino" },
  { key: "ro", value: "ro", flag: "ro", text: "Romanian" },
  { key: "ru", value: "ru", flag: "ru", text: "Russian" },
  { key: "pl", value: "pl", flag: "pl", text: "Polish" },
  { key: "id", value: "id", flag: "id", text: "Malay" },
  { key: "sk", value: "sk", flag: "sk", text: "Slovak" },
  { key: "se", value: "se", flag: "se", text: "Swedish" },
  { key: "tw", value: "tw", flag: "tw", text: "Taiwanese" },
  { key: "th", value: "th", flag: "th", text: "Thai" },
  { key: "tr", value: "tr", flag: "tr", text: "Turkish" },
  { key: "uz", value: "uz", flag: "uz", text: "Uzbek" },
  { key: "ua", value: "ua", flag: "ua", text: "Ukrainian" },
  { key: "vn", value: "vn", flag: "vn", text: "Vietnamese" },
  { key: "kz", value: "kz", flag: "kz", text: "Kazakh" },
  { key: "ne", value: "ne", flag: "ne", text: "Hausa" },
  { key: "tz", value: "tz", flag: "tz", text: "Swahili" },
  { key: "in", value: "in", flag: "in", text: "Telugu" },
  { key: "it", value: "it", flag: "it", text: "Italian" },
  { key: "id", value: "id", flag: "id", text: "Javanese" },
  { key: "lk", value: "lk", flag: "lk", text: "Sinhala" },
  { key: "in", value: "in", flag: "in", text: "Tamil" },
  { key: "in", value: "in", flag: "in", text: "Marathi" },
  { key: "pk", value: "pk", flag: "pk", text: "Lahnda" },
  { key: "in", value: "in", flag: "in", text: "Gujarati" },
  { key: "in", value: "in", flag: "in", text: "Kannada" },
  { key: "in", value: "in", flag: "in", text: "Odia" },
  { key: "az", value: "az", flag: "az", text: "Azerbaijani" },
  { key: "in", value: "in", flag: "in", text: "Maithili" },
  { key: "mm", value: "mm", flag: "mm", text: "Burmese" },
  { key: "ng", value: "ng", flag: "ng", text: "Yoruba" },
  { key: "et", value: "et", flag: "et", text: "Amharic" },
  { key: "ng", value: "ng", flag: "ng", text: "Igbo" },
  { key: "ph", value: "ph", flag: "ph", text: "Tagalog" },
  { key: "ph", value: "ph", flag: "ph", text: "Cebuano" },
  { key: "hu", value: "hu", flag: "hu", text: "Hungarian" },
  { key: "pk", value: "pk", flag: "pk", text: "Pashto" },
  { key: "so", value: "so", flag: "so", text: "Somali" },
  { key: "mg", value: "mg", flag: "mg", text: "Malagasy" },
  { key: "rw", value: "rw", flag: "rw", text: "Rwanda" },
  { key: "za", value: "za", flag: "za", text: "Zulu" },
  { key: "zw", value: "zw", flag: "zw", text: "Shona" },
  { key: "be", value: "be", flag: "be", text: "Flemish" },
  { key: "no", value: "no", flag: "no", text: "Norwegian" }
];
const languagesSorted = languagesUnsorted.sort((a, b) =>
  a.text !== b.text ? (a.text < b.text ? -1 : 1) : 0
);

function createCountryList(languageArray) {
  let countries = [];
  for (let language of languageArray) {
    let object = {};
    object.value = language.value;
    object.label = language.text;
    countries.push(object);
  }
  return countries;
}

export const countryList = createCountryList(languagesSorted);
