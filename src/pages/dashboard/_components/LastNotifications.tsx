import { boxStyle } from "../../../utils/enums";
import Paragraph from "../../../components/typography/Paragraph";
import Accordion, {
  LastNewsType,
} from "../../../components/Accordion/Accordion";
import { useQuery } from "react-query";
import { postMethod } from "../../../api/callApi";
import { GET_NEWS } from "../../../api/endpoints";
import Loader from "../../../components/loaders/Loader";
import { useLang } from "../../../context/LangProvider";

const LastNotifications = () => {

    const { getTranslation} = useLang();
  
  const { data = [], isLoading } = useQuery(
    "news",
    async () => {
      const response = await postMethod(GET_NEWS, {});
      if (response?.isSuccess) {
        console.log(response.data);
        return response.data;
      } else {
        return [];
      }
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );
  return (
    <div className={boxStyle}>
      <Paragraph className="mb-4">{getTranslation("latestNews")}</Paragraph>
      <div className="space-y-2">
        {isLoading ? (
          <Loader />
        ) : (
          data.map((item: LastNewsType) => (
            <Accordion key={item.newsId} data={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default LastNotifications;
