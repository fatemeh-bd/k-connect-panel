import { useParams } from "react-router-dom";
import QRCodeGenerator from "../../../components/QR/QRCodeGenerator";
import Input from "../../../components/inputs/Input";

const transaction = () => {
  const network = "TRC20";
  const amount = 70.8;
  const walletAddress = "TVCdMivTMf6yMfTHHUAAoqtGyReVPj*BsNL";
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <div className="text-center">
          <h1 className="text-xl font-bold text-blue-600 mb-4">NEXO VPN</h1>
          <p className="light:text-gray-700 mb-2">
            شما در حال پرداخت با تتر {network} شبکه ترون هستید

            {id}
          </p>
          <p className="light:text-gray-700 mb-4">
            لطفاً مقدار مشخص شده را به آدرس زیر واریز نمایید.
          </p>
        </div>
        <div className="flex justify-between items-center light:text-gray-700 mb-4">
          <span>مقدار:</span>
          <span className="font-bold">{amount} USDT</span>
        </div>
        <div className="text-center mb-4">
          <p className="light:text-gray-700 mb-2">آدرس کیف پول:</p>
          <Input type="text" value={walletAddress} readOnly label=""></Input>
        </div>
        <div className="flex justify-center ">
          <QRCodeGenerator texts={[walletAddress]} key={walletAddress} />
        </div>
        <p className="light:text-gray-500 text-sm text-center ">
          لطفاً آدرس متنی را در بخش برداشت یا{" "}
          <span className="font-bold">withdraw</span> کیف پول تتر وارد کرده یا
          از همان قسمت بارکد اسکنر را باز کرده و QR کد درج شده را اسکن نمایید.
        </p>
      </div>
    </div>
  );
};

export default transaction;
