import { getMethod } from "../../api/callApi";
import { IRANCurrency, WALLEXAPI } from "../../api/endpoints";

export const fetchCryptoStat = async () => {
  const res = await getMethod(WALLEXAPI);
  console.log(
    "%csrcages\finance\requests.ts:6 res",
    "color: #007acc;",
    res.result
  );

  // لیست ارزهای مجاز
  const allowedCurrencies = ["BTC", "LTC", "XRP","TRX","USDT"];

  // فیلتر کردن داده‌ها
  const filteredData = res.result.filter((currency) =>
    allowedCurrencies.includes(currency.key)
  );
  return filteredData;
};

export const fetchUSDStat = async () => {
  const res = await getMethod(IRANCurrency);


  
  return res.currency;
};
