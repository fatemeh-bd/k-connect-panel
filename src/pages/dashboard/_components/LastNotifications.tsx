import { boxStyle } from "../../../utils/enums";
import Paragraph from "../../../components/typography/Paragraph";
import Accordion from "../../../components/Accordion/Accordion";

const LastNotifications = () => {

  const accordionData = [
    { title: "عنوان اول", msg: "این متن مربوط به محتوای اول است." },
    { title: "عنوان دوم", msg: "این متن مربوط به محتوای دوم است." },
    { title: "عنوان سوم", msg: "این متن مربوط به محتوای سوم است." },
  ];

  return (
    <div className={boxStyle}>
      <Paragraph className="mb-4">آخرین اخبار</Paragraph>
      <div className="space-y-2">
        {accordionData.map((item, index) => (
          <Accordion  data={item} />
        ))}
      </div>
    </div>
  );
};

export default LastNotifications;
