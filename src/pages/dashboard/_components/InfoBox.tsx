import Paragraph from "../../../components/typography/Paragraph";
import { boxStyle, Sizes, SvgType } from "../../../utils/enums";

const InfoBox = ({
  data,
}: {
  data: { icon: SvgType; title: string; value: string; color: string };
}) => {
  return (
    <div
      className={`${boxStyle} flex items-center md:gap-3 gap-2 hover:border-[${data.color}] cursor-default`}
      style={{
        borderBottom: "2px solid",
        borderBottomColor: data.color + "70",
      }}
    >
      {
        <data.icon
          className={`md:size-12 size-8 md:p-3 p-1.5 rounded-xl`}
          style={{ backgroundColor: `${data.color}18`, color: data.color }}
        />
      }

      <div>
        <Paragraph size={Sizes.lg} className="font-medium">
          {data.value}
        </Paragraph>
        <Paragraph className="text-zinc-400 md:text-sm text-xs">
          {data.title}
        </Paragraph>
      </div>
    </div>
  );
};

export default InfoBox;
