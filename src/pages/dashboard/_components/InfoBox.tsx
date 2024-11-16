import Paragraph from "../../../components/typography/Paragraph";
import { boxStyle, Sizes, SvgType } from "../../../utils/enums";

const InfoBox = ({
  data,
}: {
  data: { icon: SvgType; title: string; value: string; color: string };
}) => {
  return (
    <div
      className={`${boxStyle} flex items-center gap-3 hover:border-[${data.color}] cursor-default`}
      style={{
        borderBottom: "2px solid",
        borderBottomColor: data.color + "70",
      }}
    >
      {
        <data.icon
          className={`size-12 p-3 rounded-xl`}
          style={{ backgroundColor: `${data.color}18`, color: data.color }}
        />
      }

      <div>
        <Paragraph size={Sizes.lg} className="font-medium">
          {data.value}
        </Paragraph>
        <Paragraph size={Sizes.sm} className="text-stone-400">
          {data.title}
        </Paragraph>
      </div>
    </div>
  );
};

export default InfoBox;
