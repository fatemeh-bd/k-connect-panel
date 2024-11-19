import Paragraph from "../../../components/typography/Paragraph";
import { Sizes, SvgType } from "../../../utils/enums";
const InfoBox = ({
  data,
}: {
  data: { icon: SvgType; title: string; value: string; color: string };
}) => {
  return (
    <div className="max-w-md mx-auto light:bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <Paragraph size={Sizes.xl} className="font-bold text-center">
        {data.title}
      </Paragraph>
      <div className="mt-4 grid ">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-400 dark:bg-opacity-15 rounded-full">
            <data.icon className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-lg font-semibold">{data.value}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
