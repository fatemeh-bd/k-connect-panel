import { useLang } from "../../context/LangProvider";
import { translations } from "../../context/translations";

interface DataUsageProps {
  currentBytes: number;
  totalBytes: number;
  className?: string;
}

function formatBytes(bytes: number, sizes: string[]): string {
  if (bytes === 0) return "0 ";

  const k = 1024;

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);

  return `${value.toFixed(2)} ${sizes[i]}`;
}

export default function DataUsage({
  currentBytes,
  totalBytes,
  className,
}: DataUsageProps) {
  const { lang } = useLang();
  const sizes = [
    translations[lang].byte,
    translations[lang].kilobyte,
    translations[lang].megabyte,
    translations[lang].gigabyte,
    translations[lang].terabyte,
  ];

  const percentage = (currentBytes / totalBytes) * 100;
  const formattedCurrent = formatBytes(currentBytes, sizes);
  const formattedTotal = formatBytes(totalBytes, sizes);

  return (
    <div className={` rounded-lg  text-slate-200 ${className}`}>
      <div className="space-y-2">
        <div className="h-2 relative rounded-full bg-slate-200 dark:bg-slate-600 overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-300 ease-in-out"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-sm ">
          <span className="">
            {translations[lang].total}: {formattedCurrent}
          </span>
          {formattedCurrent} {translations[lang].from} {formattedTotal}
        </div>
      </div>
    </div>
  );
}
