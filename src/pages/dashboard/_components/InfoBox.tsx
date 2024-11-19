import { SvgType } from "../../../utils/enums";
const InfoBox = ({
  data,
}: {
  data: { icon: SvgType; title: string; value: string; color: string };
}) => {

  return (

    <div className="max-w-md mx-auto light:bg-white rounded-lg shadow-md p-6">
      <p className="text-xl font-bold text-gray-800 text-center">{data.title}</p>
      <div className="mt-4 grid ">
        {/* تعداد سرورها */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
            <data.icon
              className="w-6 h-6 text-blue-600"
            />

          </div>
          <p className="text-lg font-semibold text-gray-800">{data.value}</p>

        </div>

      </div>
    </div>


  );
};

export default InfoBox;
