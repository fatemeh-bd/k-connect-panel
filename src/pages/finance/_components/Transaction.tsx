import { useParams } from "react-router-dom";
import QRCodeGenerator from "../../../components/QR/QRCodeGenerator";
import Input from "../../../components/inputs/Input";
import { useQuery } from "react-query";
import { getMethod } from "../../../api/callApi";
import { notify } from "../../../utils/notify";
import { GET_TRANSACTION } from "../../../api/endpoints";
import CustomSkeleton from "../../../components/skeleton/skeleton";
import { useLang } from "../../../context/LangProvider";
import { translations } from "../../../context/translations";

const transaction = () => {
  const { lang } = useLang();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { id } = useParams();

  const {
    data = {},
    isLoading,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useQuery(
    `ticket-${id}`,
    async () => {
      return await fetchData();
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  const fetchData = async () => {
    const response = await getMethod(GET_TRANSACTION + `?Id=${id}`);
    if (response?.isSuccess) {
      return response.data;
    } else {
      notify(response.message, "error");
      return {};
    }
  };

  return !isLoading ? (
    <div className="flex flex-col items-center justify-center  ">
      <div className="bg-white flex md:justify-between flex-col md:flex-row items-center shadow-lg rounded-lg p-6  w-full ">
        <div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-blue-600 mb-4">NEXO VPN</h1>
            <p className="light:text-gray-700 mb-2">
              {translations[lang].youArePayingWithCurrency.replace(
                "{data.netWorkName}",
                data.netWorkName
              )}
            </p>
            <p className="light:text-gray-700 mb-4">
              {translations[lang].pleaseTransferTheAmountToAddress}
            </p>
          </div>
          <div className="flex justify-between items-center light:text-gray-700 mb-4">
            <span>{translations[lang].amount}:</span>
            {/* <span className="font-bold">{data.cryptoPrice} </span> */}
          </div>
          <div className="text-center mb-4">
            <p className="light:text-gray-700 mb-2">
              {translations[lang].walletAddress}
            </p>
            <Input
              type="text"
              value={data.walletAddress ? "" : data.walletAddress}
              readOnly
              label=""
            ></Input>
          </div>
          <p className="light:text-gray-500 text-sm text-right ">
            <span className="font-bold">
              {translations[lang].pleaseEnterAddressInWithdraw}
            </span>
          </p>
        </div>

        <div>
          <div className="flex justify-center ">
            <QRCodeGenerator
              texts={[data.walletAddress]}
              key={data.walletAddress}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <CustomSkeleton height="h-[90px]" />
      <CustomSkeleton height="h-[400px]" className="mt-3" />
    </div>
  );
};

export default transaction;
