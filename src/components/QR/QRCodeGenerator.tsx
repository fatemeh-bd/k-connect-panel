import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import Button from "../buttons/Button";
import { useLang } from "../../context/LangProvider";
import { translations } from "../../context/translations";

const QRCodeGenerator = ({ texts }: { texts: string[] }) => {
  const { lang } = useLang();
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(text);
      setTimeout(() => setCopySuccess(null), 2000); // Reset message after 2 seconds
    });
  };

  return (
    <div className="flex flex-col items-center ">
      <div className="flex flex-col gap-6 overflow-y-auto max-h-[700px] w-full px-4">
        {texts.length > 0 ? (
          texts.map((text, index) => (
            <div
              key={index}
              className="p-4 m-1 dark:bg-slate-100 light:bg-white shadow-md rounded-lg flex flex-col items-center"
            >
              <QRCodeSVG value={text} size={250} />
              <Button className="mt-3" onClick={() => handleCopy(text)}>
                {translations[lang].copyLink}
              </Button>
              {copySuccess === text && (
                <p className="mt-2 text-green-500 text-sm">
                  {translations[lang].linkCopiedSuccessfully}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">{translations[lang].emptyList}</p>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
