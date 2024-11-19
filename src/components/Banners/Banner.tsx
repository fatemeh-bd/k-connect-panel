import { XMarkIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
const Banner = () => {



    const [isVisible, setIsVisible] = useState(true); // State برای کنترل نمایش بنر

    const handleClose = () => {
        setIsVisible(false); // مخفی کردن بنر
    };

    if (!isVisible) return null;


    return (
        isVisible == true ?
            <div

                className="relative mb-2 shadow-lg flex-row-reverse rounded-sm isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1"
            >

                <div
                    aria-hidden="true"
                    className="absolute right-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                        }}
                        className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                    />
                </div>
                <div
                    aria-hidden="true"
                    className="absolute right-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                        }}
                        className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <p className="text-sm/6 text-right text-gray-900">
                        <strong className="font-semibold"> یلدای 1403</strong>
                        <svg
                            viewBox="0 0 2 2"
                            aria-hidden="true"
                            className="mx-2 inline-block h-1 w-1 fill-current"
                        >
                            <circle r={1} cx={1} cy={1} />
                        </svg>
                        یلدای شما مبارک، به مناسب یلدا تخففیف های 10 تا 15 درصدی روی سرور ها قرار گرفت 🤞✌️
                    </p>

                </div>
                <div className="flex flex-1 justify-start">
                    <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
                        onClick={handleClose} // اضافه کردن رویداد کلیک
                    >
                        <span className="sr-only">بستن</span>
                        <XMarkIcon aria-hidden="true" className="h-5 w-5 text-gray-900" />
                    </button>
                </div>
            </div>
            : ""
    );
};

export default Banner;
