import Accordion from "../../components/Accordion/Accordion";
import Paragraph from "../../components/typography/Paragraph";

const UserNotification = () => {

    const accordionData = [
        {
            title: " 📥 بروزرسانی اپلیکیشن اندروید", msg: `
                                                    تغییرات نسخه 6 اپلیکیشن:
<br>1. درست شدن مشکل Private Dns.
<br>این مشکل در گوشی های اندروید زیر 8.1 باعث این شده بود که اپ&zwnj;لایت کار نکند و در نسخه های بالاتر اندروید هم اگر این گزینه خاموش بود یوتیوب و گوگل پلی و کلا سرورها به درستی کار نمیکردند که در این نسخه مشکل رفع شد.
<br>2. اضافه شدن ناتیفیشکن به اپ.
<br>3. 5 روز به پایان پلن کاربر شروع به ارسال ناتیفیکشن می شود و هر روز یک ناتیف ارسال می شود.
<br>4. بهینه شدن اپلیکیشن.
<br>5. اگر دیوایسی به اکانت شما لاگین کند در ناتیف نمایش داده می شود.
                                                `},
        {
            title: "✅ اختلالات همراه اول برطرف شدند", msg: `
      <div class="panel-body">
                                                    سرورهای همراه اول و ADSL جدید اضافه شدند، برای دریافت سرورهای جدید می توانید اتصال سرویس را قطع کنید و وارد اپلیکیشن شوید و چند دقیقه منتظر بمانید یا برای دریافت فوری Clear cache کنید. سرورهای جدید رو وصل کنید و صبر کنید تا به پایداری برسه و تست کنید و نتیجه رو در صورتی که براتون مهیا بود گزارش کنید.
<br>
<br>با تشکر
                                                </div>
      ` },
        {
            title: `🔴 اختلالات همراه اول مشهود است`, msg: `
   
                                                    با سلام، اختلالات همراه اول در تمامی سرویس های اینترنتی مشاهده شده و به دنبال راه حل برای حل این مشکل هستیم. در حال حاضر سرویس ایرانسل بدون اختلال متصل است و تا حل شدن مشکل همراه اول می توانید از تغییر سیم کارت اینترنت خود استفاده کنید.
<br>
<br>اختلال همراه اول تنها مختص به لایت کانکت نبوده و در تمامی سرویس ها همین مشکل وجود دارد.
<br>
<br>❗️ طبق اخباری که به دستمون رسیده گفته میشه که نیمی از دیتاسنترهای همراه اول در سطح کشور آف شدن و همراه اول در اقدامی داره اتصال به اینترنت بین الملل رو ناممکن می کنه.
<br>
<br>صحت این موضوع در دست پیگیری هست اما طبق آمار های ابرآروان دیتا سنتر های اختلال های زیادی نشون میدن
<br>
<br>
                                             
      ` },
    ];

    return (
        <div>
            <h2 className="mb-4"> اعلانی های دریافتی</h2>
            <div className="space-y-2">
                {accordionData.map((item, index) => (
                    <Accordion key={index} data={item} />
                ))}
                
            </div>
        </div>
    );
};


export default UserNotification;