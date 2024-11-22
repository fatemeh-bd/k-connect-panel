import Avatar from "../../../../components/avatar/Avatar";
import { boxStyle } from "../../../../utils/enums";
import Paragraph from "../../../../components/typography/Paragraph";

const userprofile = () => {
    return (

        <div className={`${boxStyle}  grid grid-cols-12`} >
            <div className="md:col-span-4 col-span-12  flex gap-4 md:mb-0 mb-3 items-center">
                <Avatar></Avatar>
                <Paragraph  >
                    مجید گرگین مورجانی
                </Paragraph>
            </div>
            <div className="md:col-span-4 col-span-12 flex gap-4 md:mb-0 mb-3 items-center">
                <label> تماس :</label>
                <Paragraph>
                    09159565982
                </Paragraph>
            </div>
            <div className="md:col-span-4 col-span-12 flex text-nowrap md:mb-0 mb-3 gap-4 items-center">
                <label> ایمیل :</label>
                <Paragraph>
                    gorgin@gmail.com
                </Paragraph>
            </div>
            <div className="md:col-span-4 col-span-12 flex text-nowrap md:mb-0 mb-3 gap-4 items-center">
                <label> مدت زمان فعالیت شما :</label>
                <Paragraph>
                    38 روز
                </Paragraph>
            </div>
        </div>

    );

}

export default userprofile;