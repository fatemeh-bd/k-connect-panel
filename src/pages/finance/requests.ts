import {postMethod } from "../../api/callApi";
import { IRANCurrency, CryptoMarketData } from "../../api/endpoints";

export const fetchCryptoStat = async () => {
  const res = await postMethod(CryptoMarketData,{});

  // لیست ارزهای مجاز
  const allowedCurrencies = ["BTC", "LTC", "XRP", "TRX", "USDT"];

  // فیلتر کردن داده‌ها
  const filteredData = res.data.result.filter((currency: { key: string }) =>
    allowedCurrencies.includes(currency.key)
  );
  return filteredData;
};

export const fetchUSDStat = async () => {
  const res = await postMethod(IRANCurrency, {});
  return res;
};
