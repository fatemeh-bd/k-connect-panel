import { forwardRef } from "react";
import { InputPropsType } from "./types";
import { ColorType } from "../../utils/enums";
import Paragraph from "../typography/Paragraph";

const Input = forwardRef<HTMLInputElement, InputPropsType>(
  ({ className, errorText, label, icon, ...rest }, ref) => {
    return (
      <div className={`w-full my-4 space-y-2 ${className || ""}`}>
        <div className="relative">
          {icon && (
            <div className="absolute [&>svg]:size-5 left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
              {icon}
            </div>
          )}
          <input
            {...rest}
            ref={ref}
            id="floating_outlined"
            className={`peer w-full bg-transparent placeholder:text-slate-400 text-slate-800 text-sm border border-zinc-200 dark:border-zinc-700 rounded-md p-3.5 transition duration-300 ease focus:outline-none focus:border-primary dark:focus:border-zinc-300 hover:border-slate-300 shadow-sm focus:shadow ${
              errorText ? "border-rose-500" : ""
            }`}
            placeholder=" "
          />
          <label
            htmlFor="floating_outlined"
            className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-90 top-2 z-10 origin-[0] bg-white dark:bg-zinc-900  px-2 peer-focus:px-2 peer-focus:text-primary dark:peer-focus:text-zinc-300  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            {label}
          </label>
        </div>
        {errorText && <Paragraph type={ColorType.ERROR}>{errorText}</Paragraph>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
