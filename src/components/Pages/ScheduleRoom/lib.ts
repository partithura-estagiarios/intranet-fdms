import { event } from "quasar";

export const countryCodes = {
  AD: "ca", // 'Andorra', Catalan
  AE: "ar", // 'دولة الإمارات العربية المتحدة', Arabic
  AG: "en", // 'Antigua & Barbuda', English
  AI: "en", // 'Anguilla', English/Creole
  AL: "sq", // 'Shqipëri', Albanian
  AM: "hy", // 'Հայաստան', Armenian
  AO: "pt", // 'Angola', Potuguese
  AR: "es-AR", // 'Argentina', Spanish
  AS: "en-US", // 'American Samoa', American English
  AT: "de-AT", // 'Österreich', German (Austrian)/Bavarian
  AU: "en-AU", // 'Australia', Austraian English
  AW: "nl", // 'Aruba', Dutch
  AX: "sv-FI", // 'Landskapet Åland', Swedish (finnish)
  AZ: "az", // 'Azərbaycan Respublikası', Azerbaijani
  BA: "bs", // 'Bosna i Hercegovina', Bosnian
  BB: "en", // 'Barbados', English
  BD: "bn", // 'গণপ্রজাতন্ত্রী বাংলাদেশ', Bengali
  BE: "nl-BE", // 'Belgique', Ditch (Belgian)
  BF: "nl", // 'Burkina Faso', Dutch
  BG: "mk", // 'България', Macedonian
  BH: "ar", // 'مملكة البحرين', Arabix
  BI: "fr", // 'République du Burundi', French
  BJ: "fr", // 'République du Bénin', French
  BL: "fr", // 'St. Barthélemy', French
  BM: "en", // 'Bermuda', English
  BN: "en", // 'Negara Brunei Darussalam', Maylay/English
  BO: "es-BO", // 'Bolivia', English Bolian
  BQ: "nl", // Caribisch Nederland', Dutch
  BR: "pt-BR", // 'Brasil', Portuguese Brazil
  BS: "bah", // 'Bahamas', Bahamian Creole
  BW: "tn", // 'Botswana', Setswana
  BY: "ru", // 'Рэспубліка Беларусь', Russian
  BZ: "en-BZ", // 'Belize', English Belize
  CA: "en-CA", // 'Canada',
  CC: "en", // 'Cocos (Keeling) Islands', Maylay/English
  CD: "fr", // 'République démocratique du Congo', French
  CF: "fr", // 'République centrafricaine', French
  CG: "fr", // 'République du Congo', French
  CH: "de-LI", // 'Schweiz', German Swiss
  CL: "es-CL", // 'Chile', Spanish Chile
  CM: "fr", // 'Cameroun', French
  CN: "zh", // '中华人民共和国', Mandarin (Chinese)
  CO: "es-CO", // 'Colombia', Spanish Columbian
  CR: "es-CR", // 'Costa Rica', Spanish Costa Rica
  CU: "es-CU", // 'Cuba', Spanish
  CV: "kea", // 'República de Cabo Verde', Spanish (ISO 693-3)
  CW: "nl", // 'Curaçao', Dutch
  CX: "en", // 'Christmas Island', English
  CY: "el", // 'Κύπρος', Greek
  CZ: "cs", // 'Česká republika', Czech
  DE: "de-DE", // 'Deutschland', German Germany
  DK: "da", // 'Danmark', Danish
  DM: "fr", // 'Dominica', French
  DO: "fr", // 'República Dominicana', French
  EC: "es-EC", // 'Ecuador', Spanish Ecuador
  EE: "et", // 'Eesti', Estonian
  ES: "es", // 'España', Spanish
  ET: "ak", // 'ኢትዮጵያ', Afrikans
  FI: "fi", // 'Suomi', Finish
  FO: "de", // 'Føroyar', German
  FR: "fr", // 'France', French
  GA: "fr", // 'Gabon', French
  GB: "en-GB", // 'United Kingdom', English Great Britain
  GD: "en", // 'Grenada', Englsih
  GE: "ka", // 'საქართველო', Georgian
  GF: "fr-GY", // 'Guyane', Grench Guyane
  GG: "fr", // 'Guernsey', French
  GI: "es", // 'Gibraltar', Spanish
  GL: "kl", // 'Kalaallit Nunaat', (ISO 639-1)
  GP: "fr", // 'Guadeloupe', French
  GQ: "fr", // 'República de Guinea Ecuatorial', French (Spanish, Portuguese)
  GR: "el", // 'Ελλάδα', Greek
  GT: "es-GT", // 'Guatemala', Spanish Guatemala
  GU: "ch", // 'Guam', Chamorro
  GY: "en", // 'Guyana', English
  HN: "es-HN", // 'Honduras', English Honduras
  HR: "hr", // 'Hrvatska', Croation
  HT: "ht", // 'Haïti', Haitian
  HU: "hu", // 'Magyarország', Hungary
  ID: "hy-AM", // 'Indonesia', Armenian
  IE: "en-IE", // 'Ireland', English Ireland
  IM: "en", // 'Isle of Man', English
  IS: "is", // 'Ísland', Icelandic
  IT: "it", // 'Italia', Italian
  JE: "en", // 'Jersey', English
  JM: "en-JM", // 'Jamaica', English Jamaica
  JP: "ja", // '日本', Japanese
  KE: "sw", // 'Kenya', Swahili
  KR: "ko-KP", // '대한민국', Korean (South)
  LI: "gsw", // 'Lichtenstein', Swiss German
  LS: "en", // "'Muso oa Lesotho", English
  LT: "lt", // 'Lietuva', Lithuanian
  LU: "fr-LU", // 'Luxembourg', French Luxembourg
  LV: "lv", // 'Latvija', Latvian
  MC: "fr-MC", // 'Monaco', French Monaco
  MD: "mo", // 'Republica Moldova',
  ME: "bs", // 'Crna Gora', Bosnian
  MG: "mg", // "Repoblikan'i Madagasikara", Madagascar
  MK: "mk", // 'Република Македонија', Macedonian
  MQ: "fr", // 'Martinique', French
  MT: "mt", // 'Malta', Malta
  MW: "en", // 'Malawi', English
  MX: "es-MX", // 'México', Spanish Mexican
  MZ: "pt", // 'Moçambique', Potuguese
  NA: "en", // 'Namibia', English (German)
  NI: "es-NI", // 'Nicaragua', Spanish Nicaragua
  NL: "nl-NL", // 'Nederland', Dutch Netherlands
  NO: "no", // 'Norge', Norwegian
  NZ: "en-NZ", // 'New Zealand', English New Zealand
  PA: "es", // 'Panamá', Spanish
  PE: "es-PE", // 'Perú', Spanish Peru
  PH: "en-PH", // 'Philippines', English Philippines
  PL: "pl", // 'Polska', Polish
  PT: "pt", // 'Portugal', Portuguese
  PY: "gn", // 'Paraguay', Paraguay
  RE: "fr", // 'Réunion', French
  RO: "ro", // 'Romania', Romanian
  RS: "sr", // 'Република Србија', Serbian
  RU: "ru", // 'Россия', Russian
  RW: "rw", // "Repubulika y'u Rwanda", Rwanda
  SE: "sv", // 'Sverige', Swedish
  SG: "zh-SG", // 'Singapore', Chinese Singapore
  SH: "en", // 'St. Helena', English
  SI: "sq", // 'Republika Slovenija', Albanian
  SJ: "no", // 'Svalbard & Jan Mayen', Norwegian
  SK: "sk", // 'Slovenská republika', Slovak
  SM: "it", // 'San Marino', Italian
  SO: "ar", // 'Jamhuuriyadda Federaalka Soomaaliya', Arabic
  SS: "en", // 'South Sudan', English
  SV: "es-SV", // 'El Salvador', Spanish El Salvador
  TG: "fr", // 'République togolaise', French
  TO: "to", // 'Puleʻanga Fakatuʻi ʻo Tonga', Tongan
  TR: "tr", // 'Türkiye', Turkish
  TZ: "sw", // 'Tanzania', Swahili
  UA: "uk", // 'Україна', Ukraine
  UG: "en-UG", // 'Uganda', English Uganda
  US: "en-US", // 'United States of America', English USA
  UY: "es-UY", // 'Uruguay', Spanish Uruguay
  VA: "it", // 'Stato della Città del Vaticano', Italian
  VE: "es-VE", // 'Venezuela', Spanish Venezuela
  VN: "vi", // 'Cộng hòa Xã hội chủ nghĩa Việt Nam', Vietnamese
  XK: "sq", // 'Republika e Kosovës', Albanian
  YT: "fr", // 'Mayotte', French
  ZA: "af", // 'South Africa', Afrikaans
  ZM: "en", // 'Zambia', English
  ZW: "en", // 'Zimbabwe' English
};
export const monthsAux = [
  { label: "label.monhs.january", value: 1 },
  { label: "label.monhs.february", value: 2 },
  { label: "label.monhs.march", value: 3 },
  { label: "label.monhs.april", value: 4 },
  { label: "label.monhs.may", value: 5 },
  { label: "label.monhs.june", value: 6 },
  { label: "label.monhs.july", value: 7 },
  { label: "label.monhs.augus", value: 8 },
  { label: "label.monhs.sepember", value: 9 },
  { label: "label.monhs.ocober", value: 10 },
  { label: "label.monhs.november", value: 11 },
  { label: "label.monhs.december", value: 12 },
];
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adiciona zero à esquerda se o mês for menor que 10
  const day = String(date.getDate()).padStart(2, "0"); // Adiciona zero à esquerda se o dia for menor que 10
  return `${year}-${month}-${day}`;
}
export function insertColor(room: String) {
  switch (room) {
    case "SALA A":
      return "red";
      break;
  }
  switch (room) {
    case "SALA B":
      return "green";
      break;
  }
  switch (room) {
    case "SALA C":
      return "yellow";
      break;
  }
  switch (room) {
    case "SALA DE REUNIÃO":
      return "orange";
      break;
  }
}
export const rooms = [
  { name: "SALA A", color: "red" },
  { name: "SALA B", color: "green" },
  { name: "SALA C", color: "yellow" },
  { name: "SALA DE REUNIÃO", color: "orange" },
];
