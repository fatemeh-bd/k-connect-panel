import { ColorType } from "../../utils/enums";
import Paragraph from "../typography/Paragraph";

const SideBar = () => {
  return (
    <div className="w-[20%] h-screen overflow-auto shadow-2xl p-5 bg-white">
      <Paragraph type={ColorType.PRIMARY} className="font-bold !text-2xl">
        K-connect
      </Paragraph>
    
    </div>
  );
};

export default SideBar;
