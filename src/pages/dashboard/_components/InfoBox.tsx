import Paragraph from "../../../components/typography/Paragraph";
import { boxStyle, Sizes, SvgType } from "../../../utils/enums";
const InfoBox = ({
  data,
}: {
  data: { icon: SvgType; title: string; value: string; color: string };
}) => {
  return (
    <div
      className={`${boxStyle} h-full max-w-md mx-auto light:bg-white rounded-lg shadow-md `}
    >
      <Paragraph size={Sizes.xl} className="font-bold text-center">
        {data.title}
      </Paragraph>
      <div className="md:mt-4 mt-2 grid ">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center md:size-12 size-10 bg-blue-100 dark:bg-blue-400 dark:bg-opacity-15 rounded-full">
            <data.icon className="w-6 h-6 text-blue-600" />
          </div>
          <Paragraph size={Sizes.lg} className="font-semibold">
            {data.value}
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
